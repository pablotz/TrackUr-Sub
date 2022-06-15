import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native'

const PlatformCard = ({id, name, image, navigation}:any) => {

    const goToAdd = () => {
        navigation.navigate('AddNew', {id: id, name: name, image: image})
    }

  return (
    <View>
        <Pressable onPress={() => goToAdd()}>
            <View style={styles.card}>
                <Image source={{uri: image}} style={styles.image} />
                <Text style={styles.text}>{name}</Text>
            </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        width: 185,
        height: 185,
        alignItems: 'center',
        borderRadius: 15,
        elevation: 20,
        shadowColor: '#52006A',
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 5,
        marginBottom: 20,
    }
})


export default PlatformCard