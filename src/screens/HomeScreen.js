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

const { width } = Dimensions.get('window');
const isPhone = width < 768;


export default function HomeScreen() {
  const mainnavigation = useNavigation();
  const [isMultiScreenVisible, setIsMultiScreenVisible] = useState(false);
  const [isAddPlaylistVisible, setIsAddPlaylistVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const [unreadNotifications] = useState(3);

  const handleCardClick = (screenName) => {
    mainnavigation.navigate(screenName);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ImageBackground
        source={require('../assets/images/Thumb.png')}
        style={styles.bg}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.overlay}>
          {/* 🔹 Header */}
          <View style={styles.header}>
            {/* Left side (time, date, notification) */}
            <View style={styles.headerLeft}>
              <View style={styles.timeDateContainer}>
                <Text style={styles.time}>05:52 AM</Text>
                <Text style={styles.date}>SEP 30TH, 2025</Text>
              </View>
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
            </View>

            {/* Right side (search) */}
            <View style={styles.headerRight}>
              <TextInput
                style={styles.search}
                placeholder="Master Search"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* 🔹 Categories */}
          <View
            style={[
              styles.categoryRow,
              isPhone && { flexDirection: 'column', alignItems: 'center' },
            ]}
          >
            <TouchableOpacity
              style={[styles.card, isPhone && { width: '90%' }]}
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

          {/* 🔹 Action Buttons */}
          <View
            style={[
              styles.actions,
              isPhone && { flexDirection: 'column', alignItems: 'center' },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionBtn, isPhone && { width: '100%' }]}
              onPress={() => handleCardClick('Playlist')}
            >
              <Text style={styles.actionText}>🔄 Update Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, isPhone && { width: '100%' }]}
            >
              <Text style={styles.actionText}>🔄 Reload Cache</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, isPhone && { width: '100%' }]}
              onPress={() => setIsMultiScreenVisible(true)}
            >
              <Text style={styles.actionText}>📺 Multiscreen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, isPhone && { width: '100%' }]}
              onPress={() => setIsAddPlaylistVisible(true)}
            >
              <Text style={styles.actionText}>➕ Add Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, isPhone && { width: '100%' }]}
              onPress={() => handleCardClick('Settings')}

            >
              <Text style={styles.actionText}>⚙️ Settings</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 Expiration */}
          <Text style={styles.expiration}>
            EXPIRATION: December 25TH, 2025
          </Text>
        </View>

        {/* Modals */}
        <MultiScreenModal
          visible={isMultiScreenVisible}
          onClose={() => setIsMultiScreenVisible(false)}
        />
        <AddPlaylistModal
          visible={isAddPlaylistVisible}
          onClose={() => setIsAddPlaylistVisible(false)}
        />
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
    backgroundColor: 'black',
  },
  bg: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10 * scale,
  },
  // 🔹 Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 14 * scale,
    paddingVertical: 12 * scale,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18 * scale,
    flex: 1,
  },
  timeDateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 260
  },
  time: {
    color: '#fff',
    fontSize: (isLargeTV ? 28 : isTV ? 24 : 18) * scale,
    fontWeight: 'bold',
  },
  date: {
    color: '#aaa',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 12) * scale,
  },
  notificationBtn: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.08)',
    width: (isLargeTV ? 58 : isTV ? 52 : 42) * scale,
    height: (isLargeTV ? 58 : isTV ? 52 : 42) * scale,
    borderRadius: (isLargeTV ? 29 : isTV ? 26 : 21) * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  notificationIcon: {
    fontSize: (isLargeTV ? 28 : isTV ? 24 : 20) * scale,
    color: '#fff',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5 * scale,
    right: -5 * scale,
    backgroundColor: '#ff3333',
    borderRadius: 12 * scale,
    minWidth: 22 * scale,
    height: 22 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4 * scale,
    borderWidth: 1.5,
    borderColor: '#111',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: (isLargeTV ? 13 : isTV ? 12 : 10) * scale,
    fontWeight: 'bold',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  search: {
    marginRight: 150,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    paddingVertical: (isLargeTV ? 14 : isTV ? 12 : 10) * scale,
    paddingHorizontal: (isLargeTV ? 20 : isTV ? 18 : 14) * scale,
    borderRadius: 30 * scale,
    width: (isLargeTV ? 320 : isTV ? 260 : 200) * scale,
    fontSize: (isLargeTV ? 20 : isTV ? 18 : 14) * scale,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  // 🔹 Categories
  categoryRow: {
    marginVertical: 12 * scale,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30 * scale,
  },
  card: {
    marginBottom: 15 * scale,
    alignItems: 'center',
    width: (isLargeTV ? 350 : isTV ? 320 : 300) * scale,
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
    fontSize: (isLargeTV ? 20 : isTV ? 18 : 14) * scale,
  },
  // 🔹 Action Buttons
  actions: {
    flexDirection: 'row',
    marginVertical: 15 * scale,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 10
  },
  actionBtn: {
    backgroundColor: '#0E0D13',
    color: '#fff',
    paddingVertical: (isLargeTV ? 16 : isTV ? 14 : 10) * scale,
    paddingHorizontal: (isLargeTV ? 48 : isTV ? 44 : 40) * scale,
    borderRadius: 6 * scale,
    marginVertical: 6 * scale,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#444',
    minWidth: isPhone ? '45%' : 'auto',
  },
  actionText: {
    color: '#fff',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
    fontWeight: '500',
  },
  expiration: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: (isLargeTV ? 16 : isTV ? 14 : 12) * scale,
    marginTop: 20 * scale,
  },
});