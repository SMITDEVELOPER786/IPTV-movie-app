import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SpeedTestScreen = ({ navigation }) => {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [download, setDownload] = useState('');
  const [upload, setUpload] = useState('');
  const [ping, setPing] = useState('');

  const handleTest = () => {
    if (running) return;
    setRunning(true);
    setCompleted(false);
    setDownload('');
    setUpload('');
    setPing('');

    setTimeout(() => {
      setDownload('152.4');
      setUpload('38.7');
      setPing('22');
      setRunning(false);
      setCompleted(true);
    }, 3000);
  };

  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.background}
    >
      <View style={styles.backgroundOverlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable
              style={({ pressed }) => [
                styles.backButtonHeader,
                pressed && styles.backButtonHeaderPressed,
              ]}
              onPress={() => navigation?.goBack?.()}
            >
              <Text style={styles.backArrow}>←</Text>
            </Pressable>
            <Text style={styles.title}>Speed Test</Text>
            <View style={styles.headerRight}>
              <Text style={styles.time}>10:00PM</Text>
              <Text style={styles.date}>SEP 29, 2025</Text>
            </View>
          </View>

          {/* SERVER CARD */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Server:</Text>
            <Text style={styles.cardValue}>Auto-Select</Text>
          </View>

          {/* MAIN SPLIT */}
          <View style={styles.mainContent}>
            {/* LEFT 50% → Start Button */}
            <View style={styles.leftArea}>
              <Pressable
                onPress={handleTest}
                disabled={running}
                style={({ pressed }) => [
                  styles.startButton,
                  completed && styles.startButtonDone,
                  pressed && styles.startButtonPressed,
                ]}
              >
                <Text style={styles.startButtonText}>
                  {completed ? 'Done' : running ? 'Testing...' : 'Start Test'}
                </Text>
              </Pressable>
            </View>

            {/* RIGHT 50% → Results */}
            <View style={styles.rightArea}>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Download</Text>
                <Text style={styles.resultValue}>
                  {download || '--'} <Text style={styles.unit}>Mbps</Text>
                </Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Upload</Text>
                <Text style={styles.resultValue}>
                  {upload || '--'} <Text style={styles.unit}>Mbps</Text>
                </Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Ping</Text>
                <Text style={styles.resultValue}>
                  {ping || '--'} <Text style={styles.unit}>ms</Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: { padding: 24, paddingTop: 40 },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonHeader: {
    padding: 8,
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  backButtonHeaderPressed: { backgroundColor: 'rgba(255,255,255,0.2)' },
  backArrow: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  headerRight: { alignItems: 'flex-end' },
  time: { fontSize: 16, fontWeight: '600', color: '#fff' },
  date: { fontSize: 13, color: '#ddd', marginTop: 2 },

  // SERVER CARD
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardLabel: { fontSize: 16, color: '#eee' },
  cardValue: { fontSize: 16, fontWeight: '600', color: '#fff' },

  // MAIN SPLIT
  mainContent: { flexDirection: 'row', flex: 1 },

  leftArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  rightArea: { flex: 1, justifyContent: 'space-evenly' },

  // BIG START BUTTON
  startButton: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2196f3',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  startButtonDone: { backgroundColor: '#27ae60', shadowColor: '#27ae60' },
  startButtonPressed: { opacity: 0.85 },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  // RESULTS
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
  },
  resultLabel: { fontSize: 16, color: '#ddd' },
  resultValue: { fontSize: 22, fontWeight: '700', color: '#fff', marginTop: 6 },
  unit: { fontSize: 14, color: '#bbb' },
});

export default SpeedTestScreen;
