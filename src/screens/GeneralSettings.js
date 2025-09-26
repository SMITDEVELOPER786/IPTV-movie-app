import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const ActionButton = ({ icon, label, onPress }) => {
  return (
    <Pressable
      style={[
        styles.actionBtns,
        label === 'My Profile' && { backgroundColor: '#13141C' },
      ]}
      onPress={onPress}
    >
      <View style={styles.imgDetail}>
        <Image source={icon} style={styles.btnIcon} />
        <Text style={styles.actionText}>{label}</Text>
      </View>
      <Text style={styles.caret}>›</Text>
    </Pressable>
  );
};

const GeneralSettings = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [profileModal, setProfileModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [notifyModal, setNotifyModal] = useState(false);

  const [user, setUser] = useState({
    name: 'xyz name',
    email: 'xyz@gmail.com',
    pfp: require('../assets/images/pfp.png'),
  });

  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const options = { day: 'numeric', month: 'short', year: 'numeric' };
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

  const handleSave = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setProfileModal(false);
  };

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
          {/* Header */}
          <View style={styles.headers}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </Pressable>

            <Text style={styles.headerTitle}>General Settings</Text>
            <View style={{ width: 38 }} />
          </View>

          {/* Time & Date */}
          <View style={styles.headerLeft}>
            <Text style={styles.time}>{currentTime}</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>

          {/* Profile Card */}
          <View style={[styles.profileCard, isPhone && { width: '100%' }]}>
            <View style={styles.cardHeader}>
              <Image source={user.pfp} style={styles.profileimg} />
              <View style={styles.nameEmail}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <ActionButton
                icon={require('../assets/images/user.png')}
                label="My Profile"
                onPress={() => setProfileModal(true)}
              />
              <ActionButton
                icon={require('../assets/images/language.png')}
                label="Language"
                onPress={() => setLanguageModal(true)}
              />
              <Pressable
                style={styles.actionBtns}
                onPress={() => setNotifyModal(true)}
              >
                <View style={styles.imgDetail}>
                  <Image
                    source={require('../assets/images/notify.png')}
                    style={styles.btnIcon}
                  />
                  <Text style={styles.actionText}>Notifications</Text>
                </View>
                <Text style={{ color: '#22C55E', fontWeight: '600' }}>
                  Allow
                </Text>
              </Pressable>
              <ActionButton
                icon={require('../assets/images/log-out.png')}
                label="Log Out"
                onPress={() => console.log('Log Out')}
              />
            </View>
          </View>
        </ScrollView>

        {/* Profile Modal */}
        <Modal visible={profileModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, isPhone && { width: '80%' }]}>
              <Image source={user.pfp} style={styles.modalProfileImg} />
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter Name"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter Email"
                placeholderTextColor="#aaa"
              />

              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.modalBtn, { backgroundColor: '#444' }]}
                  onPress={() => setProfileModal(false)}
                >
                  <Text style={styles.modalBtnText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalBtn, { backgroundColor: '#13141C' }]}
                  onPress={handleSave}
                >
                  <Text style={styles.modalBtnText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Language Modal */}
        <Modal visible={languageModal} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.smallModal, isPhone && { width: '80%' }]}>
              <Text style={styles.modalTitle}>Select Language</Text>
              {['English', 'Urdu', 'Arabic'].map(lang => (
                <Pressable
                  key={lang}
                  style={styles.optionBtn}
                  onPress={() => setLanguageModal(false)}
                >
                  <Text style={styles.optionText}>{lang}</Text>
                </Pressable>
              ))}
              <Pressable
                style={[styles.optionBtn, { backgroundColor: '#444' }]}
                onPress={() => setLanguageModal(false)}
              >
                <Text style={styles.optionText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Notifications Modal */}
        <Modal visible={notifyModal} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.smallModal, isPhone && { width: '80%' }]}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <Pressable
                style={styles.optionBtn}
                onPress={() => setNotifyModal(false)}
              >
                <Text style={styles.optionText}>Don’t Allow</Text>
              </Pressable>
              <Pressable
                style={[styles.optionBtn, { backgroundColor: '#444' }]}
                onPress={() => setNotifyModal(false)}
              >
                <Text style={styles.optionText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default GeneralSettings;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 20,
    paddingRight: '8%',
    paddingLeft: '8%',
  },
  scrollContainer: { flex: 1 },
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
    alignItems: 'center',
  },
  backArrow: { color: '#fff', fontSize: 20, fontWeight: '600' },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerLeft: {
    flexDirection: 'column',
    marginBottom: 30,
    marginTop: 30,
  },
  time: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  date: { color: '#fff' },
  profileCard: { width: '36%', alignSelf: 'center', marginTop: 30 },
  profileimg: { width: 84, height: 84, borderRadius: 50 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 20,
  },
  name: { color: '#fff' },
  email: { color: '#6B7280' },
  actionBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  imgDetail: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardBody: { gap: 10, marginTop: 20 },
  btnIcon: { height: 25, width: 25 },
  actionText: { color: '#fff' },
  caret: { color: '#6B7280', fontSize: 30 },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '50%',
    backgroundColor: '#1F212B',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalProfileImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#2A2D3A',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnText: { color: '#fff', fontWeight: '600' },
  smallModal: {
    width: '50%',
    backgroundColor: '#1F212B',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  optionBtn: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2A2D3A',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});
