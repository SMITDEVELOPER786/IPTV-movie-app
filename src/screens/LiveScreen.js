import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

export default function LiveTVScreen() {
  const [activeTab, setActiveTab] = useState('Live Tv');
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation()

  const tabs = ['Home', 'Live Tv', 'Movies', 'Series'];
  const timeSlots = ['Tue, Jul 30, 10:00PM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'];
  const channels = [
    { id: 1, name: 'Channel 1' },
    { id: 2, name: 'Channel 2' },
    { id: 3, name: 'Channel 3' },
    { id: 4, name: 'Channel 4' },
    { id: 5, name: 'Channel 5' },
  ];
  const programs = [
    ['Program 1', 'Program 1', 'Program 2', 'Program 3', 'Program 4'],
    ['Program 1', 'Program 2', 'Program 3', 'Program 4', 'Program 5'],
    ['Program 1', 'Program 2', 'Program 3', 'Program 4', ''],
    ['Program 1', 'Program 2', 'Program 3', '', ''],
    ['Program 1', 'Program 2', 'Program 3', 'Program 4', ''],
  ];

  return (
    <ImageBackground
      source={require("../assets/images/Thumb.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Header />
               {/* <View style={styles.headers}>
                  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backArrow}>←</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.headerTitle}>Live Screen</Text>
                  
                  <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}></Text>
                  </TouchableOpacity>
                </View> */}
        {/* Header Navigation */}
        {/* <View style={styles.header}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView> */}

          {/* Search Bar */}
          {/* <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Master Search"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View> */}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Featured Content */}
          <View style={styles.featuredSection}>
            <View style={styles.featuredCard}>
              <Image 
                source={require("../assets/images/livetv.png")}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <View style={styles.featuredOverlay}>
                <View style={styles.liveTag}>
                  <Text style={styles.liveTagText}>LIVE</Text>
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.championText}>CHAMPIONS LEAGUE</Text>
                  <Text style={styles.timeText}>12:00PM - 12:30 PM   30Min</Text>
                  <Text style={styles.matchText}>Man United vs Chelsea</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Program Schedule Grid */}
          <View style={styles.scheduleSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.scheduleContainer}>
                {/* Time Header Row */}
                <View style={styles.timeHeaderRow}>
                  <View style={[styles.channelColumn, {backgroundColor:'#2a2a3e'}]}>
                    <Text style={styles.headerText}>{timeSlots[0]}</Text>
                  </View>
                  {timeSlots.slice(1).map((time, index) => (
                    <View key={index} style={styles.timeColumn}>
                      <Text style={styles.timeHeaderText}>{time}</Text>
                    </View>
                  ))}
                </View>

                {/* Schedule Grid */}
                {channels.map((channel, channelIndex) => (
                  <View key={channel.id} style={styles.scheduleRow}>
                    <View style={styles.channelCell}>
                      <Text style={styles.channelNumber}>{channel.id}</Text>
                      <Text style={styles.channelName}>{channel.name}</Text>
                    </View>
                    {programs[channelIndex]?.map((program, programIndex) => (
                      <TouchableOpacity key={programIndex} style={styles.programCell}>
                        <Text style={styles.programText}>{program}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 2, 2, 0.8)',
    padding: '6%', // semi-transparent overlay for readability
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  headers: {
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
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'transparent', // make header transparent to show image
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
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
  tabContainer: { marginBottom: 12 },
  tab: { paddingHorizontal: 18, paddingVertical: 8, marginRight: 12, borderRadius: 20, backgroundColor: '#2a2a3e' },
  activeTab: { backgroundColor: '#0066cc' },
  tabText: { color: '#ccc', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#fff' },
  searchContainer: { marginTop: 8 },
  searchInput: { backgroundColor: '#333', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, color: '#fff', fontSize: 14 },
  content: { flex: 1, marginTop: 40 },
  featuredSection: { paddingHorizontal: 16, marginBottom: 16 },
  featuredCard: { borderRadius: 12, overflow: 'hidden', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  featuredImage: { width: '100%', height: 200 },
  featuredOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'space-between', padding: 16 },
  liveTag: { backgroundColor: '#ff6b35', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  liveTagText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  featuredInfo: { alignSelf: 'flex-start' },
  championText: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  timeText: { color: '#ccc', fontSize: 12, marginBottom: 2 },
  matchText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  scheduleSection: { flex: 1 },
  scheduleContainer: { minWidth: width * 1.3 },
  timeHeaderRow: { flexDirection: 'row', backgroundColor: '#2a2a3e', borderBottomWidth: 1, borderBottomColor: '#444', alignItems: 'center' },
  channelColumn: { minWidth: 120, padding: 10, justifyContent: 'center', alignItems: 'center' },
  timeColumn: { minWidth: 100, padding: 10, justifyContent: 'center', alignItems: 'center' },
  timeHeaderText: { color: '#fff', fontSize: 11, textAlign: 'center' },
  headerText: { color: '#fff', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  scheduleRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#333' },
  channelCell: { minWidth: 120, padding: 10, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  channelNumber: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  channelName: { color: '#ccc', fontSize: 10 },
  programCell: { minWidth: 100, padding: 10, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#444', borderRadius: 6, marginHorizontal: 0 },
  programText: { color: '#fff', fontSize: 11, textAlign: 'center' },
});
