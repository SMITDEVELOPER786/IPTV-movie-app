import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddPlaylistModal from '../screens/AddPlaylistModal';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

const PlaylistScreen = () => {
  const navigation = useNavigation();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mockData = [
    { id: 1, name: 'My Sports', desc: 'sports.m3u8', quantity: '158' },
    { id: 2, name: 'Movies Main', desc: 'sports.m3u8', quantity: '240' },
    { id: 3, name: 'Kids Corner', desc: 'sports.m3u8', quantity: '8' },
    { id: 4, name: 'News & Talk', desc: 'sports.m3u8', quantity: '98' },
    { id: 5, name: 'My Sports', desc: 'sports.m3u8', quantity: '65' },
    { id: 6, name: 'My Sports', desc: 'sports.m3u8', quantity: '65' },
  ];

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
        
        <View style={styles.headers}>
         <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Image 
                            source={require('../assets/images/backBtn.png')}
                            style={{tintColor:'#fff'}}/>
                          </Pressable>

          <Text style={styles.headerTitle}>PlAYLIST</Text>

            {/* Time & Date */}
        <View style={styles.headerLeft}>
          <Text style={styles.time}>{currentTime}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
        </View>

      

        {/* Playlist Management Section */}
        <View style={styles.listbg}>
          <View style={styles.head}>
            <Text style={styles.heading2}>Playlist Management</Text>
            <Pressable onPress={() => setShowAll(!showAll)}>
              <Text style={styles.viewAllBtn}>
                {showAll ? 'View Less' : 'View All'}
              </Text>
            </Pressable>
          </View>

          {/* Playlist List */}
          <View style={styles.listCon}>
            <FlatList
              data={showAll ? mockData : mockData.slice(0, 4)}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.list}>
                  <View style={styles.icon}>
                    <Image
                      source={require('../assets/images/solar_playlist-bold.png')}
                      style={styles.iconImg}
                    />
                  </View>

                  <Text style={styles.listText}>{item.name}</Text>

                  {!isSmallScreen && (
                    <>
                      <Text style={styles.listTextCenter}>{item.desc}</Text>
                      <Text style={styles.listText}>{item.quantity}</Text>
                    </>
                  )}

                  <View style={styles.rightSideIcons}>
                    <Pressable>
                      <Image
                        source={require('../assets/images/edit.png')}
                        style={styles.iconImg}
                      />
                    </Pressable>
                    <Pressable>
                      <Image
                        source={require('../assets/images/delete.png')}
                        style={styles.iconImg}
                      />
                    </Pressable>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Buttons */}
          <View style={styles.btnCon}>
            <Pressable
              onPress={() => setIsModalVisible(true)}
              style={styles.btns}
            >
              <Text style={styles.btnText}>+ Add Playlist</Text>
            </Pressable>
            <Pressable style={styles.btns}>
              <Text style={styles.btnText}>Update All</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Modal */}
      <AddPlaylistModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </ImageBackground>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: { flex: 1,  backgroundColor: 'rgba(0, 0, 0, 0.83)', padding: 20 },
  
  /* Header */
/* Header */
  headers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    // backgroundColor: 'rgba(255,255,255,0.1)',
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
  /* Playlist Section */
  heading2: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listbg: {
    paddingTop: '4%',
    paddingRight: '8%',
    paddingBottom: '8%',
    paddingLeft: '8%',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllBtn: { color: '#4F45B6' },
  listCon: { marginTop: 30 },
  list: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#2E293E',
    borderStyle: 'solid',
    borderRadius: 5,
  },
  listText: { color: '#FFFFFF', fontWeight: '700' },
  listTextCenter: { color: '#A098AE' },
  rightSideIcons: { flexDirection: 'row', gap: 10 },
  iconImg: { width: 18, height: 18 },

  /* Buttons */
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    flexWrap: 'wrap',
  },
  btns: {
    backgroundColor: '#515DEF',
    paddingVertical: 10,
    paddingHorizontal: '8%',
    borderRadius: 10,
  },
  btnText: { color: '#ffffff' },
});
