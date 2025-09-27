import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  Text,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';


const series = [
  {
    id: '1',
    name: 'Loki',
    image: require('../assets/images/Loki Poster.jpg'),
    ep: 16,
    category: 'fantasy',
    rated: 5,
  },
  {
    id: '2',
    name: 'Ginny & Georgia',
    image: require('../assets/images/ginny.jpg'),
    ep: 5,
    category: 'adventure',
    rated: 5,
  },
  {
    id: '3',
    name: 'Teen Wolf',
    image: require('../assets/images/teen.jpg'),
    ep: 10,
    category: 'comedy',
    rated: 5,
  },
  {
    id: '4',
    name: 'The Originals',
    image: require('../assets/images/originals.jpg'),
    ep: 22,
    category: 'sci-fi',
    rated: 4.5,
  },
  {
    id: '5',
    name: 'The Vampire Diaries',
    image: require('../assets/images/The Vampire Diaries.jpg'),
    ep: 77,
    category: 'animated',
    rated: 1,
  },
  {
    id: '6',
    name: 'Elite',
    image: require('../assets/images/Elite.jpg'),
    ep: 8,
    category: 'action',
    rated: 3,
  },
  {
    id: '7',
    name: 'Riverdale',
    image: require('../assets/images/RIVERDALE.jpg'),
    ep: 9,
    category: 'crime',
    rated: 2.5,
  },
  {
    id: '8',
    name: 'Wednesday',
    image: require('../assets/images/wednesday.jpg'),
    ep: 81,
    category: 'mystery',
    rated: 5,
  },
  {
    id: '9',
    name: 'The Royals',
    image: require('../assets/images/royals.jpg'),
    ep: 5,
    category: 'thriller',
    rated: 5,
  },
  {
    id: '10',
    name: 'Money Heist',
    image: require('../assets/images/money.jpg'),
    ep: 16,
    category: 'horror',
    rated: 3.5,
  },
];

const renderStars = rating => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Image
          key={i}
          source={require('../assets/images/star-full.png')}
          style={{ width: 10, height: 10, marginRight: 2 }}
        />
      );
    } else if (i - rating <= 0.5 && i > rating) {
      stars.push(
        <Image
          key={i}
          source={require('../assets/images/star-half.png')}
          style={{ width: 10, height: 10, marginRight: 2 }}
        />
      );
    } 
  }
  return stars;
};

const SeriesList = () => {
  return (
    <FlatList
      data={series}
      keyExtractor={item => item.id}
      numColumns={5}
      scrollEnabled={false}
      columnWrapperStyle={{
        gap: 20,
        marginBottom: 15,
        justifyContent: 'center',
      }}
      renderItem={({ item }) => (
        <ImageBackground
          source={item.image}
          style={styles.movieImg}
          imageStyle={{ borderRadius: 8 }}
        >
          <View style={styles.overlayCard}>
            <View>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.stars}>
             
                  {renderStars(item.rated)}
               
              </View>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.ep}>{item.ep} EP</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </View>
        </ImageBackground>
      )}
    />
  );
};

const SeriesScreen = () => {
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
          <View style={styles.mainImg}>
            <ImageBackground
              source={require('../assets/images/series mainimg.png')}
              style={styles.imageBgInner}
            ></ImageBackground>
          </View>

          <View style={styles.movieList}>
            <SeriesList />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default SeriesScreen;

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    paddingTop: 40,
    paddingRight: '8%',
    paddingLeft: '8%',
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
  movieList: {
    marginTop: 30,
  },
  movieImg: {
    width: 150,
    height: 210,
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlayCard: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  name: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ep: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  category: {
    color: '#fff',
    fontSize: 11,
    fontStyle: 'italic',
  },
});
