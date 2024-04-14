import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, ScrollView } from 'react-native';

const developers = [
    {
        id: 1,
        name: 'Alexander Rodríguez',
        image: require('../assets/alexander.jpg'),
        idITLA: '2022-0005',
        github: '20220005',
        phone: '+1 (809) 850-2982',
    },
    {
        id: 2,
        name: 'Janiel Flores',
        image: require('../assets/janiel.jpg'),
        idITLA: '2022-0194',
        github: 'JanielF',
        phone: '+1 (829) 766-4946',
    },
    {
        id: 3,
        name: 'Omar Sánchez',
        image: require('../assets/omar.jpg'),
        idITLA: '2022-0197',
        github: 'OmarSanchez21',
        phone: '+1 (829) 985-0064',
    },
    {
        id: 4,
        name: 'Crystal Durán',
        image: require('../assets/crystal.jpg'),
        idITLA: '2022-0553',
        github: 'crystalduran',
        phone: '+1 (829) 407-0912',
    },
    {
        id: 5,
        name: 'Brian Peralta',
        image: require('../assets/bp.jpg'),
        idITLA: '2022-2214',
        github: 'BrianP',
        phone: '+1 (849) 460-9050',
    },
];

const DeveloperCard = ({ developer }) => {
    const { name, image, idITLA, github, phone } = developer;

    const handlePress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image source={image} style={styles.image} />
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.info}>{idITLA}</Text>
                <View style={styles.githubContainer}>
                    <Image 
                        source={require('../assets/icons8-github-30.png')} 
                        style={styles.icon} 
                        onPress={() => handlePress(`https://github.com/${github}`)}
                    />
                    <Text style={styles.link} onPress={() => handlePress(`https://github.com/${github}`)}>
                        @{github}
                    </Text>
                </View>
                <View style={styles.phoneContainer}>
                    <Image source={require('../assets/icons8-telephone-30.png')} style={styles.icon} />
                    <Text style={styles.link}>
                        {phone}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const AcercaDe = () => {
    const scrollViewRef = useRef();

    useEffect(() => {
        // Desplaza hacia arriba al principio de la lista cuando el componente se renderiza
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }, []);

    return (
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Nuestro Equipo de Desarrollo</Text>
            {developers.map(developer => (
                <DeveloperCard key={developer.id} developer={developer} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 20,
        backgroundColor: '#0a509e',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fb7405',
        marginBottom: 20,
        alignSelf: 'center'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        marginRight: 20,
    },
    imageBorder: {
        borderWidth: 4,
        borderColor: '#fb7405',
        borderRadius: 55,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#0a509e',
    },
    info: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 12,
        marginBottom: 5,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    githubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
});

export default AcercaDe;
