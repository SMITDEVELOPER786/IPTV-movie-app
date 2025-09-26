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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isPhone = width < 600;

const VideoFormatModal = ({ visible, onClose }) => {
  const [formatModalVisible, setFormatModalVisible] = useState(false);
  const [bufferModalVisible, setBufferModalVisible] = useState(false);
  const [decodeModalVisible, setDecodeModalVisible] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState('M3U');
  const [selectedBuffer, setSelectedBuffer] = useState('Auto');
  const [selectedDecode, setSelectedDecode] = useState('Hardware');

  const formatOptions = ['M3U', 'XSPF', 'JSON', 'XML'];
  const bufferOptions = ['Auto', 'Low', 'Medium', 'High'];
  const decodeOptions = ['Hardware', 'Software'];

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
            <Text style={styles.heading}>Video Format</Text>
            <Pressable style={styles.btnClose} onPress={onClose}>
              <Text style={styles.btnText}>✖</Text>
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Preferred Format Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Format:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setFormatModalVisible(true)}
              >
                <Text style={styles.dropdownText}>{selectedFormat}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            {/* Buffer Mode Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Buffer Mode:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setBufferModalVisible(true)}
              >
                <Text style={styles.dropdownText}>{selectedBuffer}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

            {/* Decode Mode Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Decode Mode:</Text>
              <Pressable
                style={styles.dropdown}
                onPress={() => setDecodeModalVisible(true)}
              >
                <Text style={styles.dropdownText}>{selectedDecode}</Text>
                <Text style={styles.arrow}>▾</Text>
              </Pressable>
            </View>

         

            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveText}>Submit</Text>
            </Pressable>
          </View>

          {/* Preferred Format Modal */}
          <Modal
            transparent
            visible={formatModalVisible}
            animationType="fade"
            onRequestClose={() => setFormatModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setFormatModalVisible(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={formatOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) =>
                    renderOption(item, setSelectedFormat, setFormatModalVisible)
                  }
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setFormatModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>

          {/* Buffer Mode Modal */}
          <Modal
            transparent
            visible={bufferModalVisible}
            animationType="fade"
            onRequestClose={() => setBufferModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setBufferModalVisible(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={bufferOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) =>
                    renderOption(item, setSelectedBuffer, setBufferModalVisible)
                  }
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setBufferModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>

          {/* Decode Mode Modal */}
          <Modal
            transparent
            visible={decodeModalVisible}
            animationType="fade"
            onRequestClose={() => setDecodeModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setDecodeModalVisible(false)}
            >
              <View style={styles.modalBox}>
                <FlatList
                  data={decodeOptions}
                  keyExtractor={item => item}
                  renderItem={({ item }) =>
                    renderOption(item, setSelectedDecode, setDecodeModalVisible)
                  }
                />
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setDecodeModalVisible(false)}
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

export default VideoFormatModal;

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
