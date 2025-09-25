import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(route.name);

  const handlePress = screen => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  const tabs = [
    { name: 'Home', label: 'Home' },
    { name: 'LiveTV', label: 'Live Tv' },
    { name: 'Movies', label: 'Movies' },
    { name: 'Series', label: 'Series' },
  ];

  return (
    <View style={styles.header}>
      <View style={styles.navBtnsCon}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.name;
          return (
            <Pressable
              key={tab.name}
              style={styles.navBtn}
              onPress={() => handlePress(tab.name)}
            >
              <Text style={[styles.navBtnText, isActive && styles.activeText]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeLine} />}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.navRight}>
        <View style={styles.bellIcon}>
          <Image
            source={require('../assets/images/bell.png')}
            style={styles.bellIconImg}
          />
          <View style={styles.noti}>
            <Text style={styles.notiText}>2</Text>
          </View>
        </View>

        <View style={styles.searchCon}>
          <Image
            source={require('../assets/images/Search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Master Search"
            placeholderTextColor={'#F9F9F9AB'}
            style={styles.searchInput}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBtnsCon: {
    flexDirection: 'row',
    gap: 40,
  },
  navBtn: {
    alignItems: 'center',
  },
  navBtnText: {
    color: '#F9F9F9',
    fontSize: 19,
    fontWeight: '600',
  },
  activeText: {
    color: '#00B9AE',
  },
  activeLine: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#00B9AE',
    borderRadius: 1,
  },
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
  navRight: { flexDirection: 'row', gap: 20, alignItems:'center' },
  searchCon: { position: 'relative' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#F9F9F91A',
    borderStyle: 'solid',
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft:40,
    paddingRight:70,
    backgroundColor:"#21242D",
  },
  searchIcon:{
    width: 20,
    height: 20,
    position:'absolute',
    zIndex:1,
    left: 10,
    top: 10,
  }
});
