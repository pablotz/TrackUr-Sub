import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../../firebase';


const AddNew = ({route, navigation}:any) => {
    const {id, name, image} = route.params;

    const intervals = [
        {label: '1 Month', value: '1 Month'},
        {label: '3 Months', value: '3 Months'},
        {label: '6 Months', value: '6 Months'},
        {label: '12 Months', value: '12 Months'},
        {label: 'Custom', value: 'Custom'}
    ]

    const [endDate, setEndDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showStart, setStartShow] = useState(false);

    const onChangeEnd = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setStartShow(false);
        setEndDate(currentDate);
    };

    const showMode = (currentMode:any) => {
        setStartShow(true);
        setMode(currentMode);
      };
    
    const showDatepicker = () => {
    showMode('date');
    };

    const handleSubs = () => {
        navigation.navigate('Dashboard')
    }

    // Add to subscriptions collection
    const addSubscription = () => {
        db.collection('subscriptions').add({
            user: auth.currentUser.uid,
            platform: id,
            name: name,
            image: image,
            endDate: endDate.getTime()
        })
        .then(() => {
            console.log('Subscription added!')
            handleSubs()
        }).catch((error:any) => {
            console.log(`[CLIENT]: ${error.message}`)
            alert(error.message)
        })
    }

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);

        setEndDate(today);
    }, [])

  return (
    <View style={styles.container}>
        <Pressable style={styles.selectedPlatform} onPress={() => {navigation.goBack()}}> 
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.platformName}>
                <Text style={styles.selected}>Selected Platform</Text>
                <Text style={styles.title}>{name}</Text>
            </View>
        </Pressable>
        <View style={styles.enterData}>
            <View>
                <Text style={styles.endSubscription}>End of the subscription</Text>
                <Pressable style={styles.datePicker} onPress={() => showDatepicker()}> 
                    <Text style={styles.date}>{endDate.toLocaleDateString()}</Text>
                    {showStart && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={endDate!}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChangeEnd}
                        />
                    )}
                </Pressable>
            </View>
            <View>
                {
                    endDate && (
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={styles.endButton} onPress={addSubscription}>
                                <Text style={styles.endTitle}>Add subscription 😎</Text>
                            </Pressable>
                        </View>
                    )
                }
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 5,
        paddingRight: 10,
    },
    selectedPlatform: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 20,
        shadowColor: '#52006A',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 15,
        
    },

    enterData: {
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#52006A',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 15,
        height: '62%',
        
    },

    selected: {
        fontSize: 20,
        fontWeight: '500',
    },

    platformName: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
    },
    endSubscription: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 80,
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#f29a2e',
        padding: 10,
        borderRadius: 15,
    },
    date: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    endButton: {
        marginTop: 100,
        backgroundColor: '#35b557',
        padding: 13,
        width: 250,
        alignItems: 'center',
        borderRadius: 20,
    },

    endTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }
})

export default AddNew