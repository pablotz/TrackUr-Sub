import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native'
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import PlatformCard from '../../components/platformCard/platformCard';
import { auth, db } from '../../firebase';

const SelectPlatform = ({navigation}:any) => {
    const [platforms, setPlatforms] = useState([]);
    const [selected, setSelected] = useState(undefined);
    const [query, setQuery] = useState('');

    useEffect(() => {
        let platforms:any = [];
        db.collection('platforms').get().then((snapshot:any) => {
            snapshot.docs.forEach((doc:any) => {
                platforms.push({id: doc.id, ...doc.data()});
            })
            setPlatforms(platforms);
        }).catch((error:any) => {
            console.log(error);
        })
    }, [])

  return (
    <View style={styles.container}>
        <FlatList 
        data={platforms} 
        numColumns={2}
        keyExtractor={(item:any, index) => item.id }
        renderItem={({item, index}:any) => 
            <PlatformCard 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                navigation={navigation}
            />} 
        />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#00bfff',
        padding: 10,
        margin: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
})

export default SelectPlatform