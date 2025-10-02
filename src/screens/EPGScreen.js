import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  TextInput,
  Modal,
  FlatList,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const EPGScreen = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [intervalModalVisible, setIntervalModalVisible] = useState(false);
  const [offsetModalVisible, setOffsetModalVisible] = useState(false);

  const [selectedInterval, setSelectedInterval] = useState('Every 6 hrs');
  const [selectedOffset, setSelectedOffset] = useState('+0:00');

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

  const intervalOptions = [
    'Every 1 hr',
    'Every 3 hrs',
    'Every 6 hrs',
    'Every 12 hrs',
    'Every 24 hrs',
  ];
  const offsetOptions = ['+0:00', '+1:00', '-1:00', '+2:00', '-2:00'];

  const renderOption = (item, setSelected, closeModal) => (
    <Pressable
      style={styles.option}
      onPress={() => {
        setSelected(item);
        closeModal(false);
      }}
    >
      <Text style={styles.optionText}>{item}</Text>
    </Pressable>
  );

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
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../assets/images/backBtn.png')}
                style={{ tintColor: '#fff' }}
              />
            </Pressable>

            <Text style={styles.headerTitle}>EPG</Text>

            <View style={styles.headerLeft}>
              <Text style={styles.time}>{currentTime}</Text>
              <Text style={styles.date}>{currentDate}</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Source URL:</Text>
              <TextInput
                style={styles.input}
                placeholder="http://epg.xml"
                placeholderTextColor="#aaa"
                value="http://epg.xml"
              />
            </View>

            {/* Update Interval Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Update Interval:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setIntervalModalVisible(true)}
              >
                <Text style={styles.dropdownText}>{selectedInterval}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            {/* Time Offset Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time Offset:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setOffsetModalVisible(true)}
              >
                <Text style={styles.dropdownText}>{selectedOffset}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            <Pressable style={styles.refreshBtn}>
              <Text style={styles.refreshText}>Refresh EPG</Text>
            </Pressable>

            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </ScrollView>
        {/* Interval Modal */}
        <Modal
          transparent
          visible={intervalModalVisible}
          animationType="fade"
          onRequestClose={() => setIntervalModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIntervalModalVisible(false)}
          >
            <View style={styles.modalBox}>
              <FlatList
                data={intervalOptions}
                keyExtractor={item => item}
                renderItem={({ item }) =>
                  renderOption(
                    item,
                    setSelectedInterval,
                    setIntervalModalVisible,
                  )
                }
              />
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setIntervalModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {/* Offset Modal */}
        <Modal
          transparent
          visible={offsetModalVisible}
          animationType="fade"
          onRequestClose={() => setOffsetModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setOffsetModalVisible(false)}
          >
            <View style={styles.modalBox}>
              <FlatList
                data={offsetOptions}
                keyExtractor={item => item}
                renderItem={({ item }) =>
                  renderOption(item, setSelectedOffset, setOffsetModalVisible)
                }
              />
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setOffsetModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default EPGScreen;

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
    flexWrap: 'wrap',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,

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
  form: { marginTop: 90 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2E293E',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  label: { color: '#aaa', fontSize: 14, flex: 1 },
  input: { color: '#fff', fontSize: 14, textAlign: 'right', flex: 1 },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  dropdownText: { color: '#fff', fontSize: 14, marginRight: 8 },
  arrow: { color: '#6512CF', fontSize: 30 },
  refreshBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  saveBtn: {
    backgroundColor: '#515DEF',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1c1c1c',
    width: '80%',
    borderRadius: 8,
    paddingVertical: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  optionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  cancelBtn: {
    padding: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: '600',
  },
});
