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

const { width } = Dimensions.get('window');
const isPhone = width < 600;

const PlayerSelectionModal = ({ visible, onClose }) => {
  const [defaultPlayer, setDefaultPlayer] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState('VLC Player');

  const formatOptions = [
    'VLC Player',
    'MX Player',
    'ExoPlayer',
    'System Player',
  ];

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
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isPhone && { width: '90%' }]}>
          <View style={styles.headingAndBtn}>
            <Text style={styles.heading}>Player Selection</Text>
            <Pressable style={styles.btnClose} onPress={onClose}>
              <Image
                source={require('../assets/images/crossBtn.png')}
                style={{ width: 12, height: 12, tintColor: '#fff' }}
              />
            </Pressable>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Default Player:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setDefaultPlayer(true)}
              >
                <Text style={styles.dropdownText}>{selectedFormat}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Submit</Text>
            </Pressable>
          </View>

          <Modal
            transparent
            visible={defaultPlayer}
            animationType="fade"
            onRequestClose={() => setDefaultPlayer(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setDefaultPlayer(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={formatOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) =>
                    renderOption(item, setSelectedFormat, setDefaultPlayer)
                  }
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setDefaultPlayer(false)}
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

export default PlayerSelectionModal;

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
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
  },
  form: { marginTop: 10 },
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
