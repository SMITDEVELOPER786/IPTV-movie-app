import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';

const { width } = Dimensions.get('window');
const isPhone = width < 600;

const AutomationSettingsModal = ({ visible, onClose }) => {
  const [autoStart, setAutoStart] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isPhone && { width: '90%' }]}>
          <View style={styles.headingAndBtn}>
            <Text style={styles.heading}>AUTOMATION SETTINGS</Text>
            <Pressable style={styles.btnClose} onPress={onClose}>
              <Image
                source={require('../assets/images/crossBtn.png')}
                style={{ width: 12, height: 12, tintColor: '#fff' }}
              />
            </Pressable>
          </View>

          <View style={styles.form}>
             <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Start on Launch:</Text>
              <SwitchToggle
                switchOn={autoStart}
                onPress={() => setAutoStart(!autoStart)}
                circleColorOff="black"
                circleColorOn="black"
                backgroundColorOn="#6512CF"
                backgroundColorOff="#4E4C5E"
                containerStyle={styles.toggleContainer}
                circleStyle={styles.toggleCircle}
              />
            </View>

            {/* Auto Play */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Play on Select:</Text>
              <SwitchToggle
                switchOn={autoPlay}
                onPress={() => setAutoPlay(!autoPlay)}
                circleColorOff="black"
                circleColorOn="black"
                backgroundColorOn="#6512CF"
                backgroundColorOff="#4E4C5E"
                containerStyle={styles.toggleContainer}
                circleStyle={styles.toggleCircle}
              />
            </View>

            {/* Skip Intro */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Skip Intro Automatically:</Text>
              <SwitchToggle
                switchOn={skipIntro}
                onPress={() => setSkipIntro(!skipIntro)}
              circleColorOff="black"
                circleColorOn="black"
                backgroundColorOn="#6512CF"
                backgroundColorOff="#4E4C5E"
                containerStyle={styles.toggleContainer}
                circleStyle={styles.toggleCircle}
              />
            </View>

            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Save Settings</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AutomationSettingsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#040404cd',
    paddingVertical: '4%',
    paddingHorizontal: '10%',
    borderRadius: 12,
    borderStyle: 'solid',
    borderColor: '#2E293E',
    borderWidth: 1,
  },
  headingAndBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnClose: {
    padding: 5,
  },
  form: {
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    borderWidth: 1,
    borderColor:'#2E293E',
    padding: 20,
    borderRadius:25
    
  },
  settingLabel: {
    color: '#aaa',
    fontSize: 16,
    flex: 1,
  },
  toggleContainer: {
    width: 35,
    height: 20,
    borderRadius: 25,
    padding: 2,
  },
  toggleCircle: {
    width: 15,
    height: 15,
    borderRadius: 11,
  },
  saveBtn: {
    backgroundColor: '#515DEF',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
