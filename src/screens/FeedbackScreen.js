import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');
const isPhone = width < 768;
const isTablet = width >= 768 && width < 1000;
const isTV = width >= 1000;
const isLargeTV = width >= 1920;
const scale = isLargeTV ? 1.5 : isTV ? 1.2 : isTablet ? 1.1 : 1;

const FeedbackScreen = ({ visible, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase();
  };

  const handleSubmit = () => {
    if (feedback.trim()) {
      Alert.alert(
        'Feedback Submitted',
        'Thank you for your feedback! We appreciate your input.',
        [{ text: 'OK', onPress: () => {
          setFeedback('');
          onClose();
        }}]
      );
    } else {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
    }
  };

  const handleClose = () => {
    setFeedback('');
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isTV && styles.tvContainer]}>


          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.modalCard}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Feedback</Text>
                <Pressable style={styles.closeBtn} onPress={handleClose}>
                  <Text style={styles.closeText}>✕</Text>
                </Pressable>
              </View>

              {/* Feedback Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.feedbackInput}
                  placeholder="Feedback"
                  placeholderTextColor="#999"
                  value={feedback}
                  onChangeText={setFeedback}
                  multiline={true}
                  numberOfLines={isPhone ? 6 : isTV ? 8 : 7}
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={[styles.actionBtn, styles.submitBtn]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitBtnText}>Submit</Text>
                </Pressable>
                <Pressable 
                  style={[styles.actionBtn, styles.closeActionBtn]}
                  onPress={handleClose}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: isLargeTV ? '60%' : isTV ? '70%' : isTablet ? '80%' : '95%',
    maxWidth: isLargeTV ? 1000 : isTV ? 900 : isTablet ? 700 : '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 20 * scale,
    overflow: 'hidden',
    marginHorizontal: isPhone ? 10 : 0,
  },
  tvContainer: {
    width: isLargeTV ? '50%' : '60%',
    maxWidth: isLargeTV ? 800 : 700,
  },
  header: {
    paddingHorizontal: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 30 : 20) * scale,
    paddingVertical: (isLargeTV ? 35 : isTV ? 30 : isTablet ? 25 : 20) * scale,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1 * scale,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  titleSection: {
    width: '100%',
  },
  titleWithTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: isPhone ? 'flex-start' : 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 40 : isTV ? 32 : isTablet ? 28 : 24) * scale,
    fontWeight: '600',
  },
  timeDate: {
    alignItems: 'flex-end',
  },
  time: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 24 : isTV ? 20 : isTablet ? 18 : 16) * scale,
    fontWeight: '500',
  },
  date: {
    color: '#888',
    fontSize: (isLargeTV ? 18 : isTV ? 14 : isTablet ? 13 : 12) * scale,
    marginTop: 2 * scale,
  },
  content: {
    padding: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 30 : 20) * scale,
    justifyContent: 'center',
    minHeight: (isLargeTV ? 400 : isTV ? 350 : isTablet ? 300 : 280) * scale,
  },
  modalCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16 * scale,
    padding: (isLargeTV ? 40 : isTV ? 32 : isTablet ? 28 : 24) * scale,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: (isLargeTV ? 30 : isTV ? 24 : isTablet ? 20 : 18) * scale,
  },
  modalTitle: {
    color: '#333',
    fontSize: (isLargeTV ? 28 : isTV ? 24 : isTablet ? 22 : 20) * scale,
    fontWeight: '600',
  },
  closeBtn: {
    width: (isLargeTV ? 40 : isTV ? 36 : isTablet ? 32 : 28) * scale,
    height: (isLargeTV ? 40 : isTV ? 36 : isTablet ? 32 : 28) * scale,
    borderRadius: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 16 : 14) * scale,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#666',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 16 : 14) * scale,
    fontWeight: '300',
  },
  inputContainer: {
    marginBottom: (isLargeTV ? 30 : isTV ? 24 : isTablet ? 20 : 18) * scale,
  },
  feedbackInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12 * scale,
    padding: (isLargeTV ? 20 : isTV ? 16 : isTablet ? 14 : 12) * scale,
    fontSize: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 16 : 14) * scale,
    color: '#333',
    minHeight: (isLargeTV ? 160 : isTV ? 140 : isTablet ? 120 : 100) * scale,
    maxHeight: (isLargeTV ? 200 : isTV ? 180 : isTablet ? 160 : 140) * scale,
    fontFamily: 'System',
  },
  buttonContainer: {
    flexDirection: isPhone ? 'column' : 'row',
    gap: (isLargeTV ? 20 : isTV ? 16 : isTablet ? 14 : 12) * scale,
  },
  actionBtn: {
    flex: isPhone ? 0 : 1,
    paddingVertical: (isLargeTV ? 18 : isTV ? 16 : isTablet ? 14 : 12) * scale,
    paddingHorizontal: (isLargeTV ? 32 : isTV ? 28 : isTablet ? 24 : 20) * scale,
    borderRadius: 10 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: (isLargeTV ? 56 : isTV ? 52 : isTablet ? 48 : 44) * scale,
  },
  submitBtn: {
    backgroundColor: '#6366f1',
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 17 : 16) * scale,
    fontWeight: '600',
  },
  closeActionBtn: {
    backgroundColor: '#8b5cf6',
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 17 : 16) * scale,
    fontWeight: '600',
  },
});