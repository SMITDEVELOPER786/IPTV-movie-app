import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const isPhone = width < 768;

const categories = [
  {
    id: '1',
    name: 'Animated',
    image: require('../assets/images/animated.png'),
  },
  {
    id: '2',
    name: 'Adventure',
    image: require('../assets/images/adventure2.png'),
  },
  { id: '3', name: 'Sci-fi', image: require('../assets/images/scifi.png') },
  { id: '4', name: 'Fantasy', image: require('../assets/images/fantasy.png') },
  { id: '5', name: 'Horror', image: require('../assets/images/fantasy.png') },
];

const movies = [
  { id: '1', image: require('../assets/images/movie1.png') },
  { id: '2', image: require('../assets/images/movie2.png') },
  { id: '3', image: require('../assets/images/movie3.png') },
  { id: '4', image: require('../assets/images/movie4.png') },
  { id: '5', image: require('../assets/images/movie5.png') },
  { id: '6', image: require('../assets/images/movie5.png') },
  { id: '7', image: require('../assets/images/movie4.png') },
  { id: '8', image: require('../assets/images/movie3.png') },
  { id: '9', image: require('../assets/images/movie2.png') },
  { id: '10', image: require('../assets/images/movie1.png') },
];

const CategoryList = () => {
  const gap = 10;
  const totalGaps = gap * (3 - 1);
  const cardWidth = (width - totalGaps - 8) / 4.4;
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: gap }}
      renderItem={({ item }) => (
        <View
          style={[
            styles.categoryCard,
            { width: cardWidth },
          ]}
        >
          <ImageBackground
            source={item.image}
            style={styles.categoryImg}
            imageStyle={{ borderRadius: 12 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)']}
              style={styles.gradientOverlay}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      )}
    />
  );
};


const MovieList = () => {
  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.id}
      numColumns={isPhone ? 1 : 6} 
      scrollEnabled={false}
      columnWrapperStyle={
        !isPhone
          ? { gap: 20, marginBottom: 15, justifyContent: 'center' }
          : undefined
      }
      renderItem={({ item }) => (
        <View style={isPhone ? { marginBottom: 20 } : {}}>
          <Image
            source={item.image}
            style={[
              styles.movieImg,
              isPhone && { width: width * 0.84, height: 500, alignSelf:'center' },
            ]}
          />
        </View>
      )}
    />
  );
};


const MoviesScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/Thumb.png')}
      style={styles.imageBg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Header />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.mainImg,
              isPhone && { height: 270 }, 
            ]}
          >
            <ImageBackground
              source={require('../assets/images/Thumb2.png')}
              style={styles.imageBgInner}
            >
              <LinearGradient
                colors={[
                  '#13141C',
                  'rgba(0, 0, 0, 0.687449)',
                  'rgba(196, 196, 196, 0)',
                ]}
                locations={[0.404, 0.5364, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Image
                  source={require('../assets/images/title.png')}
                  style={[
                    styles.titleimg,
                    isPhone && { width: 130, height: 40 }, 
                  ]}
                />
                <Text
                  style={[
                    { width: '40%', color: '#fff' },
                    isPhone && { width: '100%', marginTop: 10, fontSize:12 },
                  ]}
                >
                  Ved and Tara fall in love while on a holiday in Corsica and
                  decide to keep their real identities undisclosed.
                </Text>
                <Pressable style={styles.watchBtn}>
                  <Text style={styles.watchBtnText}>WATCH NOW</Text>
                </Pressable>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* CategoryList Component */}
          <View style={styles.cateSide}>
            <CategoryList />
          </View>

          <View style={styles.movieList}>
            <MovieList />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default MoviesScreen;


const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 40,
    paddingRight: '4%',
    paddingLeft: '4%',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  mainImg: {
    height: 300,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageBgInner: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  titleimg: {
    height: 70,
    width: 200,
    marginBottom: 20,
  },
  watchBtn: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#515DEF',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  watchBtnText: {
    color: '#fff',
  },
  cateSide: {
    marginTop: 20,
  },
  categoryCard: {
    width: 220,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImg: {
    flex: 1,
    justifyContent: 'center',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  movieList: {
    marginTop: 30,
  },
  movieImg: {
    width: 150,
    height: 210,
    borderRadius: 8,
  },
});
