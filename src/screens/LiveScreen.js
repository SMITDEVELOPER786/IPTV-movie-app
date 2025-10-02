// src/screens/LiveTVScreen.tsx
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

// Mock data - MATCHING FIGMA EXACTLY
const channels = [
  { id: '1', name: 'Channel 1' },
  { id: '2', name: 'Channel 2' },
  { id: '3', name: 'Channel 3' },
  { id: '4', name: 'Channel 4' },
  { id: '5', name: 'Channel 5' },
];

// Programs per channel, MATCHING FIGMA EXACTLY
const programs = [
  ['Program 1', 'Program 2', 'Program 3', 'Program 4'],           // Channel 1
  ['Program 1', 'Program 2', 'Program 3', 'Program 4', 'Program 5'], // Channel 2 ← Added Program 5
  ['Program 1', 'Program 2', 'Program 3', 'Program 4'],           // Channel 3
  ['Program 1', 'Program 2', 'Program 3', 'Program 4'],           // Channel 4
  ['Program 1', 'Program 2', 'Program 3', 'Program 4'],           // Channel 5
];

// Time slots from Figma
const timeSlots = ['Tue, Jul 29, 10:06PM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'];

const CategoryList = () => {
  const categories = [
    { id: '1', name: 'Home', screen: 'Home' },
    { id: '2', name: 'Live TV', screen: 'LiveTV' },
    { id: '3', name: 'Movies', screen: 'Movies' },
    { id: '4', name: 'Series', screen: 'Series' },
  ];

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 15 }}
      renderItem={({ item }) => (
        <View
          style={[
            styles.categoryCard,
            isPhone && { width: width * 0.84 },
          ]}
        >
          <ImageBackground
            source={require('../assets/images/Thumb.png')}
            style={styles.categoryImg}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.gradientOverlay}>
              <Text style={[styles.categoryText, item.name === 'Live TV' && styles.activeCategory]}>
                {item.name}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  );
};

const EPGGrid = () => {
  return (
    <View style={styles.epgContainer}>
      {/* Time Headers */}
      <View style={styles.timeHeaderRow}>
        {/* Empty cell for channel number header */}
        <View style={styles.channelHeaderCell}>
          <Text style={styles.timeHeaderText}>#</Text>
        </View>
        {/* Empty cell for channel name header */}
        {/* <View style={styles.channelNameHeaderCell}>
          <Text style={styles.timeHeaderText}>Channel</Text>
        </View> */}
        {/* Time slots */}
        {timeSlots.map((time, index) => (
          <View key={index} style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>{time}</Text>
          </View>
        ))}
      </View>

      {/* Program Rows */}
      {channels.map((channel, idx) => (
        <View key={channel.id} style={styles.epgRow}>
          {/* Channel Number Cell */}
          <View style={styles.channelNumberCell}>
            <Text style={styles.channelNumber}>{idx + 1}</Text>
          </View>
          
          {/* Channel Name Cell */}
          <View style={styles.channelNameCell}>
            <Text style={styles.channelName}>{channel.name}</Text>
          </View>
          
          {/* Program Cells */}
          {programs[idx]?.map((prog, pIdx) => (
            <TouchableOpacity key={pIdx} style={styles.programCell}>
              <Text style={styles.programText}>{prog}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const LiveTVScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/Thumb.png')}
      style={styles.imageBg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Header />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
   
          {/* Live Preview + Info */}
          <View style={styles.liveContentRow}>
            {/* Left: Live Stream Preview */}
            <View style={styles.livePreview}>
              <ImageBackground
                source={require('../assets/images/livetv.png')}
                style={styles.previewImage}
              >
                <View style={styles.liveTag}>
                  <Text style={styles.liveTagText}>LIVE</Text>
                </View>
              </ImageBackground>
            </View>

            {/* Right: Live Info Text */}
            <View style={styles.liveInfo}>
              <Text style={styles.championText}>CHAMPIONS LEAGUE</Text>
              <Text style={styles.timeText}>12:00PM - 12:30 PM • 30Min</Text>
              <Text style={styles.matchText}>Man United vs Chelsea</Text>
            </View>
          </View>

          {/* EPG Grid Below */}
          <View style={styles.epgSection}>
            <EPGGrid />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default LiveTVScreen;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 40,
    paddingRight: '8%',
    paddingLeft: '8%',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  navTabs: {
    marginBottom: 20,
  },
  categoryCard: {
    width: isPhone ? width * 0.84 : 220,
    height: isPhone ? 100 : 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImg: {
    flex: 1,
    justifyContent: 'center',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  categoryText: {
    color: '#fff',
    fontSize: isPhone ? 14 : 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeCategory: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },
  notificationBtn: {
    position: 'relative',
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    color: '#fff',
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  liveContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  livePreview: {
    width: isPhone ? width * 0.6 : 317,
    height: isPhone ? (width * 0.6 * 178 / 317) : 178,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  liveTag: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ff4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  liveInfo: {
    flex: 1,
    marginLeft: 80,
    justifyContent: 'center',
  },
  championText: {
    color: '#E4E4E4',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 4,
  },
  timeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 4,
  },
  matchText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '500',
  },
  epgSection: {
    marginTop: 20,
  },
  epgContainer: {
    // backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 10,
  },
  timeHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
  },
  channelHeaderCell: {
    width: 50,
    paddingVertical: 8,
    alignItems: 'center',
  },
  channelNameHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  timeHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  timeHeaderText: {
    color: '#fff',
    fontSize: isPhone ? 12 : 14,
    fontWeight: '600',
  },
  epgRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  channelNumberCell: {
    width: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'r',
    borderRadius: 4,
  },
  channelNameCell: {
    // flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    width: 200
  },
  channelNumber: {
    color: '#fff',
    fontSize: isPhone ? 14 : 16,
    fontWeight: 'bold',
  },
  channelName: {
    color: '#ccc',
    fontSize: isPhone ? 10 : 12,
  },
  programCell: {
    flex: 1,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  programText: {
    color: '#fff',
    fontSize: isPhone ? 12 : 14,
    textAlign: 'center',
  },
});