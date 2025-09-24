import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleCardClick = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleActionClick = (action) => {
    console.log(`${action} clicked`);
  };

  return (
    <ImageBackground
      source={require("../assets/images/Thumb.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.time}>10:00 PM</Text>
            <Text style={styles.date}>AUG 29TH, 2025</Text>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Master Search"
              placeholderTextColor="#aaa"
              style={styles.search}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoryRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            snapToInterval={width * 0.44} // Snap to card width for smooth scrolling
            decelerationRate="fast" // Smooth snap effect
          >
            {/* LIVE TV */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardClick("LiveTV")}
              activeOpacity={0.8} // Subtle press feedback
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
                }}
                style={styles.cardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardText}>🔴 LIVE TV</Text>
              </View>
            </TouchableOpacity>

            {/* MOVIES */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardClick("Movies")}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/7991386/pexels-photo-7991386.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
                }}
                style={styles.cardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardText}>🎬 MOVIES</Text>
              </View>
            </TouchableOpacity>

            {/* SERIES */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardClick("Series")}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/8983711/pexels-photo-8983711.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
                }}
                style={styles.cardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardText}>📺 SERIES</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleCardClick("Playlist")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>🔄 Update Playlist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleActionClick("Reload Cache")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>⬇ Reload Cache</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleActionClick("Multiscreen")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>🟦 Multiscreen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleActionClick("Add Playlist")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>➕ Add Playlist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleCardClick("Settings")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>⚙ Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Expiration */}
        <Text style={styles.expiration}>
          EXPIRATION: DECEMBER 25TH, 2025
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)", // Slightly darker for better contrast
    padding: width * 0.05,
    justifyContent: "space-between", // Distribute content evenly
  },
  header: {
    flexDirection: width < 400 ? "column" : "row",
    justifyContent: "space-between",
    alignItems: width < 400 ? "flex-start" : "center",
    marginBottom: height * 0.05,
    gap: width < 400 ? 12 : 0, // Gap for stacked layout
  },
  headerLeft: {
    flexDirection: "column",
  },
  time: {
    color: "#fff",
    fontSize: width * 0.065, // Slightly larger for readability
    fontWeight: "bold",
  },
  date: {
    color: "#ddd",
    fontSize: width * 0.04,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "rgba(30,30,30,0.85)",
    borderRadius: 12,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginLeft: width < 400 ? 0 : width * 0.05,
    width: width < 400 ? "100%" : "auto",
  },
  search: {
    color: "#fff",
    paddingVertical: height * 0.015,
    fontSize: width * 0.045,
  },
  categoryRow: {
    marginBottom: height * 0.05,
  },
  scrollContent: {
    paddingLeft: width * 0.05,
    paddingRight: width * 0.1,
    gap: width * 0.04, // Space between cards
  },
  card: {
    width: width * 0.4, // Slightly smaller for better fit
    height: height * 0.2,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  cardOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)", // Overlay for better text readability
    padding: width * 0.03,
  },
  cardText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "700",
    textAlign: "left",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: height * 0.04,
    gap: width * 0.03,
  },
  actionBtn: {
    backgroundColor: "rgba(50,50,50,0.9)",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderRadius: 10,
    margin: width * 0.015,
    minWidth: width * 0.3, // Larger buttons for touch
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
    textAlign: "center",
  },
  expiration: {
    color: "#ccc",
    textAlign: "center",
    marginTop: height * 0.03,
    fontSize: width * 0.04,
    letterSpacing: 0.5,
  },
});