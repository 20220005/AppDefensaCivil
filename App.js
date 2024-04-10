import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Members from './components/Members';
import Services from './components/Services';
import { FlatList } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.container}>
    
    <RegisterForm/>

    <Login/>
{/*         
      <Members/>
    
   
      <Services/> */}
   
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
