import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const SpeedTestScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState('Auto-Select');

  const [downloadSpeed, setDownloadSpeed] = useState('-- Mbps');
  const [uploadSpeed, setUploadSpeed] = useState('-- Mbps');
  const [ping, setPing] = useState('-- MS');

  const handleStartTest = () => {
    setTimeout(() => {
      setDownloadSpeed('87.4 Mbps');
      setUploadSpeed('42.1 Mbps');
      setPing('23 MS');
    }, 2000);
  };

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
          <View style={styles.headerRow}>
            <Pressable
              style={styles.backArrowContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrowText}>←</Text>
            </Pressable>

            <View style={styles.titleContainer}>
              <Text style={styles.screenTitle}>Speed Test</Text>
            </View>

            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>10:00PM</Text>
              <Text style={styles.dateTimeText}>AUG 29TH, 2025</Text>
            </View>
          </View>

          {/* Server Selector */}
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

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.leftColumn}>
              <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
                <Image source={require('../assets/images/powerButton.png')} style={{marginBottom: 10}}/>
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
    paddingHorizontal: '8%',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },

  /* Header Row */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backArrowContainer: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: 'rgba(100, 98, 98, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowText: {
    color: '#fff',
    fontSize: isPhone ? 24 : 32,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
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

  /* Server Selector */
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

  /* Main Content */
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
    marginTop: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
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
});
