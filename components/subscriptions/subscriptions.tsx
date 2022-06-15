import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useEffect} from 'react'

const Subscription = ({name, endDate, image}:any) => {

    const [date, setDate] = useState(new Date(endDate));
    const [timeLeft, setTimeLeft] = useState("");
    const [danger, setDanger] = useState("");

    function getFormatedStringFromDays(numberOfDays: number) {
        var years = Math.floor(numberOfDays / 365);
        var months = Math.floor(numberOfDays % 365 / 30);
        var days = Math.floor(numberOfDays % 365 % 30);
    
        var yearsDisplay = years > 0 ? years + (years == 1 ? " year, " : " years, ") : "";
        var monthsDisplay = months > 0 ? months + (months == 1 ? " month, " : " months, ") : "";
        var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
        defineDanger(yearsDisplay + monthsDisplay + daysDisplay);
        setTimeLeft(yearsDisplay + monthsDisplay + daysDisplay);
    }

    const defineDanger = (left: string) => {
        if (left.includes("year") || left.includes("years")) {
            setDanger("success");
        } else if (left.includes("month") || left.includes("months")) {
            setDanger("warning");
        } else if (left.includes("day") || left.includes("days")) {
            setDanger("danger");
        } 
    }

    useEffect(() => {
        let today: any = new Date();
        let end: any = new Date(endDate);
        const oneDay = 24 * 60 * 60 * 1000; 
        const diffDays = Math.round(Math.abs((today - end) / oneDay));
        getFormatedStringFromDays(diffDays);

    },[])

  return (
    <Pressable>
        <View style={styles.styleContainer}>
            <View style={styles.imageContainer}>
                <Image source={{uri: image}} style={styles.img} />
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.monthsContainer}>
                    <Text style={styles.subText}>Ends</Text>
                    <Text style={styles.subText}>{date.toLocaleDateString()}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                    {
                        danger === "danger" ? (
                            <Text style={styles.textDanger}>{timeLeft}</Text>
                        )
                        :
                        danger === "warning" ? (
                            <Text style={styles.textWarning}>{timeLeft}</Text>
                        )
                        :
                        danger === "success" ? (
                            <Text style={styles.textSuccess}>{timeLeft}</Text>
                        )
                        :
                        null
                    }
                </View>
            </View>    
        </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    styleContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        marginTop: 20,
        width: 370,
        height: 185,
        borderRadius: 15,
        elevation: 20,
        shadowColor: '#dea05f',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 5,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        color: '#000',
        marginBottom: 10,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    monthsContainer:{
        alignItems: 'flex-end',
    },
    dataContainer: {
        flexDirection: 'column',
        width: '65%',

    },
    subText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
    },
    textSuccess: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        backgroundColor: '#35b557',
        borderRadius: 5,
        padding: 7,
    },
    textWarning: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        backgroundColor: '#FFCC00',
        borderRadius: 5,
        padding: 7,
    },
    textDanger: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        backgroundColor: '#df4759',
        borderRadius: 5,
        padding: 7,
    }



})

export default Subscription