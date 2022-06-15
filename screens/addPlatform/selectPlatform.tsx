import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native'
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import PlatformCard from '../../components/platformCard/platformCard';
import { auth, db } from '../../firebase';

const SelectPlatform = ({navigation}:any) => {
    const [platforms, setPlatforms] = useState([]);
    const [selected, setSelected] = useState(undefined);

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
    <View>
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
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#000'
    }

})

export default SelectPlatform