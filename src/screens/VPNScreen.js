import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const VPNScreen = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedServer, setSelectedServer] = useState('United States');
  const [showServerModal, setShowServerModal] = useState(false);

  const serverOptions = [
    { label: 'United States', value: 'US', flag: '🇺🇸' },
    { label: 'United Kingdom', value: 'UK', flag: '🇬🇧' },
    { label: 'Canada', value: 'CA', flag: '🇨🇦' },
    { label: 'Germany', value: 'DE', flag: '🇩🇪' },
    { label: 'Japan', value: 'JP', flag: '🇯🇵' },
  ];

  const renderServerOption = item => (
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };
      let dateParts = now.toLocaleDateString('en-US', options).toUpperCase();
      let day = now.getDate();
      let suffix =
        day % 10 === 1 && day !== 11
          ? 'ST'
          : day % 10 === 2 && day !== 12
          ? 'ND'
          : day % 10 === 3 && day !== 13
          ? 'RD'
          : 'TH';
      dateParts = dateParts.replace(String(day), `${day}${suffix}`);

      setCurrentTime(time);
      setCurrentDate(dateParts);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <ImageBackground
      source={require('../assets/images/Thumb.png')}
      style={styles.imageBg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headers}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../assets/images/backBtn.png')}
                style={{ tintColor: '#fff' }}
              />
            </Pressable>

            <Text style={styles.headerTitle}>VPN</Text>

            {/* Time & Date */}
            <View style={styles.headerLeft}>
              <Text style={styles.time}>{currentTime}</Text>
              <Text style={styles.date}>{currentDate}</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Server Selection */}
            <View style={[styles.serverRow, !isEnabled && styles.disabled]}>
              <View style={styles.serverInfo}>
                <Text style={styles.serverFlag}>🇺🇸</Text>

                <View>
                  <Text style={styles.serverValue}>{selectedServer}</Text>
                  {/* IP Display */}
                  {isEnabled && (
                    <View style={styles.ipSection}>
                      <Text style={styles.ipLabel}>IP: 99.110.0.16</Text>
                    </View>
                  )}
                </View>
              </View>
              <Pressable
                style={styles.changeBtn}
                onPress={() => isEnabled && setShowServerModal(true)}
                disabled={!isEnabled}
              >
                <Text
                  style={[
                    styles.changeBtnText,
                    !isEnabled && styles.disabledText,
                  ]}
                >
                  ›
                </Text>
              </Pressable>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              {isEnabled ? (
                <>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>
                      <Text style={styles.statArrowDown}>↓</Text> 28.5 KB/s
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>
                      <Text style={styles.statArrowUp}>↑</Text> 31.6 MB/s
                    </Text>
                  </View>
                </>
              ) : (
                <View style={{ flex: 1 }} />
              )}
            </View>

            {/* Power Button */}
            <View style={styles.powerSection}>
              <Pressable
                style={[
                  styles.powerButton,
                  isEnabled && styles.powerButtonActive,
                ]}
                onPress={() => setIsEnabled(!isEnabled)}
              >
                <Image
                  source={require('../assets/images/powerButton.png')}
                  style={[styles.powerImg, isEnabled && styles.powerImgActive]}
                />
              </Pressable>
              <Text style={styles.statusText}>
                {isEnabled ? 'CONNECTED' : 'DISCONNECTED'}
              </Text>
            </View>
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
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default VPNScreen;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 20,
    paddingRight: '8%',
    paddingLeft: '8%',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  /* Header */
  headers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1,
  },

  /* Time & Date */
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  time: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    color: '#fff',
  },

  content: {
    padding: 20,
    marginTop: 80,
    alignSelf: 'flex-end',
  },
  serverInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  serverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 18,
    marginBottom: 20,
    backgroundColor: '#13141C',
    width: '40%',
  },
  serverValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  serverFlag: { fontSize: 30 },
  ipLabel: { color: '#FFFFFF', fontSize: 12, marginTop: 4 },
  changeBtn: {
    marginLeft: 'auto',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  statLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
  statArrowDown: { color: '#6622CC', fontSize: 20, fontWeight: '600' },

  statArrowUp: { color: '#22CCC2', fontSize: 20, fontWeight: '600' },
  powerImg: { width: 30, height: 30, tintColor: '#fff' },
  powerImgActive: { tintColor: '#22CCC2' },
  powerSection: {
    marginTop: 60,
    alignSelf: 'center',
  },
  powerButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2489FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerButtonActive: {
    backgroundColor: '#1e6ecad2',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 20,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#1E1E2C',
    borderRadius: 20,
    width: '85%',
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  cancelBtn: {
    marginTop: 20,
    backgroundColor: '#2489FF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
