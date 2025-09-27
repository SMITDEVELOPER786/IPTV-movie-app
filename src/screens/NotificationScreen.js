import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');
const isPhone = width < 768;
const isTablet = width >= 768 && width < 1000;
const isTV = width >= 1000;
const isLargeTV = width >= 1920;
const scale = isLargeTV ? 1.5 : isTV ? 1.2 : isTablet ? 1.1 : 1;

const NotificationModal = ({ visible, onClose }) => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Intermittent Video Freezing',
      message: 'This is a known issue, or sometimes caused by poor or slow wifi/internet connection. However, connection speed/quality Requirements could be found on our Discord Support Channel.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'update',
      title: 'App Update Available',
      message: 'Version 2.1.5 is now available with bug fixes and performance improvements.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Connection Issue',
      message: 'Unable to connect to server. Please check your internet connection.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'New Features Added',
      message: 'Check out the new multiscreen feature and improved playlist management.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'success',
      title: 'Playlist Updated',
      message: 'Your playlist has been successfully updated with 150 new channels.',
      time: '1 week ago',
      read: true,
    },
  ]);

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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'update': return '🔄';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info': return '#4285f4';
      case 'warning': return '#ff9800';
      case 'update': return '#9c27b0';
      case 'success': return '#4caf50';
      default: return '#4285f4';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableWithoutFeedback>
      <View style={[styles.notificationItem, !item.read && styles.unreadNotification]}>
        <View style={styles.notificationHeader}>
          <View style={styles.notificationIconContainer}>
            <View 
              style={[
                styles.notificationIconBg, 
                { backgroundColor: getNotificationColor(item.type) + '20' }
              ]}
            >
              <Text style={[styles.notificationIcon, { color: getNotificationColor(item.type) }]}>
                {getNotificationIcon(item.type)}
              </Text>
            </View>
          </View>
          <View style={styles.notificationContent}>
            <View style={styles.notificationTitleRow}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isTV && styles.tvContainer]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <View style={styles.titleWithBadge}>
                <Text style={styles.title}>NOTIFICATION</Text>
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </View>
              <View style={styles.timeDate}>
                <Text style={styles.time}>{getCurrentTime()}</Text>
                <Text style={styles.date}>{getCurrentDate()}</Text>
              </View>
            </View>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {/* Notifications List */}
          <View style={styles.content}>
            {notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔔</Text>
                <Text style={styles.emptyTitle}>No Notifications</Text>
                <Text style={styles.emptyMessage}>You're all caught up!</Text>
              </View>
            ) : (
              <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </View>

          {/* Footer Actions */}
          {notifications.length > 0 && (
            <View style={styles.footer}>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Mark All Read</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.clearBtn]}>
                <Text style={[styles.actionBtnText, styles.clearBtnText]}>Clear All</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: isLargeTV ? '50%' : isTV ? '60%' : isTablet ? '75%' : '95%',
    maxWidth: isLargeTV ? 1000 : isTV ? 800 : isTablet ? 600 : '100%',
    height: isLargeTV ? '80%' : isTV ? '85%' : isTablet ? '85%' : '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 20 * scale,
    overflow: 'hidden',
    marginHorizontal: isPhone ? 10 : 0,
  },
  tvContainer: {
    width: isLargeTV ? '45%' : isTV ? '55%' : isTablet ? '70%' : '95%',
    maxWidth: isLargeTV ? 900 : isTV ? 700 : isTablet ? 550 : '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 30 : 20) * scale,
    paddingVertical: (isLargeTV ? 35 : isTV ? 30 : isTablet ? 25 : 20) * scale,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1 * scale,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  titleSection: {
    flexDirection: isPhone ? 'column' : 'row',
    alignItems: isPhone ? 'flex-start' : 'center',
    flex: 1,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: isPhone ? 0 : (isLargeTV ? 50 : isTV ? 40 : isTablet ? 30 : 24) * scale,
    marginBottom: isPhone ? 8 * scale : 0,
  },
  title: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 40 : isTV ? 32 : isTablet ? 28 : 24) * scale,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#ff4444',
    borderRadius: 12 * scale,
    minWidth: 24 * scale,
    height: 24 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12 * scale,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 14 : isTV ? 12 : 10) * scale,
    fontWeight: '600',
  },
  timeDate: {
    alignItems: isPhone ? 'flex-start' : 'flex-end',
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
  closeBtn: {
    width: (isLargeTV ? 60 : isTV ? 50 : 40) * scale,
    height: (isLargeTV ? 60 : isTV ? 50 : 40) * scale,
    borderRadius: (isLargeTV ? 30 : isTV ? 25 : 20) * scale,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 30 : isTV ? 24 : 18) * scale,
    fontWeight: '300',
  },
  content: {
    flex: 1,
    paddingHorizontal: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 30 : 20) * scale,
  },
  listContainer: {
    paddingVertical: (isLargeTV ? 30 : isTV ? 24 : isTablet ? 20 : 16) * scale,
  },
  notificationItem: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16 * scale,
    padding: (isLargeTV ? 30 : isTV ? 24 : isTablet ? 20 : 16) * scale,
    borderLeftWidth: 4 * scale,
    borderLeftColor: 'transparent',
  },
  unreadNotification: {
    backgroundColor: 'rgba(66, 133, 244, 0.08)',
    borderLeftColor: '#4285f4',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: (isLargeTV ? 16 : isTV ? 12 : isTablet ? 10 : 8) * scale,
  },
  notificationIconContainer: {
    marginRight: (isLargeTV ? 20 : isTV ? 16 : isTablet ? 14 : 12) * scale,
  },
  notificationIconBg: {
    width: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 36 : 32) * scale,
    height: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 36 : 32) * scale,
    borderRadius: (isLargeTV ? 25 : isTV ? 20 : isTablet ? 18 : 16) * scale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: (isLargeTV ? 24 : isTV ? 20 : isTablet ? 18 : 16) * scale,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : 16) * scale,
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8 * scale,
    height: 8 * scale,
    borderRadius: 4 * scale,
    backgroundColor: '#4285f4',
    marginLeft: 8 * scale,
  },
  notificationTime: {
    color: '#888',
    fontSize: (isLargeTV ? 16 : isTV ? 14 : 12) * scale,
    marginTop: 4 * scale,
  },
  notificationMessage: {
    color: '#cccccc',
    fontSize: (isLargeTV ? 18 : isTV ? 16 : 14) * scale,
    lineHeight: (isLargeTV ? 26 : isTV ? 22 : 20) * scale,
  },
  separator: {
    height: (isLargeTV ? 20 : isTV ? 16 : 12) * scale,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: (isLargeTV ? 80 : isTV ? 64 : isTablet ? 56 : 48) * scale,
    marginBottom: (isLargeTV ? 30 : isTV ? 24 : isTablet ? 20 : 16) * scale,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 28 : isTV ? 24 : isTablet ? 22 : 20) * scale,
    fontWeight: '600',
    marginBottom: (isLargeTV ? 16 : isTV ? 12 : isTablet ? 10 : 8) * scale,
  },
  emptyMessage: {
    color: '#888',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 17 : 16) * scale,
    textAlign: 'center',
  },
  footer: {
    flexDirection: isPhone ? 'column' : 'row',
    paddingHorizontal: (isLargeTV ? 50 : isTV ? 40 : isTablet ? 30 : 20) * scale,
    paddingVertical: (isLargeTV ? 30 : isTV ? 24 : isTablet ? 20 : 16) * scale,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderTopWidth: 1 * scale,
    borderTopColor: 'rgba(255,255,255,0.1)',
    gap: (isLargeTV ? 20 : isTV ? 16 : isTablet ? 14 : 12) * scale,
  },
  actionBtn: {
    flex: isPhone ? 0 : 1,
    width: isPhone ? '100%' : 'auto',
    backgroundColor: '#4285f4',
    paddingVertical: (isLargeTV ? 18 : isTV ? 15 : isTablet ? 14 : 12) * scale,
    borderRadius: 8 * scale,
    alignItems: 'center',
  },
  clearBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1 * scale,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: (isLargeTV ? 20 : isTV ? 18 : isTablet ? 17 : 16) * scale,
    fontWeight: '600',
  },
  clearBtnText: {
    color: '#cccccc',
  },
});