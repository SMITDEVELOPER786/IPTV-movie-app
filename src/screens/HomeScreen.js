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

import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const mainnavigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardClick = screenName => {
    mainnavigation.navigate(screenName);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: 40 }} // 🔹 let content expand
    >
      <ImageBackground
        source={require('../assets/images/Thumb.png')}
        style={styles.bg}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.time}>10:00 PM</Text>
            <Text style={styles.date}>AUG 29TH, 2025</Text>
            <TextInput
              style={styles.search}
              placeholder="Master Search"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Categories */}
          <View style={styles.categoryRow}>
            <TouchableOpacity
              style={styles.card}
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
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleCardClick('Playlist')}
            >
              <Text style={styles.actionText}>Update Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionText}>Reload Cache</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionText}>Multiscreen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.actionText}>Add Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleCardClick('Settings')}
            >
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Expiration Date */}
          <Text style={styles.expiration}>EXPIRATION: December 25TH, 2025</Text>
        </View>
         {/* Modal */}
      <AddPlaylistModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
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
    padding: 10,
  },
  header: { marginBottom: 15 },
  time: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  date: { color: '#fff', fontSize: 12, marginBottom: 8 },
  search: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 8,
    borderRadius: 6,
    width: '100%',
  },
  categoryRow: { marginVertical: 15 },
  card: { marginBottom: 15, alignItems: 'center', width: '100%' },
  cardImage: { width: width * 0.8, height: width * 0.48, borderRadius: 8 },
  cardText: { color: '#fff', marginTop: 6, fontWeight: 'bold', fontSize: 14 },
  actions: {
    flexDirection: 'column',
    marginVertical: 15,
    alignItems: 'stretch',
  },
  actionBtn: {
    backgroundColor: '#0E0D13',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 6,
    alignItems: 'center',
    width: '100%',
  },
  actionText: { color: '#fff', fontSize: 14 },
  expiration: { color: '#aaa', textAlign: 'center', fontSize: 12 },
});
