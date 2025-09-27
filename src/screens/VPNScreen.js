import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');
const isTV = width >= 1000;
const isLargeTV = width >= 1920; // 4K TV support
const scale = isLargeTV ? 1.5 : isTV ? 1.2 : 1;

const VPNModal = ({ visible, onClose }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedServer, setSelectedServer] = useState('United States');
  const [selectedProtocol, setSelectedProtocol] = useState('OpenVPN');
  const [showServerModal, setShowServerModal] = useState(false);
  const [showProtocolModal, setShowProtocolModal] = useState(false);

  const serverOptions = [
    { label: 'United States', value: 'US', flag: '🇺🇸' },
    { label: 'United Kingdom', value: 'UK', flag: '🇬🇧' },
    { label: 'Canada', value: 'CA', flag: '🇨🇦' },
    { label: 'Germany', value: 'DE', flag: '🇩🇪' },
    { label: 'Japan', value: 'JP', flag: '🇯🇵' },
  ];
  
  const protocolOptions = ['OpenVPN', 'WireGuard', 'IPSec', 'L2TP'];

  const renderServerOption = (item) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedServer(item.label);
        setShowServerModal(false);
      }}
    >
      <View style={styles.option}>
        <Text style={styles.optionText}>
          {item.flag} {item.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderProtocolOption = (item) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedProtocol(item);
        setShowProtocolModal(false);
      }}
    >
      <View style={styles.option}>
        <Text style={styles.optionText}>{item}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isTV && styles.tvContainer]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>VPN</Text>
              <View style={styles.timeDate}>
                <Text style={styles.time}>{getCurrentTime()}</Text>
                <Text style={styles.date}>{getCurrentDate()}</Text>
              </View>
            </View>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Power Button */}
            <View style={styles.powerSection}>
              <Pressable
                style={[styles.powerButton, isEnabled && styles.powerButtonActive]}
                onPress={() => setIsEnabled(!isEnabled)}
              >
                <View style={[styles.powerIcon, isEnabled && styles.powerIconActive]}>
                  <Text style={[styles.powerText, isEnabled && styles.powerTextActive]}>
                    ⏻
                  </Text>
                </View>
              </Pressable>
              <Text style={styles.statusText}>
                {isEnabled ? 'CONNECTED' : 'DISCONNECTED'}
              </Text>
            </View>

            {/* Server Selection */}
            <View style={[styles.settingRow, !isEnabled && styles.disabled]}>
              <View style={styles.serverInfo}>
                <Text style={styles.serverFlag}>🇺🇸</Text>
                <View>
                  <Text style={styles.serverLabel}>Server Location</Text>
                  <Text style={styles.serverValue}>{selectedServer}</Text>
                </View>
              </View>
              <Pressable
                style={styles.changeBtn}
                onPress={() => isEnabled && setShowServerModal(true)}
                disabled={!isEnabled}
              >
                <Text style={[styles.changeBtnText, !isEnabled && styles.disabledText]}>
                  →
                </Text>
              </Pressable>
            </View>

            {/* Stats */}
            {isEnabled && (
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>↓ 28.5 MB/s</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>↑ 31.6 MB/s</Text>
                </View>
              </View>
            )}

            {/* Protocol Selection */}
            <View style={[styles.settingRow, !isEnabled && styles.disabled]}>
              <View>
                <Text style={styles.settingLabel}>Connection Protocol</Text>
                <Text style={styles.settingValue}>{selectedProtocol}</Text>
              </View>
              <Pressable
                style={styles.changeBtn}
                onPress={() => isEnabled && setShowProtocolModal(true)}
                disabled={!isEnabled}
              >
                <Text style={[styles.changeBtnText, !isEnabled && styles.disabledText]}>
                  →
                </Text>
              </Pressable>
            </View>

            {/* IP Display */}
            {isEnabled && (
              <View style={styles.ipSection}>
                <Text style={styles.ipLabel}>IP: 99.110.0.16</Text>
              </View>
            )}
          </View>

          {/* Server Selection Modal */}
          <Modal
            transparent
            visible={showServerModal}
            animationType="fade"
            onRequestClose={() => setShowServerModal(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowServerModal(false)}
            >
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Select Server</Text>
                <FlatList
                  data={serverOptions}
                  keyExtractor={item => item.value}
                  renderItem={({ item }) => renderServerOption(item)}
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setShowServerModal(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>

          {/* Protocol Selection Modal */}
          <Modal
            transparent
            visible={showProtocolModal}
            animationType="fade"
            onRequestClose={() => setShowProtocolModal(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowProtocolModal(false)}
            >
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Select Protocol</Text>
                <FlatList
                  data={protocolOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) => renderProtocolOption(item)}
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setShowProtocolModal(false)}
                >
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

export default VPNModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: isLargeTV ? '45%' : isTV ? '55%' : '85%',
    maxWidth: isLargeTV ? 900 : 800,
    backgroundColor: '#1a1a1a',
    borderRadius: 20 * scale,
    overflow: 'hidden',
    // Ensure proper aspect ratio for different TV sizes
    minHeight: isLargeTV ? 600 : isTV ? 500 : 400,
  },
  tvContainer: {
    width: isLargeTV ? '40%' : '50%',
    maxWidth: isLargeTV ? 800 : 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: (isLargeTV ? 50 : isTV ? 40 : 24) * scale,
    paddingVertical: (isLargeTV ? 35 : isTV ? 30 : 20) * scale,
    backgroundColor: '#2a2a2a',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 40 : isTV ? 32 : 24) * scale,
    fontWeight: '600',
    marginRight: (isLargeTV ? 50 : isTV ? 40 : 24) * scale,
  },
  timeDate: {
    alignItems: 'flex-end',
  },
  time: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 24 : isTV ? 20 : 16) * scale,
    fontWeight: '500',
  },
  date: {
    color: '#888',
    fontSize: (isLargeTV ? 18 : isTV ? 14 : 12) * scale,
    marginTop: 2 * scale,
  },
  closeBtn: {
    width: (isLargeTV ? 60 : isTV ? 50 : 40) * scale,
    height: (isLargeTV ? 60 : isTV ? 50 : 40) * scale,
    borderRadius: (isLargeTV ? 30 : isTV ? 25 : 20) * scale,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 30 : isTV ? 24 : 18) * scale,
    fontWeight: '300',
  },
  content: {
    paddingHorizontal: (isLargeTV ? 50 : isTV ? 40 : 24) * scale,
    paddingVertical: (isLargeTV ? 45 : isTV ? 40 : 24) * scale,
  },
  powerSection: {
    alignItems: 'center',
    marginBottom: (isLargeTV ? 50 : isTV ? 40 : 32) * scale,
  },
  powerButton: {
    width: (isLargeTV ? 140 : isTV ? 120 : 100) * scale,
    height: (isLargeTV ? 140 : isTV ? 120 : 100) * scale,
    borderRadius: (isLargeTV ? 70 : isTV ? 60 : 50) * scale,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
    borderWidth: 3 * scale,
    borderColor: '#555',
  },
  powerButtonActive: {
    backgroundColor: '#4285f4',
    borderColor: '#5294f7',
  },
  powerIcon: {
    width: (isLargeTV ? 90 : isTV ? 80 : 60) * scale,
    height: (isLargeTV ? 90 : isTV ? 80 : 60) * scale,
    borderRadius: (isLargeTV ? 45 : isTV ? 40 : 30) * scale,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerIconActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  powerText: {
    color: '#888',
    fontSize: (isLargeTV ? 42 : isTV ? 36 : 28) * scale,
    fontWeight: '300',
  },
  powerTextActive: {
    color: '#ffffff',
  },
  statusText: {
    color: '#888',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
    fontWeight: '500',
    letterSpacing: 1 * scale,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
    borderBottomWidth: 1 * scale,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serverFlag: {
    fontSize: (isLargeTV ? 38 : isTV ? 32 : 24) * scale,
    marginRight: (isLargeTV ? 20 : isTV ? 16 : 12) * scale,
  },
  serverLabel: {
    color: '#888',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
    marginBottom: 4 * scale,
  },
  serverValue: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 22 : isTV ? 20 : 16) * scale,
    fontWeight: '500',
  },
  settingLabel: {
    color: '#888',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
    marginBottom: 4 * scale,
  },
  settingValue: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 22 : isTV ? 20 : 16) * scale,
    fontWeight: '500',
  },
  changeBtn: {
    width: (isLargeTV ? 60 : isTV ? 50 : 40) * scale,
    height: (isLargeTV ? 60 : isTV ? 50 : 40) * scale,
    borderRadius: (isLargeTV ? 30 : isTV ? 25 : 20) * scale,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBtnText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 28 : isTV ? 24 : 18) * scale,
    fontWeight: '300',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: (isLargeTV ? 80 : isTV ? 60 : 40) * scale,
    paddingVertical: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#4285f4',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : 14) * scale,
    fontWeight: '500',
  },
  ipSection: {
    alignItems: 'center',
    paddingTop: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
  },
  ipLabel: {
    color: '#888',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.4,
  },
  disabledText: {
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#2a2a2a',
    width: isLargeTV ? '35%' : isTV ? '40%' : '70%',
    maxWidth: isLargeTV ? 500 : 400,
    borderRadius: 16 * scale,
    paddingVertical: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
    maxHeight: '70%',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 28 : isTV ? 24 : 18) * scale,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
    borderBottomWidth: 1 * scale,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: (isLargeTV ? 20 : isTV ? 16 : 12) * scale,
  },
  option: {
    paddingVertical: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
    paddingHorizontal: (isLargeTV ? 30 : isTV ? 24 : 20) * scale,
    borderBottomWidth: 1 * scale,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  optionText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 22 : isTV ? 20 : 16) * scale,
    textAlign: 'center',
    fontWeight: '400',
  },
  cancelBtn: {
    paddingVertical: (isLargeTV ? 25 : isTV ? 20 : 16) * scale,
    alignItems: 'center',
    marginTop: (isLargeTV ? 20 : isTV ? 16 : 12) * scale,
  },
  cancelText: {
    color: '#ff6b6b',
    fontSize: (isLargeTV ? 22 : isTV ? 20 : 16) * scale,
    fontWeight: '500',
  },
});