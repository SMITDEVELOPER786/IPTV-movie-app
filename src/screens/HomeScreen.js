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

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const mainnavigation = useNavigation();
  const [isMultiScreenVisible, setIsMultiScreenVisible] = useState(false);
  const [isAddPlaylistVisible, setIsAddPlaylistVisible] = useState(false);
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
          {/* Header */}
          <View style={styles.header}>
            {/* Time & Date - Left */}
            <View style={styles.timeDateContainer}>
              <Text style={styles.time}>10:00PM</Text>
              <Text style={styles.date}>AUG 29TH, 2025</Text>
            </View>

            {/* Search - Center */}
            <View style={styles.searchContainer}>
              <Text style={styles.emojiIcon}>🔍</Text>
              <TextInput
                style={styles.search}
                placeholder="Master Search"
                placeholderTextColor="#999"
              />
            </View>

            {/* Notification - Right */}
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => handleCardClick('Notifications')}
            >
              <Text style={styles.emojiIcon}>🔔</Text>
              {unreadNotifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Main Categories */}
          <View style={styles.categorySection}>
            <TouchableOpacity
              style={styles.bigCard}
              onPress={() => handleCardClick('LiveTV')}
            >
              <Image
                source={require('../assets/images/livve.png')}
                style={styles.bigCardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.emojiIcon}>📺</Text>
                <Text style={styles.bigCardText}>LIVE TV</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bigCard}
              onPress={() => handleCardClick('Movies')}
            >
              <Image
                source={require('../assets/images/adventures.png')}
                style={styles.bigCardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.emojiIcon}>🎬</Text>
                <Text style={styles.bigCardText}>MOVIES</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bigCard}
              onPress={() => handleCardClick('Series')}
            >
              <Image
                source={require('../assets/images/series.png')}
                style={styles.bigCardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.emojiIcon}>▶️</Text>
                <Text style={styles.bigCardText}>SERIES</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleCardClick('Playlist')}
            >
              <Text style={styles.emojiIcon}>🔄</Text>
              <Text style={styles.actionText}>Update Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.emojiIcon}>♻️</Text>
              <Text style={styles.actionText}>Reload Cache</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setIsMultiScreenVisible(true)}
            >
              <Text style={styles.emojiIcon}>🖥️</Text>
              <Text style={styles.actionText}>Multiscreen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setIsAddPlaylistVisible(true)}
            >
              <Text style={styles.emojiIcon}>➕</Text>
              <Text style={styles.actionText}>Add Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleCardClick('Settings')}
            >
              <Text style={styles.emojiIcon}>⚙️</Text>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Expiration */}
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

      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bg: {
    flex: 1,
    width: '100%',
    minHeight: height,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 48,
    minHeight: height,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 24,
    paddingHorizontal: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  timeDateContainer: {
    flex: 1,
  },
  time: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 30,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  search: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    paddingVertical: 14,
    marginLeft: 8,
  },
  notificationBtn: {
    flex: 1,
    alignItems: 'flex-end',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff3333',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#000',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Main Categories
  categorySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 60,
  },
  bigCard: {
    width: 380,
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bigCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bigCardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Action Buttons
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 40,
  },
  actionBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Emoji Styling
  emojiIcon: {
    fontSize: 28,
    color: '#fff',
  },

  // Expiration
  expiration: {
    color: '#888',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});
