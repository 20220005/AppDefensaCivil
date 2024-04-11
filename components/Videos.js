import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Linking  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Loader from './Loader';
import axios from 'axios';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get('https://adamix.net/defensa_civil/def/videos.php');
      setVideos(response.data.datos);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      // Desplaza el FlatList al primer ítem cuando se cargan los datos
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
    }
    }, [])
  );

  const renderVideoCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleVideoPress(item.link)}>
      <Image source={{ uri: `https://img.youtube.com/vi/${item.link}/0.jpg` }} style={styles.thumbnail} resizeMode="cover"/>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.description}>{item.descripcion}</Text>
        {/* Agregar fecha */}
      </View>
    </TouchableOpacity>
  );

  const handleVideoPress = (link) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${link}`);
  };

  const scrollToTop = () => {
    if(flatListRef && flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true});
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería de Vídeos Educativos y Formativos</Text>
      {loading ? (
        <Loader/>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
          ref={flatListRef}
          onLayout={scrollToTop}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fb7405',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#0a509e',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default Videos;
