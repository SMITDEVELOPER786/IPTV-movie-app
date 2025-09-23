import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Image 
} from "react-native";
import { useNavigation} from "@react-navigation/native"

export default function HomeScreen({ navigation }) {
    const mainnavigation = useNavigation()


  // 🔹 Handle Card Click
  const handleCardClick = (screenName) => {
    mainnavigation.navigate(screenName);
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
          <Text style={styles.time}>10:00 PM</Text>
          <Text style={styles.date}>AUG 29TH, 2025</Text>
          <TextInput 
            style={styles.search} 
            placeholder="Master Search" 
            placeholderTextColor="#aaa" 
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          
          {/* LIVE TV */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleCardClick("LiveTV")}
          >
            <Image 
              source={{ uri: "https://your-live-tv-image-url.com" }} 
              style={styles.cardImage} 
            />
            <Text style={styles.cardText}>LIVE TV</Text>
          </TouchableOpacity>
          
          {/* MOVIES */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleCardClick("Movies")}
          >
            <Image 
              source={{ uri: "https://your-movies-image-url.com" }} 
              style={styles.cardImage} 
            />
            <Text style={styles.cardText}>MOVIES</Text>
          </TouchableOpacity>
          
          {/* SERIES */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleCardClick("Series")}
          >
            <Image 
              source={{ uri: "https://your-series-image-url.com" }} 
              style={styles.cardImage} 
            />
            <Text style={styles.cardText}>SERIES</Text>
          </TouchableOpacity>
        
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Update Playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Reload Cache</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Multiscreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Add Playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Expiration Date */}
        <Text style={styles.expiration}>EXPIRATION: DECEMBER 25TH, 2025</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", padding: 20 },
  header: { marginBottom: 20 },
  time: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  date: { color: "#fff", fontSize: 14, marginBottom: 10 },
  search: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  categoryRow: { marginVertical: 20 },
  card: { marginRight: 15, alignItems: "center" },
  cardImage: { width: 120, height: 80, borderRadius: 10 },
  cardText: { color: "#fff", marginTop: 8, fontWeight: "bold" },
  actions: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    marginVertical: 20 
  },
  actionBtn: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    margin: 5,
  },
  actionText: { color: "#fff", fontSize: 12 },
  expiration: { color: "#aaa", textAlign: "center", marginTop: 10 },
});
