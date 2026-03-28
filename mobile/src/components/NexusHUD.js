import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, Animated as RNAnimated } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { Activity, Shield, Zap, Terminal, User } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const NexusHUD = ({ user, systemStatus }) => {
  const [logs, setLogs] = useState([
    '[SYSTEM] Initializing Void Protocol...',
    '[AUTH] Clearance level: ALPHA',
    '[NETWORK] Established link to NEXUS_MAIN',
    '[SYNC] Fetching latest transmissions...'
  ]);

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    // Simulated log feed
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), `[DATA] Packet_${Math.floor(Math.random()*10000)} received.`]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value - 0.2,
    transform: [{ scale: pulse.value }]
  }));

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/nexus-bg.png')} style={styles.bg}>
        
        {/* TOP STATUS BAR */}
        <BlurView intensity={20} style={styles.topBar}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>OPERATOR_CLEARANCE</Text>
              <Text style={styles.value}>{user?.displayName?.toUpperCase() || 'ANONYMOUS'}</Text>
            </View>
            <Animated.View style={[styles.statusIndicator, pulseStyle]} />
          </View>
        </BlurView>

        {/* MAIN HUD INSTRUMENTATION */}
        <View style={styles.hudContent}>
          
          {/* BIOMETRICS */}
          <BlurView intensity={30} style={styles.bioCard}>
            <View style={styles.avatarPlaceholder}>
               <User size={32} color="#50FFB0" />
            </View>
            <View style={styles.bioMeta}>
              <Text style={styles.label}>SYS_UPTIME</Text>
              <Text style={styles.value}>99.98%</Text>
              <Text style={styles.label}>VOID_RESONANCE</Text>
              <Text style={[styles.value, { color: '#00F0FF' }]}>STABLE</Text>
            </View>
          </BlurView>

          {/* SIGNAL WAVEFORM (Placeholder for real visualization) */}
          <View style={styles.waveformContainer}>
             <Activity size={120} color="#50FFB0" strokeWidth={1} style={{ opacity: 0.5 }} />
             <Text style={styles.overlayText}>SIGNAL_ACTIVE</Text>
          </View>

          {/* TELEMETRY GRID */}
          <View style={styles.grid}>
            <HUDMetric icon={<Shield size={16} color="#50FFB0" />} label="FIREWALL" value="SECURE" />
            <HUDMetric icon={<Zap size={16} color="#00F0FF" />} label="POWER" value="OPTIMAL" />
          </View>

          {/* TRANSMISSION LOGS */}
          <BlurView intensity={15} style={styles.logContainer}>
            <View style={styles.logHeader}>
              <Terminal size={14} color="#50FFB0" />
              <Text style={styles.logTitle}>SYSTEM_LOGS</Text>
            </View>
            {logs.map((log, i) => (
              <Text key={i} style={styles.logText}>{log}</Text>
            ))}
          </BlurView>

        </View>

      </ImageBackground>
    </View>
  );
};

const HUDMetric = ({ icon, label, value }) => (
  <BlurView intensity={20} style={styles.metricCard}>
    <View style={styles.row}>
      {icon}
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.valueSmall}>{value}</Text>
      </View>
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131313' },
  bg: { flex: 1, width: '100%', height: '100%' },
  topBar: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 0,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#859589', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 2 },
  value: { color: '#FFFFFF', fontSize: 18, fontWeight: '300', letterSpacing: 1 },
  valueSmall: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  statusIndicator: { width: 10, height: 10, borderRadius: 0, backgroundColor: '#50FFB0' },
  hudContent: { flex: 1, padding: 20, justifyContent: 'space-between' },
  bioCard: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(80, 255, 176, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  bioMeta: { justifyContent: 'center' },
  waveformContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    position: 'absolute',
    bottom: 0,
    color: '#50FFB0',
    fontSize: 8,
    letterSpacing: 4,
    opacity: 0.6
  },
  grid: { flexDirection: 'row', gap: 15 },
  metricCard: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  logContainer: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 150,
  },
  logHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  logTitle: { color: '#50FFB0', fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  logText: { color: '#859589', fontSize: 11, fontFamily: 'monospace', marginBottom: 4 },
});

export default NexusHUD;
