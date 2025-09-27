import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  PixelRatio,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

// 🔹 Scaling system
const baseWidth = 375;
const scale = width / baseWidth;
const normalizeFont = (size) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scale));

const SpeedTestModal = ({ visible, onClose }) => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [selectedServer, setSelectedServer] = useState('Auto-Select');
  const [autoSelect, setAutoSelect] = useState(true);
  const [showServerModal, setShowServerModal] = useState(false);
  const [testPhase, setTestPhase] = useState('idle');
  const [downloadSpeed, setDownloadSpeed] = useState('0.00');
  const [uploadSpeed, setUploadSpeed] = useState('0.00');
  const [ping, setPing] = useState('0');

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const serverOptions = [
    { label: 'Auto-Select', value: 'auto' },
    { label: 'New York, NY', value: 'ny' },
    { label: 'Los Angeles, CA', value: 'la' },
    { label: 'London, UK', value: 'london' },
    { label: 'Tokyo, Japan', value: 'tokyo' },
    { label: 'Sydney, Australia', value: 'sydney' },
  ];

  useEffect(() => {
    if (isTestRunning) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
      runSpeedTest();
    } else {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);
    }
  }, [isTestRunning]);

  const runSpeedTest = () => {
    setTestPhase('ping');
    setPing('...');
    setTimeout(() => {
      setPing('12');
      setTestPhase('download');
      simulateDownloadTest();
    }, 1000);
  };

  const simulateDownloadTest = () => {
    let speed = 0;
    const interval = setInterval(() => {
      speed += Math.random() * 20;
      setDownloadSpeed(speed.toFixed(2));
      if (speed >= 150) {
        clearInterval(interval);
        setTestPhase('upload');
        simulateUploadTest();
      }
    }, 100);
  };

  const simulateUploadTest = () => {
    let speed = 0;
    const interval = setInterval(() => {
      speed += Math.random() * 15;
      setUploadSpeed(speed.toFixed(2));
      if (speed >= 120) {
        clearInterval(interval);
        setTestPhase('complete');
        setIsTestRunning(false);
        setTestComplete(true);
      }
    }, 100);
  };

  const startTest = () => {
    if (isTestRunning) return;
    setIsTestRunning(true);
    setTestComplete(false);
    setTestPhase('idle');
    setDownloadSpeed('0.00');
    setUploadSpeed('0.00');
    setPing('0');
  };

  const resetTest = () => {
    setIsTestRunning(false);
    setTestComplete(false);
    setTestPhase('idle');
    setDownloadSpeed('0.00');
    setUploadSpeed('0.00');
    setPing('0');
  };

  const renderServerOption = (item) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedServer(item.label);
        setAutoSelect(item.value === 'auto');
        setShowServerModal(false);
      }}
    >
      <View style={styles.option}>
        <Text style={styles.optionText}>{item.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const getCurrentTime = () =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const getCurrentDate = () =>
    new Date()
      .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      .toUpperCase();

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Speed Test</Text>
                <View style={styles.timeDate}>

                </View>
              </View>
              <Pressable style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {/* Server Settings */}
            <View style={styles.content}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Server:</Text>
                  <Text style={styles.settingValue}>{selectedServer}</Text>
                </View>
                <Pressable style={styles.changeBtn} onPress={() => setShowServerModal(true)}>
                  <Text style={styles.changeBtnText}>▾</Text>
                </Pressable>
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Auto-Select</Text>
                <Pressable
                  style={[styles.toggle, autoSelect && styles.toggleActive]}
                  onPress={() => {
                    setAutoSelect(!autoSelect);
                    if (!autoSelect) setSelectedServer('Auto-Select');
                  }}
                >
                  <View style={[styles.toggleThumb, autoSelect && styles.toggleThumbActive]} />
                </Pressable>
              </View>

              {/* Test Button */}
              <View style={styles.testSection}>
                <Pressable
                  style={[
                    styles.testButton,
                    isTestRunning && styles.testButtonActive,
                    testComplete && styles.testButtonComplete,
                  ]}
                  onPress={testComplete ? resetTest : startTest}
                  disabled={isTestRunning}
                >
                  <Animated.View
                    style={[styles.testButtonInner, isTestRunning && { transform: [{ rotate: spin }] }]}
                  >
                    {isTestRunning ? (
                      <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                      <Text
                        style={[styles.testButtonText, testComplete && styles.testButtonTextComplete]}
                      >
                        {testComplete ? 'Test Again' : 'Start Test'}
                      </Text>
                    )}
                  </Animated.View>
                </Pressable>
              </View>

              {/* Results */}
              <View style={styles.resultsSection}>
                <View style={styles.resultRow}>
                  <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Download Speed</Text>
                    <Text style={styles.resultValue}>{downloadSpeed}</Text>
                    <Text style={styles.resultUnit}>Mbps</Text>
                  </View>
                  <View style={styles.resultDivider} />
                  <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Upload Speed</Text>
                    <Text style={styles.resultValue}>{uploadSpeed}</Text>
                    <Text style={styles.resultUnit}>Mbps</Text>
                  </View>
                </View>

                <View style={styles.pingSection}>
                  <Text style={styles.resultLabel}>Ping</Text>
                  <Text style={styles.pingValue}>{ping}</Text>
                  <Text style={styles.resultUnit}>ms</Text>
                </View>
              </View>

              {isTestRunning && (
                <View style={styles.statusSection}>
                  <Text style={styles.statusText}>
                    {testPhase === 'ping' && 'Testing connection...'}
                    {testPhase === 'download' && 'Testing download speed...'}
                    {testPhase === 'upload' && 'Testing upload speed...'}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Server Modal */}
          <Modal
            transparent
            visible={showServerModal}
            animationType="fade"
            onRequestClose={() => setShowServerModal(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setShowServerModal(false)}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Select Server</Text>
                <FlatList
                  data={serverOptions}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => renderServerOption(item)}
                />
                <Pressable style={styles.cancelBtn} onPress={() => setShowServerModal(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};

export default SpeedTestModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  container: {
    width: width * 0.9,
    maxWidth: 900,
    maxHeight: height * 0.9,
    backgroundColor: '#1a1a1a',
    borderRadius: 20 * scale,
    overflow: 'hidden',
  },
  scrollContent: { flexGrow: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24 * scale,
    paddingVertical: 20 * scale,
    backgroundColor: '#2a2a2a',
  },
  titleSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: { color: '#fff', fontSize: normalizeFont(24), fontWeight: '600', marginRight: 24 * scale },
  timeDate: { alignItems: 'flex-end' },
  time: { color: '#fff', fontSize: normalizeFont(16), fontWeight: '500' },
  date: { color: '#888', fontSize: normalizeFont(12), marginTop: 2 * scale },
  closeBtn: {
    width: 40 * scale,
    height: 40 * scale,
    borderRadius: 20 * scale,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontSize: normalizeFont(18), fontWeight: '300' },
  content: { padding: 24 * scale },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12 * scale,
    marginBottom: 12 * scale,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingInfo: { flex: 1 },
  settingLabel: { color: '#888', fontSize: normalizeFont(14) },
  settingValue: { color: '#fff', fontSize: normalizeFont(16), fontWeight: '500', marginTop: 4 * scale },
  changeBtn: {
    width: 32 * scale,
    height: 32 * scale,
    borderRadius: 16 * scale,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBtnText: { color: '#fff', fontSize: normalizeFont(16) },
  toggle: {
    width: 50 * scale,
    height: 28 * scale,
    borderRadius: 14 * scale,
    backgroundColor: '#333',
    justifyContent: 'center',
    paddingHorizontal: 4 * scale,
  },
  toggleActive: { backgroundColor: '#4285f4' },
  toggleThumb: {
    width: 20 * scale,
    height: 20 * scale,
    borderRadius: 10 * scale,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: { alignSelf: 'flex-end' },
  testSection: { alignItems: 'center', marginVertical: 32 * scale },
  testButton: {
    width: 120 * scale,
    height: 120 * scale,
    borderRadius: 60 * scale,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testButtonActive: { backgroundColor: '#5294f7' },
  testButtonComplete: { backgroundColor: '#34a853' },
  testButtonInner: { justifyContent: 'center', alignItems: 'center' },
  testButtonText: { color: '#fff', fontSize: normalizeFont(16), fontWeight: '600' },
  testButtonTextComplete: { fontSize: normalizeFont(14) },
  resultsSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16 * scale,
    padding: 20 * scale,
    marginTop: 20 * scale,
  },
  resultRow: { flexDirection: 'row', alignItems: 'center' },
  resultItem: { flex: 1, alignItems: 'center' },
  resultDivider: { width: 1, height: 60 * scale, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 20 * scale },
  resultLabel: { color: '#888', fontSize: normalizeFont(12), marginBottom: 8 * scale },
  resultValue: { color: '#fff', fontSize: normalizeFont(28), fontWeight: '700' },
  resultUnit: { color: '#888', fontSize: normalizeFont(12), marginTop: 4 * scale },
  pingSection: {
    alignItems: 'center',
    marginTop: 20 * scale,
    paddingTop: 20 * scale,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  pingValue: { color: '#4285f4', fontSize: normalizeFont(24), fontWeight: '700' },
  statusSection: { alignItems: 'center', marginTop: 20 * scale },
  statusText: { color: '#4285f4', fontSize: normalizeFont(14), fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalBox: {
    backgroundColor: '#2a2a2a',
    width: width * 0.7,
    maxWidth: 500,
    borderRadius: 16 * scale,
    paddingVertical: 16 * scale,
    maxHeight: '70%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: normalizeFont(18),
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 16 * scale,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12 * scale,
  },
  option: {
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  optionText: { color: '#fff', fontSize: normalizeFont(16), textAlign: 'center' },
  cancelBtn: { paddingVertical: 16 * scale, alignItems: 'center', marginTop: 12 * scale },
  cancelText: { color: '#ff6b6b', fontSize: normalizeFont(16), fontWeight: '500' },
});
