import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import AddPlaylistModal from '../screens/AddPlaylistModal';
import NotificationModal from '../screens/NotificationScreen';
import MultiScreenModal from '../screens/MultiScreen';

import { useNavigation } from '@react-navigation/native';

const { width} = Dimensions.get('window');
const isPhone = width < 768;
const isTV = width >= 1000;
const isLargeTV = width >= 1920;
const scale = isLargeTV ? 1.5 : isTV ? 1.2 : 1;

export default function HomeScreen({ navigation }) {
  const mainnavigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  
  // Mock notification count - you can replace this with actual data
  const [unreadNotifications] = useState(3);

  const handleCardClick = screenName => {
    mainnavigation.navigate(screenName);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ImageBackground
        source={require('../assets/images/Thumb.png')}
        style={styles.bg}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.time}>10:00 PM</Text>
              <Text style={styles.date}>AUG 29TH, 2025</Text>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.notificationBtn}
                onPress={() => setIsNotificationVisible(true)}
              >
                <Text style={styles.notificationIcon}>🔔</Text>
                {unreadNotifications > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.settingsBtn}
                onPress={() => handleCardClick('Settings')}
              >
                <Text style={styles.settingsIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.search}
              placeholder="Master Search"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Categories */}
          <View style={[styles.categoryRow, isPhone && {flexDirection:'column', alignItems:'center'}]}>
            <TouchableOpacity
              style={[styles.card, isPhone && {width:'90%'}]}
              onPress={() => handleCardClick('LiveTV')}
            >
              <Image
                source={require('../assets/images/livve.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>LIVE TV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardClick('Movies')}
            >
              <Image
                source={require('../assets/images/adventures.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>MOVIES</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardClick('Series')}
            >
              <Image
                source={require('../assets/images/series.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>SERIES</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={[styles.actions, isPhone && {flexDirection:'column', alignItems:'center'}]}>
            <TouchableOpacity
              style={[styles.actionBtn, isPhone && {width:'100%'}]}
              onPress={() => handleCardClick('Playlist')}
            >
              <Text style={styles.actionText}>Update Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, isPhone && {width:'100%'}]}>
              <Text style={styles.actionText}>Reload Cache</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, isPhone && {width:'100%'}]} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.actionText}>Multiscreen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, isPhone && {width:'100%'}]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.actionText}>Add Playlist</Text>
            </TouchableOpacity>
          </View>

          {/* Expiration Date */}
          <Text style={styles.expiration}>EXPIRATION: December 25TH, 2025</Text>
        </View>
        
        <MultiScreenModal
         visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        />


        {/* Add Playlist Modal */}
        <AddPlaylistModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        
        {/* Notification Modal */}
        <NotificationModal
          visible={isNotificationVisible}
          onClose={() => setIsNotificationVisible(false)}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // fallback color
  },
  bg: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10 * scale,
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15 * scale,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12 * scale,
  },
  time: { 
    color: '#fff', 
    fontSize: (isLargeTV ? 22 : isTV ? 20 : 18) * scale, 
    fontWeight: 'bold' 
  },
  date: { 
    color: '#fff', 
    fontSize: (isLargeTV ? 16 : isTV ? 14 : 12) * scale, 
    marginBottom: 8 * scale 
  },
  notificationBtn: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: (isLargeTV ? 50 : isTV ? 45 : 40) * scale,
    height: (isLargeTV ? 50 : isTV ? 45 : 40) * scale,
    borderRadius: (isLargeTV ? 25 : isTV ? 22 : 20) * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  notificationIcon: {
    fontSize: (isLargeTV ? 24 : isTV ? 22 : 20) * scale,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5 * scale,
    right: -5 * scale,
    backgroundColor: '#ff4444',
    borderRadius: 10 * scale,
    minWidth: 20 * scale,
    height: 20 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 12 : isTV ? 11 : 10) * scale,
    fontWeight: 'bold',
  },
  settingsBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: (isLargeTV ? 50 : isTV ? 45 : 40) * scale,
    height: (isLargeTV ? 50 : isTV ? 45 : 40) * scale,
    borderRadius: (isLargeTV ? 25 : isTV ? 22 : 20) * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  settingsIcon: {
    fontSize: (isLargeTV ? 24 : isTV ? 22 : 20) * scale,
  },
  searchContainer: {
    marginBottom: 15 * scale,
  },
  search: {
    backgroundColor: '#222',
    color: '#fff',
    padding: (isLargeTV ? 12 : isTV ? 10 : 8) * scale,
    borderRadius: 6 * scale,
    width: '100%',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
  },
  categoryRow: { 
    marginVertical: 15 * scale, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingHorizontal: 20 * scale, 
    marginTop: 30 * scale 
  },
  card: { 
    marginBottom: 15 * scale, 
    alignItems: 'center', 
    width: (isLargeTV ? 350 : isTV ? 320 : 300) * scale 
  },
  cardImage: { 
    width: '100%', 
    borderRadius: 8 * scale,
    height: (isLargeTV ? 200 : isTV ? 180 : 160) * scale,
    resizeMode: 'cover',
  },
  cardText: { 
    color: '#fff', 
    marginTop: 6 * scale, 
    fontWeight: 'bold', 
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale 
  },
  actions: {
    flexDirection: 'row',
    marginVertical: 15 * scale,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  actionBtn: {
    backgroundColor: '#0E0D13',
    color: '#fff',
    paddingVertical: (isLargeTV ? 14 : isTV ? 12 : 10) * scale,
    paddingHorizontal: (isLargeTV ? 48 : isTV ? 44 : 40) * scale,
    borderRadius: 5 * scale,
    marginVertical: 6 * scale,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#444',
    minWidth: isPhone ? '45%' : 'auto',
  },
  actionText: { 
    color: '#fff', 
    fontSize: (isLargeTV ? 16 : isTV ? 15 : 14) * scale,
    fontWeight: '500',
  },
  expiration: { 
    color: '#aaa', 
    textAlign: 'center', 
    fontSize: (isLargeTV ? 14 : isTV ? 13 : 12) * scale,
    marginTop: 20 * scale,
  },
});