import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  FlatList,
  Switch,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');
const isTV = width >= 1000;
const baseWidth = isTV ? width * 0.4 : width * 0.5; // Reduced to 40% on TV, 50% on others

const MultiScreenModal = ({ visible, onClose }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [numScreens, setNumScreens] = useState('2');
  const [maxScreens, setMaxScreens] = useState('4');

  const screenOptions = ['1', '2', '3', '4'];
  const maxScreenOptions = ['2', '4', '6', '8'];

  const renderOption = (item, setSelected, closeModal) => (
    <Pressable
      style={({ pressed }) => [
        styles.option,
        pressed && styles.optionPressed,
        Platform.OS === 'tv' && styles.tvFocus,
      ]}
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
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { width: baseWidth }]}>
          <View style={styles.header}>
            <Text style={styles.heading}>MULTISCREEN MODE</Text>
            <Pressable
              style={({ pressed }) => [
                styles.btnClose,
                pressed && styles.btnPressed,
                Platform.OS === 'tv' && styles.tvFocus,
              ]}
              onPress={onClose}
            >
              <Text style={styles.btnText}>✖</Text>
            </Pressable>
          </View>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enable Multiscreen</Text>
              <Switch
                trackColor={{ false: '#666', true: '#4dabf7' }}
                thumbColor={isEnabled ? '#ffd700' : '#ccc'}
                ios_backgroundColor="#444"
                onValueChange={setIsEnabled}
                value={isEnabled}
                style={styles.switch}
              />
            </View>
            <View style={[styles.inputGroup, !isEnabled && styles.disabled]}>
              <Text style={styles.label}>Number of Screens</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.dropdown,
                  pressed && styles.dropdownPressed,
                  Platform.OS === 'tv' && styles.tvFocus,
                ]}
                onPress={() => isEnabled && setNumScreens(true)}
                disabled={!isEnabled}
              >
                <Text style={styles.dropdownText}>{numScreens}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>
            <View style={[styles.inputGroup, !isEnabled && styles.disabled]}>
              <Text style={styles.label}>Max Screens</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.dropdown,
                  pressed && styles.dropdownPressed,
                  Platform.OS === 'tv' && styles.tvFocus,
                ]}
                onPress={() => isEnabled && setMaxScreens(true)}
                disabled={!isEnabled}
              >
                <Text style={styles.dropdownText}>{maxScreens}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.saveBtn,
                pressed && styles.saveBtnPressed,
                Platform.OS === 'tv' && styles.tvFocus,
              ]}
            >
              <Text style={styles.saveText}>Submit</Text>
            </Pressable>
          </View>
          <Modal
            transparent
            visible={numScreens === true}
            animationType="slide"
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
                  style={({ pressed }) => [
                    styles.cancelBtn,
                    pressed && styles.cancelBtnPressed,
                    Platform.OS === 'tv' && styles.tvFocus,
                  ]}
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
            animationType="slide"
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
                  style={({ pressed }) => [
                    styles.cancelBtn,
                    pressed && styles.cancelBtnPressed,
                    Platform.OS === 'tv' && styles.tvFocus,
                  ]}
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
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1e1e1e',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 12,
    borderStyle: 'solid',
    borderColor: '#4a4060',
    borderWidth: 2,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    color: '#fff',
    fontSize: isTV ? 26 : 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  btnClose: {
    padding: isTV ? 12 : 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: isTV ? 20 : 16,
  },
  btnPressed: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  btnText: {
    color: '#fff',
    fontSize: isTV ? 22 : 16,
    fontWeight: '600',
  },
  form: {
    marginTop: 15,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4a4060',
    paddingVertical: isTV ? 15 : 10,
    paddingHorizontal: isTV ? 12 : 8,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  label: {
    color: '#bbb',
    fontSize: isTV ? 18 : 14,
    fontWeight: '500',
    flex: 1,
  },
  switch: {
    transform: isTV ? [{ scale: 1.3 }] : [{ scale: 1 }],
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    padding: isTV ? 8 : 5,
  },
  dropdownPressed: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dropdownText: {
    color: '#fff',
    fontSize: isTV ? 18 : 14,
    marginRight: isTV ? 10 : 6,
  },
  arrow: {
    color: '#7e4aff',
    fontSize: isTV ? 34 : 26,
  },
  saveBtn: {
    backgroundColor: '#6b4eff',
    paddingVertical: isTV ? 18 : 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
    elevation: 5,
  },
  saveBtnPressed: {
    backgroundColor: '#5a3de6',
  },
  saveText: {
    color: '#fff',
    fontSize: isTV ? 20 : 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#252525',
    width: isTV ? '40%' : '60%', // Adjusted to match smaller dialog
    borderRadius: isTV ? 12 : 8,
    paddingVertical: isTV ? 15 : 8,
    elevation: 15,
  },
  option: {
    padding: isTV ? 20 : 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  optionPressed: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tvFocus: {
    borderColor: '#7e4aff',
    borderWidth: 3,
    borderRadius: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: isTV ? 20 : 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  cancelBtn: {
    padding: isTV ? 15 : 10,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelBtnPressed: {
    backgroundColor: 'rgba(255,77,77,0.2)',
  },
  cancelText: {
    color: '#ff6666',
    fontSize: isTV ? 20 : 14,
    fontWeight: '700',
  },
});