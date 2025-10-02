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
import React, { useState, useEffect } from 'react';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const SpeedTestScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState('Auto-Select');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [downloadSpeed, setDownloadSpeed] = useState('-- Mbps');
  const [uploadSpeed, setUploadSpeed] = useState('-- Mbps');
  const [ping, setPing] = useState('-- MS');

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
         
                     <Text style={styles.headerTitle}>Speed Test</Text>
         
                     <View style={styles.headerLeft}>
                       <Text style={styles.time}>{currentTime}</Text>
                       <Text style={styles.date}>{currentDate}</Text>
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
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartTest}
              >
                <Image
                  source={require('../assets/images/powerButton.png')}
                  style={{ marginBottom: 10 }}
                />
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
    paddingHorizontal: '8%',
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
    flexWrap: 'wrap',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,

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

  /* Server Selector */
  serverSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    marginTop: 60,
    borderWidth: 1,
    borderColor: '#2E293E',
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
    color: '#6512CF',
    fontSize: isPhone ? 12 : 14,
  },

  /* Main Content */
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    marginTop: 40
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
    gap: 25,
    alignSelf:'center'
  },
  resultCard: {
    backgroundColor: '#2E293E',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultLabel: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 5,
    fontWeight: '400'
  },
  resultValue: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '400'
  },
});
