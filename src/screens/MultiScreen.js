import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');
const isTV = width >= 1000;

const MultiScreenModal = ({ visible, onClose }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [numScreens, setNumScreens] = useState('2');
  const [maxScreens, setMaxScreens] = useState('4');

  const screenOptions = ['1', '2', '3', '4'];
  const maxScreenOptions = ['2', '4', '6', '8'];

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
        <View style={[styles.container, isTV && styles.tvContainer]}>
          <View style={styles.headingAndBtn}>
            <Text style={styles.heading}>MULTISCREEN MODE</Text>
            <Pressable style={styles.btnClose} onPress={onClose}>
              <Text style={styles.btnText}>✖</Text>
            </Pressable>
          </View>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enable Multiscreen:</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEnabled}
                value={isEnabled}
              />
            </View>
            <View style={[styles.inputGroup, !isEnabled && styles.disabled]}>
              <Text style={styles.label}>Num Screens:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => isEnabled && setNumScreens(true)}
                disabled={!isEnabled}
              >
                <Text style={styles.dropdownText}>{numScreens}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>
            <View style={[styles.inputGroup, !isEnabled && styles.disabled]}>
              <Text style={styles.label}>Max Screens:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => isEnabled && setMaxScreens(true)}
                disabled={!isEnabled}
              >
                <Text style={styles.dropdownText}>{maxScreens}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>
            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Submit</Text>
            </Pressable>
          </View>
          <Modal
            transparent
            visible={numScreens === true}
            animationType="fade"
            onRequestClose={() => setNumScreens(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setNumScreens(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={screenOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) =>
                    renderOption(item, setNumScreens, setNumScreens)
                  }
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setNumScreens(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
          <Modal
            transparent
            visible={maxScreens === true}
            animationType="fade"
            onRequestClose={() => setMaxScreens(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setMaxScreens(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={maxScreenOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) =>
                    renderOption(item, setMaxScreens, setMaxScreens)
                  }
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setMaxScreens(false)}
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
  tvContainer: {
    width: '50%',
    paddingVertical: '6%',
    paddingHorizontal: '15%',
  },
  headingAndBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: '#fff',
    fontSize: isTV ? 24 : 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: isTV ? 24 : 18,
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
  disabled: {
    opacity: 0.5,
  },
  label: { color: '#aaa', fontSize: isTV ? 18 : 14, flex: 1 },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  dropdownText: { color: '#fff', fontSize: isTV ? 18 : 14, marginRight: 8 },
  arrow: { color: '#6512CF', fontSize: isTV ? 36 : 30 },
  saveBtn: {
    backgroundColor: '#515DEF',
    paddingVertical: isTV ? 20 : 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: isTV ? 20 : 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1c1c1c',
    width: isTV ? '60%' : '80%',
    borderRadius: 8,
    paddingVertical: 10,
  },
  option: {
    padding: isTV ? 20 : 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  optionText: { color: '#fff', fontSize: isTV ? 20 : 16, textAlign: 'center' },
  cancelBtn: {
    padding: isTV ? 20 : 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#ff4d4d',
    fontSize: isTV ? 20 : 16,
    fontWeight: '600',
  },
});