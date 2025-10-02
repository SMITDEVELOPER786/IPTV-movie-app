import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from 'lucide-react-native';

const NotificationScreen = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();

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
            <View style={styles.headers}>
                   <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                     <Image 
                     source={require('../assets/images/backBtn.png')}
                     style={{tintColor:'#fff'}}/>
                   </Pressable>
         
                   <Text style={styles.headerTitle}>Notifications</Text>
         
                     {/* Time & Date */}
                 <View style={styles.headerLeft}>
                   <Text style={styles.time}>{currentTime}</Text>
                   <Text style={styles.date}>{currentDate}</Text>
                 </View>
                 </View>

          <View style={styles.notify}>
            <View style={styles.notifyHeader}>
              <Text style={styles.heading}>
                Intermittent Video Freezing
              </Text>
              <Text style={[styles.days, styles.notiText]}>28 Days Ago</Text>
            </View>

            <Text style={[styles.p, styles.notiText]}>
              Connect to the Vpn , Connecting will reduce Freezing and buffering
              if the Vpn app is not installed or not Configured, contact support
              for Assistance
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default NotificationScreen;

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
  notiText: {
    color: '#fff',
    fontSize: 12,
  },
  notifyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notify: {
    gap: 10,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 20,
    marginTop: 80,
  },
  heading:{
    fontWeight: "700",
    fontSize: 14,
    color: '#fff'
  }
});