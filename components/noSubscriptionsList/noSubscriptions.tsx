import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NoSubscriptions = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.nosub}>You didn't have any subscriptions</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },
    nosub: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '500',
        color: '#000',
    }
})



export default NoSubscriptions