import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  Switch,
  Image,
} from 'react-native';
import React, { useState } from 'react';

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
              <Switch
                trackColor={{ false: '#767577', true: '#6512CF' }}
                thumbColor={autoStart ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setAutoStart}
                value={autoStart}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Play on Select:</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#6512CF' }}
                thumbColor={autoPlay ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setAutoPlay}
                value={autoPlay}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Skip Intro Automatically:</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#6512CF' }}
                thumbColor={skipIntro ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setSkipIntro}
                value={skipIntro}
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
    width: '75%',
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
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  form: {
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  settingLabel: {
    color: '#aaa',
    fontSize: 16,
    flex: 1,
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
