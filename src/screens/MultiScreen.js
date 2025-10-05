import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle'; // ✅ added import

const { width } = Dimensions.get('window');
const isPhone = width < 600;

const MultiScreenModal = ({ visible, onClose }) => {
  const [enableSubtitles, setEnableSubtitles] = useState(true);
  const [showMaxScreensModal, setshowMaxScreensModal] = useState(false);
  const [selectedScreenNum, setSelectedScreenNum] = useState(2);

  const MaxScreens = [2, 3, 4];

  const renderOption = item => (
    <Pressable
      style={styles.option}
      onPress={() => {
        setSelectedScreenNum(item);
        setshowMaxScreensModal(false);
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
            <Text style={styles.heading}>MULTISCREEN MODE</Text>
            <Pressable style={styles.btnClose} onPress={onClose}>
              <Image
                source={require('../assets/images/crossBtn.png')}
                style={{ width: 12, height: 12, tintColor: '#fff' }}
              />
            </Pressable>
          </View>

          <View style={styles.form}>
            {/* Enable Multi-Screen Toggle */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Multi-Screen:</Text>
              <SwitchToggle
                switchOn={enableSubtitles}
                onPress={() => setEnableSubtitles(!enableSubtitles)}
                circleColorOff="black"
                circleColorOn="black"
                backgroundColorOn="#6512CF"
                backgroundColorOff="#4E4C5E"
                containerStyle={styles.toggleContainer}
                circleStyle={styles.toggleCircle}
                duration={200}
              />
            </View>

            {/* Max Screens Dropdown */}
            <View
              style={[styles.inputGroup, !enableSubtitles && { opacity: 0.5 }]}
              pointerEvents={enableSubtitles ? 'auto' : 'none'}
            >
              <Text style={styles.label}>Max Screens:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setshowMaxScreensModal(true)}
              >
                <Text style={styles.dropdownText}>{selectedScreenNum}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            {/* Save Button */}
            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Submit</Text>
            </Pressable>
          </View>

          {/* Inner Modal for Options */}
          <Modal
            transparent
            visible={showMaxScreensModal}
            animationType="fade"
            onRequestClose={() => setshowMaxScreensModal(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setshowMaxScreensModal(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={MaxScreens}
                  keyExtractor={item => item.toString()}
                  renderItem={({ item }) => renderOption(item)}
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setshowMaxScreensModal(false)}
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

export default MultiScreenModal;

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
  form: {
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#2E293E',
    padding: 20,
    borderRadius: 25,
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
