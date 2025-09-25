import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AddPlaylistModal = ({ visible, onClose }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'M3U', value: 'm3u' },
    { label: 'JSON', value: 'json' },
    { label: 'XML', value: 'xml' },
  ]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.inputCon}>
            <View style={styles.headingAndBtn}>
              <Text style={styles.heading}>Add Playlist</Text>
              <Pressable style={styles.btnClose} onPress={onClose}>
                <Text style={styles.btnText}>✖</Text>
              </Pressable>
            </View>

            <View>
              <Text style={styles.label}>Playlist Name:</Text>
              <TextInput
                placeholder="My IPTV Playlist"
                placeholderTextColor="#A098AE80"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Playlist URL:</Text>
              <TextInput
                placeholder="http://example-playlist.m3u"
                placeholderTextColor="#A098AE80"
                style={styles.input}
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Playlist Type:</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select Playlist Type"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={{ color: '#fff' }}
                placeholderStyle={{ color: '#A098AE80' }}
              />
            </View>

            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>Save Playlist</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlaylistModal;

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
  
    borderStyle:'solid',
    borderColor:'#2E293E',
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
  inputCon: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#2E293E',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginBottom: 12,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '400',
  },
  dropdown: {
    backgroundColor: '#2E293E',
    borderColor: '#2E293E',
  },
  dropdownContainer: {
    backgroundColor: '#2E293E',
    borderColor: '#2E293E',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#4F45B6',
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
  },
});
