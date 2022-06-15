import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TextInput, Pressable, ToastAndroid } from 'react-native'
import { auth } from '../../firebase'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { types } from '../../Store/StoreReducer'
import { useStore, useDispatch } from '../../Store/StoreProvider'
import { SafeAreaView } from 'react-native-safe-area-context'


const Login = ({navigation}:any) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const store = useStore();
    const dispatch = useDispatch();

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {            
            ToastAndroid.showWithGravityAndOffset(
                "Register Success!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
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
            dispatch({type: types.authLogin, payload: auth.currentUser})
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        })
    }

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome!</Text>
                <TextInput style={styles.input} placeholder="Username" onChangeText={text => setEmail(text)} />
                <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry/>
            <Pressable style={styles.button} onPress={handleSignIn}>
                <Text style={styles.text}>Login</Text>
            </Pressable>
            <Pressable style={styles.googleButton} onPress={handleSignUp} >
                <Text style={styles.text}>Register</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    welcome: {
        fontSize: 45,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20,
        color: '#000'
    },

    container: {
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#E9eaea',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        width: '80%',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#d1682c',
        padding: 12,
        margin: 10,
        width: '50%',
        alignItems: 'center',
        borderRadius: 30,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },
    googleButton: {
        backgroundColor: '#4285f4',
        padding: 10,
        margin: 10,
        width: '50%',
        alignItems: 'center',
        borderRadius: 30,
    }
})

export default Login