import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  Switch,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');
const isPhone = width < 600;

const SubtitleModal = ({ visible, onClose }) => {
  const [enableSubtitles, setEnableSubtitles] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Chinese',
  ];

  const renderOption = item => (
    <Pressable
      style={styles.option}
      onPress={() => {
        setSelectedLanguage(item);
        setShowLanguageModal(false);
      }}
    >
      <Text style={styles.optionText}>{item}</Text>
    </Pressable>
  );

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
            <Text style={styles.heading}>SUBTITLE SETTINGS</Text>
            <Pressable style={styles.btnClose} onPress={onClose}>
              <Image
                source={require('../assets/images/crossBtn.png')}
                style={{ width: 12, height: 12, tintColor: '#fff' }}
              />
            </Pressable>
          </View>

          <View style={styles.form}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Subtitles:</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#6512CF' }}
                thumbColor={enableSubtitles ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setEnableSubtitles}
                value={enableSubtitles}
              />
            </View>

            <View
              style={[styles.inputGroup, !enableSubtitles && { opacity: 0.5 }]}
              pointerEvents={enableSubtitles ? 'auto' : 'none'}
            >
              <Text style={styles.label}>Default Language:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setShowLanguageModal(true)}
              >
                <Text style={styles.dropdownText}>{selectedLanguage}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Save Settings</Text>
            </Pressable>
          </View>

          <Modal
            transparent
            visible={showLanguageModal}
            animationType="fade"
            onRequestClose={() => setShowLanguageModal(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowLanguageModal(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={languageOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) => renderOption(item)}
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setShowLanguageModal(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};

export default SubtitleModal;

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
  label: {
    color: '#aaa',
    fontSize: 14,
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  staticText: {
    color: '#fff',
    fontSize: 14,
  },
  arrow: {
    color: '#6512CF',
    fontSize: 30,
  },
  saveBtn: {
    backgroundColor: '#515DEF',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
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
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
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
