import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, TouchableOpacity, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { LayoutDashboard, Radio, PenTool, Settings } from 'lucide-react-native';
import NexusHUD from './src/components/NexusHUD';
import TransmissionFeed from './src/components/TransmissionFeed';

export default function App() {
  const [activeTab, setActiveTab] = useState('nexus');
  const [selectedItem, setSelectedItem] = useState(null);

  const renderContent = () => {
    if (selectedItem) {
      return (
        <View style={styles.readerContainer}>
          <SafeAreaView>
            <TouchableOpacity onPress={() => setSelectedItem(null)} style={styles.backBtn}>
              <Text style={styles.backText}>{'< BACK_TO_FEED'}</Text>
            </TouchableOpacity>
            <Text style={styles.readerTitle}>{selectedItem.title}</Text>
            <Text style={styles.readerContent}>{selectedItem.content_text || selectedItem.content}</Text>
          </SafeAreaView>
        </View>
      );
    }

    switch (activeTab) {
      case 'nexus': return <NexusHUD />;
      case 'feed': return <TransmissionFeed onSelect={setSelectedItem} />;
      default: return <View style={styles.placeholder}><Text style={styles.placeholderText}>MODULE_OFFLINE</Text></View>;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* MAIN VIEWPORT */}
      <View style={styles.viewport}>
        {renderContent()}
      </View>

      {/* FOOTER NAVIGATION */}
      <BlurView intensity={25} style={styles.footer}>
        <NavButton 
          active={activeTab === 'nexus'} 
          onPress={() => { setActiveTab('nexus'); setSelectedItem(null); }}
          icon={<LayoutDashboard size={20} color={activeTab === 'nexus' ? '#50FFB0' : '#859589'} />}
          label="NEXUS"
        />
        <NavButton 
          active={activeTab === 'feed'} 
          onPress={() => { setActiveTab('feed'); setSelectedItem(null); }}
          icon={<Radio size={20} color={activeTab === 'feed' ? '#50FFB0' : '#859589'} />}
          label="FEED"
        />
        <NavButton 
          active={activeTab === 'forge'} 
          onPress={() => { setActiveTab('forge'); setSelectedItem(null); }}
          icon={<PenTool size={20} color={activeTab === 'forge' ? '#50FFB0' : '#859589'} />}
          label="FORGE"
        />
        <NavButton 
          active={activeTab === 'settings'} 
          onPress={() => { setActiveTab('settings'); setSelectedItem(null); }}
          icon={<Settings size={20} color={activeTab === 'settings' ? '#50FFB0' : '#859589'} />}
          label="SYS"
        />
      </BlurView>
    </View>
  );
}

const NavButton = ({ active, icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.navBtn}>
    {icon}
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131313' },
  viewport: { flex: 1 },
  footer: {
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 25,
    borderTopWidth: 0,
  },
  navBtn: { alignItems: 'center', gap: 4 },
  navLabel: { color: '#859589', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  navLabelActive: { color: '#50FFB0' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#859589', fontSize: 12, letterSpacing: 4 },
  readerContainer: { flex: 1, padding: 25, backgroundColor: '#131313' },
  backBtn: { marginBottom: 30, marginTop: 20 },
  backText: { color: '#50FFB0', fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  readerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '300', marginBottom: 20 },
  readerContent: { color: '#BACBBE', fontSize: 16, lineHeight: 26 },
});
