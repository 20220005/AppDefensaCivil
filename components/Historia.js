import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const Historia = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_defensa_civil_ultimate.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Historia de la Defensa Civil</Text>
        <View style={styles.historiaContainer}>
          <Text style={styles.historiaText}>
            Antes del año 1966, cuando llegaba la temporada de huracanes, un grupo de radioaficionados se reunía en la Cruz Roja para estar atentos por si surgía algún tipo de emergencia, inmediatamente ponerse a disposición y ayudar en todo lo posible, inclusive, usando sus propios equipos de comunicación para así tener contacto con el exterior en caso de que las redes telefónicas resultaran afectadas.
          </Text>
          <Text style={styles.historiaText}>
            Al surgir el triunvirato fue designado el Dr. Rafael Cantizano Arias, como presidente de la Cruz Roja y al mismo tiempo nombraron al Ing. Carlos D´ Franco como director de la Defensa Civil, quien con un grupo compuesto por seis personas, se instaló en la calle Francia esquina Galván, siendo esa la primera oficina de la Defensa Civil.
          </Text>
          <Text style={styles.historiaText}>
            Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García Godoy, a los diecisiete días del mes de junio de 1966, fue promulgada la Ley 257, mediante la cual fue creada la Defensa Civil, institución dependiente de la Secretaría Administrativa de la Presidencia (ahora Ministerio de la Presidencia) y quien en la actualidad preside la Comisión Nacional de Emergencias.
          </Text>
          <Text style={styles.historiaText}>
            Más adelante, el local fue trasladado a la calle Dr. Delgado No. 164 y luego en la gestión del Contralmirante Radhamés Lora Salcedo se reubicó a la Plaza de la Salud, donde aún permanece.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fb7405',
    textAlign: 'center',
  },
  historiaContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  historiaText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#333',
    textAlign: 'justify',
  },
});

export default Historia;
