// src/screens/SpeedTestScreen.tsx
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const SpeedTestScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState('Auto-Select');

  // Mock speed test results
  const [downloadSpeed, setDownloadSpeed] = useState('-- Mbps');
  const [uploadSpeed, setUploadSpeed] = useState('-- Mbps');
  const [ping, setPing] = useState('-- MS');

  const handleStartTest = () => {
    // Simulate speed test
    setTimeout(() => {
      setDownloadSpeed('87.4 Mbps');
      setUploadSpeed('42.1 Mbps');
      setPing('23 MS');
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../assets/images/Thumb.png')} // Replace with actual speed test bg if needed
      style={styles.imageBg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Header />

                              {/* Back Arrow - Bottom Left */}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header Row - Left Title, Right Date/Time */}
          <View style={styles.headerRow}>

            <Text style={styles.screenTitle}>Speed Test</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>10:00PM</Text>
              <Text style={styles.dateTimeText}>AUG 29TH, 2025</Text>
            </View>
          </View>

          {/* Server Selector - Centered Below Header */}
          <TouchableOpacity 
            style={styles.serverSelector}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.serverLabel}>Server:</Text>
            <View style={styles.serverValueContainer}>
              <Text style={styles.serverValue}>{selectedServer}</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </View>
          </TouchableOpacity>

          {/* Main Content - Left Button, Right Cards */}
          <View style={styles.mainContent}>
            {/* Left Column: Start Test Button */}
            <View style={styles.leftColumn}>
              <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
               <Text style={styles.text}> </Text> {/* power icon here  */}
                <Text style={styles.startButtonText}>Start Test</Text>
              </TouchableOpacity>
            </View>

            {/* Right Column: Results Cards */}
            <View style={styles.rightColumn}>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Download Speed:</Text>
                <Text style={styles.resultValue}>{downloadSpeed}</Text>
              </View>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Upload Speed:</Text>
                <Text style={styles.resultValue}>{uploadSpeed}</Text>
              </View>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Ping:</Text>
                <Text style={styles.resultValue}>{ping}</Text>
              </View>
            </View>
          </View>


        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default SpeedTestScreen;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 40,
    paddingRight: '8%',
    paddingLeft: '8%',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    color: '#fff',
    fontSize: isPhone ? 20 : 28,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dateTimeText: {
    color: '#fff',
    fontSize: isPhone ? 12 : 14,
    fontWeight: '500',
  },
  serverSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 30,
  },
  serverLabel: {
    color: '#fff',
    fontSize: isPhone ? 14 : 16,
  },
  serverValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  serverValue: {
    color: '#fff',
    fontSize: isPhone ? 14 : 16,
  },
  dropdownIcon: {
    color: '#aaa',
    fontSize: isPhone ? 12 : 14,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    width: isPhone ? 120 : 190,
    height: isPhone ? 120 : 190,
    borderRadius: 150,
    marginTop:50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startIcon: {
    fontSize: isPhone ? 32 : 40,
    color: '#fff',
    marginBottom: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: isPhone ? 14 : 16,
    fontWeight: 'bold',
  },
  rightColumn: {
    flex: 1,
    gap: 15,
  },
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  resultLabel: {
    color: '#fff',
    fontSize: isPhone ? 14 : 16,
    marginBottom: 5,
  },
  resultValue: {
    color: '#fff',
    fontSize: isPhone ? 18 : 24,
    fontWeight: 'bold',
  },
  backArrow: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  backArrowText: {
    color: '#fff',
    fontSize: isPhone ? 24 : 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: isPhone ? '80%' : 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: isPhone ? 18 : 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: isPhone ? 16 : 18,
  },
  cancelOption: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  cancelText: {
    color: '#ff4444',
  },
});