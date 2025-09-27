import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
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

const { width, height } = Dimensions.get('window');
const isTV = width >= 1000; // Threshold for TV screens

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [activeModal, setActiveModal] = useState(null);

  const settingsOptions = [
    {
      id: 1,
      title: 'General Setting',
      icon: '⚙️',
      description: 'App preferences',
      nav: 'GeneralSettings',
    },
    { id: 2, title: 'VPN', icon: '🔒', description: 'Network security' },
    {
      id: 3,
      title: 'Video Format',
      icon: '🎥',
      description: 'Quality settings',
    },
    { id: 4, title: 'Automation', icon: '🤖', description: 'Auto features' },
    { id: 5, title: 'Feedback', icon: '🌐', description: 'App language' },
    {
      id: 6,
      title: 'Parental Control',
      icon: '👨‍👩‍👧‍👦',
      description: 'Family safety',
    },
    {
      id: 7,
      title: 'Player Selection',
      icon: '▷',
      description: 'Movie Selection',
    },
    {
      id: 8,
      title: 'Player Setting',
      icon: '▶️',
      description: 'Playback options',
    },
    { id: 9, title: 'Speed Test', icon: '⚡️', description: 'Speed Text' },
    {
      id: 13,
      title: 'EPG',
      icon: '🕒',
      description: 'Help & support',
      nav: 'EPG',
    },
    {
      id: 14,
      title: 'Subtitle',
      icon: '▶️',
      description: 'Comfort options',
    },
    {
      id: 15,
      title: 'MultiScreen Mode',
      icon: '🖥️', 
      description: 'Multi-screen settings',
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
    } else if(setting.title === 'Speed Test'){
      setActiveModal('speed');
    } else if(setting.title === 'Feedback'){
      setActiveModal('feedback')
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
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SETTINGS</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuText}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeLeft}>
              <Text style={styles.dateText}>29TH, 2025</Text>
              <Text style={styles.timeText}>10:00PM</Text>
            </View>
            <View style={styles.dateTimeRight}>
              <Text style={styles.dateText}>AUG 29TH, 2025</Text>
              <Text style={styles.timeText}>10:00PM</Text>
            </View>
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            <View style={[styles.settingsGrid, isTV && styles.tvSettingsGrid]}>
              {settingsOptions.map(setting => (
                <TouchableOpacity
                  key={setting.id}
                  style={[styles.settingCard, isTV && styles.tvSettingCard]}
                  onPress={() => handleSettingPress(setting)}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingIconContainer}>
                    <Text style={styles.settingIcon}>{setting.icon}</Text>
                  </View>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>
                    {setting.description}
                  </Text>
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
    backgroundColor: 'rgba(16, 16, 24, 0.95)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: isTV ? 60 : 38,
    height: isTV ? 60 : 38,
    borderRadius: isTV ? 30 : 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: isTV ? 30 : 20,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: isTV ? 30 : 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  menuButton: {
    paddingHorizontal: isTV ? 20 : 12,
    paddingVertical: isTV ? 16 : 8,
    borderRadius: 6,
  },
  menuText: {
    color: '#aaa',
    fontSize: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  dateTimeLeft: {
    alignItems: 'flex-start',
  },
  dateTimeRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#fff',
    fontSize: isTV ? 16 : 12,
    fontWeight: '600',
  },
  timeText: {
    color: '#aaa',
    fontSize: isTV ? 14 : 11,
    marginTop: 2,
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
  },
  tvSettingsGrid: {
    justifyContent: 'space-around',
  },
  settingCard: {
    width: (width - 48) / 3,
    aspectRatio: 0.9,
    backgroundColor: 'rgba(30, 40, 80, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'rgba(100, 120, 200, 0.3)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tvSettingCard: {
    width: (width - 80) / 5,
    padding: 20,
  },
  extraSpace: {
    height: 80,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 120, 200, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 12,
  },
  settingDescription: {
    color: '#aaa',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 10,
  },
});