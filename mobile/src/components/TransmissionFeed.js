import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { supabase, legacySupabase } from '../lib/supabase';
import { cache } from '../lib/cache';
import { Radio, Share2, Clock } from 'lucide-react-native';

const TransmissionFeed = ({ onSelect }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('public:blogvrinda')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogvrinda' }, loadData)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const loadData = async () => {
    // 1. Load from Cache
    const cached = await cache.get('mobile_feed');
    if (cached) setItems(cached);

    try {
      const { data, error } = await supabase
        .from('blogvrinda')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) {
        setItems(data);
        await cache.set('mobile_feed', data);
      }
    } catch (err) {
      console.error('Feed Load Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.cardContainer}>
      <BlurView intensity={10} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.sourceTag}>
             <Radio size={10} color="#00F0FF" />
             <Text style={styles.sourceText}>{item.category || 'SYSTEM'}</Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(item.created_at).toLocaleDateString('en-GB').replace(/\//g, '.')}
          </Text>
        </View>
        
        <Text style={styles.title}>{item.title || 'Untitled Transmission'}</Text>
        <Text style={styles.preview} numberOfLines={2}>
          {item.content_text || item.content || 'Decrypting content...'}
        </Text>

        <View style={styles.cardFooter}>
           <View style={styles.meta}>
              <Clock size={12} color="#859589" />
              <Text style={styles.metaText}>12m READ</Text>
           </View>
           <Share2 size={16} color="#859589" />
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && items.length === 0 ? (
        <ActivityIndicator color="#50FFB0" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131313' },
  list: { padding: 20 },
  cardContainer: { backgroundColor: 'rgba(255,255,255,0.02)' },
  card: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sourceTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sourceText: { color: '#00F0FF', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  dateText: { color: '#859589', fontSize: 10, fontFamily: 'monospace' },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginBottom: 8, letterSpacing: 0.5 },
  preview: { color: '#BACBBE', fontSize: 13, lineHeight: 18, marginBottom: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: '#859589', fontSize: 10, fontWeight: '600' },
});

export default TransmissionFeed;
