import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const reportsData = [
    { id: 1, title: 'Reporte 1', date: '2022-01-01', description: 'Descripción del reporte 1', photos: [], status: 'Pendiente', comments: [] },
    
  ];
  
  const ReportList = ({ navigation }) => {
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('ReportDetails', { report: item })} style={styles.item}>
        <Text>{item.title}</Text>
        <Text>{item.date}</Text>
      </TouchableOpacity>
    );
  
    return (
      <FlatList
        data={reportsData.sort((a, b) => new Date(b.date) - new Date(a.date))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    );
  };
  
  const ReportDetails = ({ route }) => {
    const { report } = route.params;
  
    return (
      <View style={styles.detailsContainer}>
        <Text>ID: {report.id}</Text>
        <Text>Fecha: {report.date}</Text>
        <Text>Descripción: {report.description}</Text>
        <Text>Estado: {report.status}</Text>
        {/* Mostrar fotos, comentarios, etc. si es necesario */}
      </View>
    );
  };
  
  const Stack = createStackNavigator();
  
  const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ReportList" component={ReportList} options={{ title: 'Historial de Reportes' }} />
          <Stack.Screen name="ReportDetails" component={ReportDetails} options={{ title: 'Detalles del Reporte' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    detailsContainer: {
      padding: 20,
    },
  });
  
  export default App;