import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { auth } from '../../firebase'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'


const Login = ({navigation}:any) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                navigation.navigate({"name":"Dashboard"})
            } else {
                console.log('user not logged in')
            }
        }
        )
        return () => unsubscribe()
    }, [])

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User created!')
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        }
        )
    }

    const handleSignIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!')
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        })
    }

  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Username" onChangeText={text => setEmail(text)} />
        <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry/>
        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
        <Pressable style={styles.googleButton} onPress={handleSignUp} >
          <Text style={styles.text}>Register</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        margin: 10,
        width: '80%'
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        margin: 10,
        width: '80%',
        alignItems: 'center',
    },
    text: {
        color: '#fff'
    },
    googleButton: {
        backgroundColor: '#4285f4',
        padding: 10,
        margin: 10,
        width: '80%',
        alignItems: 'center',
    }
})

export default Login