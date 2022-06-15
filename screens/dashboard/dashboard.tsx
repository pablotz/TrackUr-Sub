import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native'
import { auth, db } from '../../firebase'
import Add from '../../assets/SVG/add'
import { useEffect } from 'react'
import Subscription from '../../components/subscriptions/subscriptions'

const Dashboard = ({navigation}:any) => {

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            navigation.navigate('Login')
            console.log('User signed out!')
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        }
        )
    }

    const goToAdd = () => {
        navigation.navigate('Platform')
    }

    const [data, setData] = useState([])

    const getData = () => {
        let userData: any = []
        db.collection('subscriptions').where('user', '==', auth.currentUser.uid).get()
        .then((snapshot:any) => {
            snapshot.docs.forEach((doc:any) => {
                userData.push(doc.data())
            })
            setData(userData)
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        })

    }

    useEffect(() => {
        getData()
    }, [])

  return (
    // <View style={styles.container}>
    //     <Text>Email: {auth.currentUser?.email}</Text>
    //     <Pressable style={styles.button} onPress={() => {handleSignOut();}}>
    //         <Text style={styles.text}>Sign Out</Text>
    //     </Pressable>
    // </View>
    <View style={styles.container}>
        <View style={styles.addButton}>
            <Pressable style={styles.button} onPress={() => goToAdd()}> 
                <Add 
                    width={40}
                    height={40}
                /> 
            </Pressable>
        </View>
        <FlatList
            data={data}
            keyExtractor={(item:any) => item.id}
            renderItem={({item}:any) => {
                return (
                    <Subscription 
                        name={item.name}
                        endDate={item.endDate}
                        image={item.image}
                    />
                )
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#d1682c',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 15,
    },
    subscriptions: {
        marginTop: 70,

    },
    text: {
        fontSize: 20,
        color: '#000',
    },
    addButton: {
        marginTop: 30,
        marginLeft: 280,
    }
})

export default Dashboard