import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import VideoFormatModal from './VideoFormatModal';
import { useNavigation } from '@react-navigation/native';
import AutomationSettingsModal from './AutomationSettingsModal';
import ParentalControlModal from './ParentalControlModal';
import PlayerSelectionModal from './PlayerSelectionModal';
import SubtitleModal from './SubtitleModal';
import MultiScreenModal from './MultiScreen';
import VPNModal from './VPNScreen';
import SpeedTestModal from './SpeedTestScreen';
import FeedbackScreen from './FeedbackScreen';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const isPhone = width < 768;

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [activeModal, setActiveModal] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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

  const settingsOptions = [
    {
      id: 1,
      title: 'General Setting',
      icon: require('../assets/images/general.png'),
      nav: 'GeneralSettings',
    },
    {
      id: 2,
      title: 'VPN',
      icon: require('../assets/images/vpn.png'),
    },
    {
      id: 3,
      title: 'Video Format',
      icon: require('../assets/images/video.png'),
    },
    {
      id: 4,
      title: 'Automation',
      icon: require('../assets/images/automation.png'),
    },
    {
      id: 5,
      title: 'Feedback',
      icon: require('../assets/images/feedback.png'),
    },
    {
      id: 6,
      title: 'Parental Control',
      icon: require('../assets/images/parental.png'),
    },
    {
      id: 7,
      title: 'Player Selection',
      icon: require('../assets/images/playersection.png'),
    },
    {
      id: 8,
      title: 'Player Setting',
      icon: require('../assets/images/playersetting.png'),
    },
    {
      id: 9,
      title: 'Speed Test',
      icon: require('../assets/images/speed.png'),
    },
    {
      id: 13,
      title: 'EPG',
      icon: require('../assets/images/epg.png'),
      nav: 'EPG',
    },
    {
      id: 14,
      title: 'Subtitle',
      icon: require('../assets/images/subtitle.png'),
    },
    {
      id: 15,
      title: 'MultiScreen Mode',
      icon: require('../assets/images/multi.png'),
    },
  ];

  const handleSettingPress = setting => {
    if (setting.nav) {
      navigation.navigate(setting.nav);
    } else if (setting.title === 'Video Format') {
      setActiveModal('video');
    } else if (setting.title === 'Automation') {
      setActiveModal('automation');
    } else if (setting.title === 'Parental Control') {
      setActiveModal('parental');
    } else if (setting.title === 'Player Setting') {
      setActiveModal('player');
    } else if (setting.title === 'Subtitle') {
      setActiveModal('subtitle');
    } else if (setting.title === 'MultiScreen Mode') {
      setActiveModal('multiscreen');
    } else if (setting.title === 'VPN') {
      setActiveModal('vpn');
    } else if (setting.title === 'Speed Test') {
      setActiveModal('speed');
    } else if (setting.title === 'Feedback') {
      setActiveModal('feedback');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/Thumb.png')}
      style={styles.imageBg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.backgroundOverlay}>
          <View style={styles.headers}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Settings</Text>

            <View style={styles.headerLeft}>
              <Text style={styles.time}>{currentTime}</Text>
              <Text style={styles.date}>{currentDate}</Text>
            </View>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            <View style={[styles.settingsGrid, isPhone && { justifyContent: 'center', flexDirection:'column', alignItems:'center' }]}>
              {settingsOptions.map(setting => (
                <TouchableOpacity
                  key={setting.id}
                  style={[
                    { borderRadius: 12, overflow: 'hidden' },
                    isPhone && { width: '100%', height: 170} ,
                  ]}
                  onPress={() => handleSettingPress(setting)}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={['#111017', '#070031']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.settingCard}
                  >
                    <View style={styles.settingIconContainer}>
                      <Image source={setting.icon} style={styles.settingIcon} />
                    </View>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.extraSpace} />
            <VideoFormatModal
              visible={activeModal === 'video'}
              onClose={() => setActiveModal(null)}
            />
            <AutomationSettingsModal
              visible={activeModal === 'automation'}
              onClose={() => setActiveModal(null)}
            />
            <ParentalControlModal
              visible={activeModal === 'parental'}
              onClose={() => setActiveModal(null)}
            />
            <PlayerSelectionModal
              visible={activeModal === 'player'}
              onClose={() => setActiveModal(null)}
            />
            <SubtitleModal
              visible={activeModal === 'subtitle'}
              onClose={() => setActiveModal(null)}
            />
            <MultiScreenModal
              visible={activeModal === 'multiscreen'}
              onClose={() => setActiveModal(null)}
            />
            <VPNModal
              visible={activeModal === 'vpn'}
              onClose={() => setActiveModal(null)}
            />
            <SpeedTestModal
              visible={activeModal === 'speed'}
              onClose={() => setActiveModal(null)}
            />
            <FeedbackScreen
              visible={activeModal === 'feedback'}
              onClose={() => setActiveModal(null)}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    padding: 20,
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
  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  menuText: {
    color: '#aaa',
    fontSize: 12,
  },

  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    minHeight: height * 0.8,
  },
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 4,
    gap: 20,
  },

  settingCard: {
    width: 230,
    height: 130,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  settingIconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingIcon: {
    width: 22,
    height: 22,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 12,
  },
});
