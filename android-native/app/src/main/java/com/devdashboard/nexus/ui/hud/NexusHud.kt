package com.devdashboard.nexus.ui.hud

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerSize
import androidx.compose.foundation.shape.ZeroCornerSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.devdashboard.nexus.ui.theme.*
import dev.chrisbanes.haze.HazeState
import dev.chrisbanes.haze.haze
import dev.chrisbanes.haze.hazeChild

@Composable
fun NexusHudScreen() {
    val hazeState = remember { HazeState() }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Obsidian)
            .haze(hazeState)
    ) {
        // Futuristic Ring (Canvas Decoration)
        Canvas(modifier = Modifier.fillMaxSize().padding(32.dp)) {
            drawArc(
                brush = Brush.sweepGradient(listOf(Emerald, Cyan, Emerald)),
                startAngle = 0f,
                sweepAngle = 270f,
                useCenter = false,
                style = Stroke(width = 2.dp.toPx()),
                alpha = 0.2f
            )
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "THE NEXUS v2.0",
                    style = MaterialTheme.typography.headlineMedium,
                    color = Emerald,
                    fontWeight = FontWeight.Bold
                )
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = null,
                    tint = Cyan
                )
            }

            // Glass Panel (HUD Core)
            HudPanel(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .hazeChild(hazeState),
                title = "SYSTEM UPTIME",
                value = "99.98%"
            )

            // Transmission Footer
            HudPanel(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .hazeChild(hazeState),
                title = "TRANSMISSIONS",
                value = "ACTIVE"
            )
        }
    }
}

@Composable
fun HudPanel(
    modifier: Modifier = Modifier,
    title: String,
    value: String
) {
    Box(
        modifier = modifier
            .clip(MaterialTheme.shapes.medium.copy(all = ZeroCornerSize)) // Brutalist 0px radius
            .background(Glass)
            .border(1.dp, Border)
            .padding(16.dp)
    ) {
        Column {
            Text(
                text = title,
                style = MaterialTheme.typography.labelSmall,
                color = TextSecondary
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.displayLarge.copy(fontSize = 32.sp),
                color = TextPrimary,
                fontWeight = FontWeight.ExtraBold
            )
        }
    }
}
