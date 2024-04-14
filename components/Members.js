import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Loader from './Loader';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adamix.net/defensa_civil/def/miembros.php');
        setMembers(response.data.datos);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.memberContainer}>
      <Image source={{ uri: item.foto }} style={styles.memberImage} />
      <Text style={styles.memberName}>{item.nombre}</Text>
      <Text style={styles.memberCargo}>{item.cargo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Miembros</Text>
      {loading ? (
        <Loader/>
      ) : (
        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#fb7405',
  },
  flatListContainer: {
    alignItems: 'center',
  },
  memberContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a509e',
    textAlign: 'center',
  },
  memberCargo: {
    fontSize: 16,
    color: '#0a509e',
  },
});

export default Members;
