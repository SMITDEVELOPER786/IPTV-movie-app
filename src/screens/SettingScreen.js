import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

export default function SettingsScreen() {
   const navigation  = useNavigation()
  const settingsOptions = [
    { id: 1, title: 'General Setting', icon: '⚙️', description: 'App preferences' },
    { id: 2, title: 'VPN', icon: '🔒', description: 'Network security' },
    { id: 3, title: 'Video Format', icon: '🎥', description: 'Quality settings' },
    { id: 4, title: 'Automation', icon: '🤖', description: 'Auto features' },
    { id: 5, title: 'Languages', icon: '🌐', description: 'App language' },
    { id: 6, title: 'Parental Control', icon: '👨‍👩‍👧‍👦', description: 'Family safety' },
    { id: 7, title: 'View Catalogue', icon: '📋', description: 'Content library' },
    { id: 8, title: 'Player Setting', icon: '▶️', description: 'Playback options' },
    { id: 9, title: 'Cast', icon: '📡', description: 'Device casting' },
    { id: 10, title: 'Backup', icon: '💾', description: 'Data backup' },
    { id: 11, title: 'Statistics', icon: '📊', description: 'Usage stats' },
    { id: 12, title: 'Support', icon: '❓', description: 'Help & support' }
  ]

  const handleSettingPress = (setting) => {
    console.log('Selected setting:', setting.title)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Overlay */}
      <View style={styles.backgroundOverlay}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>SETTINGS</Text>
          
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}></Text>
          </TouchableOpacity>
        </View>

        {/* Date/Time Display */}
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
          {/* Settings Grid */}
          <View style={styles.settingsGrid}>
            {settingsOptions.map((setting) => (
              <TouchableOpacity
                key={setting.id}
                style={styles.settingCard}
                onPress={() => handleSettingPress(setting)}
                activeOpacity={0.7}
              >
                <View style={styles.settingIconContainer}>
                  <Text style={styles.settingIcon}>{setting.icon}</Text>
                </View>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Extra space for better scrolling */}
          <View style={styles.extraSpace} />
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 26, 0.95)',
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
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
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
    fontSize: 12,
    fontWeight: '600',
  },
  timeText: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Extra space for navigation arrows
    minHeight: height * 0.8, // Ensure scrollable content
  },
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 4,
  },
  settingCard: {
    width: (width - 48) / 3, // Better calculation for 3 columns
    aspectRatio: 0.9, // Slightly taller cards
    backgroundColor: 'rgba(30, 40, 80, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'rgba(100, 120, 200, 0.3)',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  extraSpace: {
    height: 80, // Extra space at bottom
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
  navigationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    zIndex: 10,
  },
  navArrow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(100, 120, 200, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(100, 120, 200, 0.5)',
  },
  navArrowText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
})