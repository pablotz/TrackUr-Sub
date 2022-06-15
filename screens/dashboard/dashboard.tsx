import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native'
import { auth, db } from '../../firebase'
import Add from '../../assets/SVG/add'
import { useEffect } from 'react'
import Subscription from '../../components/subscriptions/subscriptions'
import { types } from '../../Store/StoreReducer'
import { useDispatch, useStore } from '../../Store/StoreProvider'
import NoSubscriptions from '../../components/noSubscriptionsList/noSubscriptions'

const Dashboard = ({route, navigation}:any) => {

    const store = useStore();
    const dispatch = useDispatch();


    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            console.log('User signed out!')
            dispatch({type: types.authLogout})
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
                userData.push({id: doc.id, ...doc.data()});
            })
            setData(userData)
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        })

    }

    const Header = () => {
        return ( 
        <View style={styles.addButton}>
            <Pressable style={styles.button} onPress={() => goToAdd()}> 
                <Add 
                    width={40}
                    height={40}
                /> 
            </Pressable>
            <Pressable style={styles.signOutButton} onPress={() => {handleSignOut();}}>
                <Text style={styles.signOutText}>Log out</Text>
            </Pressable>
        </View>
        )
    }

    
    useEffect(() => {
        navigation.addListener('focus', () => {
            setData([])
            getData()
        })
    }, [])

  return (
    <View style={styles.container}>
            <FlatList
            ListHeaderComponent={Header}
            data={data}
            ListEmptyComponent={NoSubscriptions}
            keyExtractor={(item:any) => item.id}
            renderItem={({item}:any) => {
                return (
                    <Subscription 
                        navigation={navigation}
                        id={item.id}
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
        marginTop: 40
    },
    button: {
        backgroundColor: '#d1682c',
        padding: 12,
        margin: 15,
        borderRadius: 18,
    },

    signOutButton: {
        backgroundColor: '#c74d32',
        padding: 10,
        width: 100,
        height: 50,
        marginTop: 20,
        marginLeft: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 20,
        shadowColor: '#52006A',
    },

    signOutText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
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
        flexDirection: 'row',
    }
})

export default Dashboard