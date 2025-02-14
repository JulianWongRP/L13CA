import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Detail = ({ navigation, route }) => {
    const {
        town,
        block,
        street_name,
        flat_type,
        storey_range,
        floor_area_sqm,
        flat_model,
        lease_commence_date,
        remaining_lease,
        resale_price,
    } = route.params;

    return (
        <View style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Icon name="home" size={35} style={{marginRight:10, color:'#007BFF'}} />
                <Text style={styles.title}>Flat Details</Text>

            </View>

            <Text style={styles.text}>Town: <Text style={styles.value}>{town}</Text></Text>
            <Text style={styles.text}>Block: <Text style={styles.value}>{block}</Text></Text>
            <Text style={styles.text}>Street Name: <Text style={styles.value}>{street_name}</Text></Text>
            <Text style={styles.text}>Flat Type: <Text style={styles.value}>{flat_type}</Text></Text>
            <Text style={styles.text}>Storey Range: <Text style={styles.value}>{storey_range}</Text></Text>
            <Text style={styles.text}>Floor Area (sqm): <Text style={styles.value}>{floor_area_sqm}</Text></Text>
            <Text style={styles.text}>Flat Model: <Text style={styles.value}>{flat_model}</Text></Text>
            <Text style={styles.text}>Lease Commence Date: <Text style={styles.value}>{lease_commence_date}</Text></Text>
            <Text style={styles.text}>Remaining Lease: <Text style={styles.value}>{remaining_lease}</Text></Text>
            <Text style={styles.text}>Resale Price: <Text style={[styles.value, {color: "red"}]}>${resale_price}</Text></Text>
            <Button title="Back"
                    onPress={()=>{
                        navigation.navigate("Home");
                    }}
            />
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',

    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    value: {
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Detail;
