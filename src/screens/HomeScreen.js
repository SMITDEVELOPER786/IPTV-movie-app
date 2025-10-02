import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddPlaylistModal from '../screens/AddPlaylistModal';
import MultiScreenModal from '../screens/MultiScreen';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isMultiScreenVisible, setIsMultiScreenVisible] = useState(false);
  const [isAddPlaylistVisible, setIsAddPlaylistVisible] = useState(false);
  const navigation = useNavigation();
  const handleCardClick = screenName => {
    navigation.navigate(screenName);
  };

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
          <View style={styles.header}>
            <Text style={styles.time}>{currentTime}</Text>
            <Text style={styles.date}>{currentDate}</Text>

            <View
              style={[
                styles.navRight,
                isPhone && { width: '100%', justifyContent: 'space-between' },
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
              >
                <View style={styles.bellIcon}>
                  <Image
                    source={require('../assets/images/bell.png')}
                    style={[
                      styles.bellIconImg,
                      isPhone && { width: 26, height: 26 },
                    ]}
                  />
                  <View style={styles.noti}>
                    <Text style={styles.notiText}>2</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={[styles.searchCon, isPhone && { flex: 1 }]}>
                <Image
                  source={require('../assets/images/Search.png')}
                  style={[styles.searchIcon, isPhone && { top: 9 }]}
                />
                <TextInput
                  placeholder="Master Search"
                  placeholderTextColor={'#F9F9F9AB'}
                  style={[
                    styles.searchInput,
                    isPhone && {
                      width: '100%',
                      paddingVertical: 8,
                      paddingRight: 40,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.cardsCon}>
              <TouchableOpacity
                style={styles.bigCard}
                onPress={() => handleCardClick('LiveTV')}
              >
                <Image
                  source={require('../assets/images/livve.png')}
                  style={styles.bigCardImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.bigCard, styles.middleCard]}
                onPress={() => handleCardClick('Movies')}
              >
                <Image
                  source={require('../assets/images/adventures.png')}
                  style={styles.bigCardImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bigCard}
                onPress={() => handleCardClick('Series')}
              >
                <Image
                  source={require('../assets/images/series.png')}
                  style={styles.bigCardImage}
                />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsSection}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleCardClick('Playlist')}
              >
                <Image
                  source={require('../assets/images/updateAll.png')}
                  style={{ width: 16, height: 11, marginRight: 8 }}
                />
                <Text style={styles.actionText}>Update Playlist</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn}>
                 <Image
                  source={require('../assets/images/reload.png')}
                  style={{ width: 16, height: 17, marginRight: 8 }}
                />
                <Text style={styles.actionText}>Reload Cache</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => setIsMultiScreenVisible(true)}
              >
                 <Image
                  source={require('../assets/images/multi.png')}
                  style={{ width: 16, height: 17, marginRight: 8 }}
                />
                <Text style={styles.actionText}>Multiscreen</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => setIsAddPlaylistVisible(true)}
              >
                 <Image
                  source={require('../assets/images/add.png')}
                  style={{ width: 16, height: 17, marginRight: 8 }}
                />
                <Text style={styles.actionText}>Add Playlist</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleCardClick('Settings')}
              >
                 <Image
                  source={require('../assets/images/settings.png')}
                  style={{ width: 16, height: 17, marginRight: 8 }}
                />
                <Text style={styles.actionText}>Settings</Text>
              </TouchableOpacity>
            </View>
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
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 20,
    paddingRight: '8%',
    paddingLeft: '8%',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingHorizontal: '8%',
    gap: 60,
  },
  time: { color: '#fff', fontSize: 20, fontWeight: '600' },

  date: { color: '#fff', fontSize: 21, fontWeight: '400' },
  navRight: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  bellIcon: { position: 'relative' },
  bellIconImg: { width: 32, height: 32 },
  noti: {
    position: 'absolute',
    right: -5,
    top: -8,
    backgroundColor: '#4F45B6',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  notiText: { color: '#fff', fontWeight: '700' },
  searchCon: { position: 'relative' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#F9F9F91A',
    borderStyle: 'solid',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 70,
    backgroundColor: '#21242D',
    width: 315,
  },
  searchIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: 10,
  },
  cardsCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  content: {
    marginTop: 80,
  },
  middleCard: {
    borderWidth: 1,
    borderColor: '#4F4F4F',
    borderRadius: 20,
    padding: 3,
  },

  bigCardImage: { borderRadius: 20 },
  actionsSection: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    backgroundColor:'#0E0D13',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#434343',
    flexDirection: 'row',
    alignItems: 'center',

  },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
