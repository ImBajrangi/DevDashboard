import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { exec, spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

// Custom dev gateway plugin for DevDashboard
const devGatewayPlugin = () => ({
  name: 'dev-gateway-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      // Parse URL
      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      
      if (parsedUrl.pathname.startsWith('/api/console/')) {
        res.setHeader('Content-Type', 'application/json');
        
        // Defined projects paths matching user's workspace structure
        const projects = {
          FOODY_VRINDA: '/Users/sakhi/Code/Foody-Vrinda/foody_vrinda_app',
          VRINDA_TOURS: '/Users/sakhi/Code/Company/Projects/Vrinda-Tours/Vrinda-Tours-React',
          CHITRA_VRINDA: '/Users/sakhi/Code/Company/Projects/Chitra-Vrinda',
          SANT_VAANI_PREMIUM: '/Users/sakhi/Code/Company/Projects/VrindaVaani/premium_app',
          VRINDA_BLOG: '/Users/sakhi/Code/Company/Projects/blogVrinda',
          SPIRIT_DEV: '/Users/sakhi/Code/DevDashboard'
        };

        if (parsedUrl.pathname === '/api/console/status') {
          const statuses = {};
          for (const [key, dir] of Object.entries(projects)) {
            const exists = fs.existsSync(dir);
            let gitInfo = null;
            if (exists && fs.existsSync(path.join(dir, '.git'))) {
              try {
                // Get branch and last commit
                const branch = await new Promise((resolve) => {
                  exec('git branch --show-current', { cwd: dir }, (err, stdout) => {
                    resolve(err ? 'unknown' : stdout.trim());
                  });
                });
                const lastCommit = await new Promise((resolve) => {
                  exec('git log -1 --pretty=format:"%h|%an|%ad|%s" --date=short', { cwd: dir }, (err, stdout) => {
                    if (err || !stdout) {
                      resolve(null);
                    } else {
                      const parts = stdout.trim().split('|');
                      resolve({
                        hash: parts[0] || '',
                        author: parts[1] || '',
                        date: parts[2] || '',
                        subject: parts[3] || ''
                      });
                    }
                  });
                });
                gitInfo = { branch, ...lastCommit };
              } catch {
                // ignore errors
              }
            }
            statuses[key] = {
              exists,
              path: dir,
              gitInfo,
              status: exists ? 'ONLINE' : 'OFFLINE'
            };
          }
          res.end(JSON.stringify(statuses));
          return;
        }

        if (parsedUrl.pathname === '/api/console/run-command') {
          const projectId = parsedUrl.searchParams.get('projectId');
          const action = parsedUrl.searchParams.get('action');
          const dir = projects[projectId];
          
          if (!dir || !fs.existsSync(dir)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: `Project directory for ${projectId} does not exist.` }));
            return;
          }

          // Determine command based on action and project type
          let command = '';
          let args = [];
          const isFlutter = fs.existsSync(path.join(dir, 'pubspec.yaml'));

          if (action === 'test') {
            command = 'git';
            args = ['status'];
          } else if (action === 'audit') {
            if (isFlutter) {
              command = 'flutter';
              args = ['analyze'];
            } else {
              command = 'npm';
              args = ['run', 'lint'];
            }
          } else if (action === 'build') {
            if (isFlutter) {
              command = 'flutter';
              args = ['build', 'apk', '--debug'];
            } else {
              command = 'npm';
              args = ['run', 'build'];
            }
          } else if (action === 'purge') {
            if (isFlutter) {
              command = 'flutter';
              args = ['clean'];
            } else {
              command = 'rm';
              args = ['-rf', 'dist', 'node_modules/.vite'];
            }
          }

          if (!command) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: `Unsupported action ${action}` }));
            return;
          }

          // Set headers for Server-Sent Events (SSE)
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          res.flushHeaders?.();

          // Write initial connection success
          res.write(`data: ${JSON.stringify({ text: `CONNECTED. Running command: ${command} ${args.join(' ')}\n`, type: 'info' })}\n\n`);

          const child = spawn(command, args, { cwd: dir, shell: true });

          child.stdout.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                res.write(`data: ${JSON.stringify({ text: line, type: 'info' })}\n\n`);
              }
            });
          });

          child.stderr.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                res.write(`data: ${JSON.stringify({ text: line, type: 'error' })}\n\n`);
              }
            });
          });

          child.on('close', (code) => {
            if (code === 0) {
              res.write(`data: ${JSON.stringify({ text: `SUCCESS: Execution finished successfully.\n`, type: 'success' })}\n\n`);
            } else {
              res.write(`data: ${JSON.stringify({ text: `ERROR: Execution failed with exit code ${code}.\n`, type: 'error' })}\n\n`);
            }
            res.write('data: [DONE]\n\n');
            res.end();
          });

          req.on('close', () => {
            child.kill();
          });
          return;
        }

        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devGatewayPlugin()],
})
