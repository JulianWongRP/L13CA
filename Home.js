    import React, { useState, useEffect } from 'react';
    import { FlatList, StatusBar, Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
    import RNPickerSelect from 'react-native-picker-select';
    import Icon from 'react-native-vector-icons/FontAwesome5';
    import {Audio} from 'expo-av';

    let originalData = [];

    const Home = ({ navigation }) => {
        const [mydata, setMydata] = useState([]);
        const [searchText, setSearchText] = useState("");
        const [selectedTown, setSelectedTown] = useState("");
        const [selectedFlat, setSelectedFlat] = useState("");
        const [selectedPrice, setSelectedPrice] = useState();
        // const [mySound, setMySound] = useState();

        useEffect(() => {
            fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=10000")
                .then((response) => response.json())
                .then((myJson) => {
                    if (myJson.result.records) {
                        const records = myJson.result.records;
                        if (originalData.length < 1) {
                            originalData = records;
                            setMydata(records);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }, []);

        const applyFilters = () => {
            let filteredData = originalData;

            if (searchText) {
                filteredData = filteredData.filter((item) =>
                    item.street_name.toUpperCase().includes(searchText.toUpperCase())
                );
            }

            if (selectedTown) {
                filteredData = filteredData.filter((item) =>
                    item.town.includes(selectedTown)
                );
            }

            if (selectedFlat) {
                filteredData = filteredData.filter((item) =>
                    item.flat_type.includes(selectedFlat)
                );
            }

            if (selectedPrice) {
                const price = parseInt(selectedPrice); // Convert input to number
                filteredData = filteredData.filter((item) => {
                    const resalePrice = parseInt(item.resale_price); // Parse resale_price to a number
                    return resalePrice <= price; // Filter based on the selected price
                });
            }


            setMydata(filteredData);
        };

        const FilterDataBySearch = (value) => {
            setSearchText(value);
        };

        const FilterDataByTown = (value) => {
            setSelectedTown(value);
        };

        const FilterDataByFlat = (value) => {
            setSelectedFlat(value);
        };

        const FilterDataByPrice = (value) => {
            setSelectedPrice(value);
        };

        useEffect(() => {
            applyFilters();
        }, [selectedTown, selectedFlat, selectedPrice, searchText]);

        // async function playSound() {
        //     const soundfile = require('./578369__nomiqbomi__double-blink.mp3');
        //     const {sound} = await Audio.Sound.createAsync(soundfile);
        //     setMySound(sound);
        //     await sound.playAsync();
        // }
        //
        // useEffect(() => {
        //     return mySound ? () => {
        //         console.log('unloading sound');
        //         mySound.unloadAsync();
        //     }
        //     : undefined;
        // }, [mySound]);

        const renderItem = ({ item }) => {
            return (

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Detail", {
                            month: item.month,
                            town: item.town,
                            block: item.block,
                            street_name: item.street_name,
                            flat_type: item.flat_type,
                            storey_range: item.storey_range,
                            floor_area_sqm: item.floor_area_sqm,
                            flat_model: item.flat_model,
                            lease_commence_date: item.lease_commence_date,
                            remaining_lease: item.remaining_lease,
                            resale_price: item.resale_price,
                        });
                        // playSound(); // Ensure this is called after navigation
                    }}
                    style={styles.dataContainer} // Apply the style for data container
                >
                    <Icon name="home" size={25} style={styles.icon} />
                    <Text style={styles.streetName}>  {item.street_name}</Text>
                    <Text style={styles.flatType}>{item.flat_type}</Text>
                </TouchableOpacity>
            );
        };

        return (

            <View style={styles.pageContainer}>
                <StatusBar />
                <Text style={styles.pageTitle}>Resale flat prices based on registration date from Jan-2017 onwards</Text>
                <Text style={styles.sectionTitle}>Search By Street Name:</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by street name"
                    onChangeText={(text) => setSearchText(text)} // Update the search text
                    value={searchText} // Bind the search text value
                />
                <Text style={styles.sectionTitle}> Filter By Resale Price:</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by resale price"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        setSelectedPrice(text); // Update state with numeric value
                    }}
                />


                <Text style={styles.sectionTitle}>Filter by Town:</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => FilterDataByTown(value)}
                        items={[
                            { label: "*Click to reset*", value: "" },
                            { label: "JURONG WEST", value: "JURONG WEST" },
                            { label: "SENGKANG", value: "SENGKANG" },
                            { label: "WOODLANDS", value: "WOODLANDS" },
                            { label: "PUNGGOL", value: "PUNGGOL" },
                            { label: "TAMPINES", value: "TAMPINES" },
                            { label: "YISHUN", value: "YISHUN" },
                            { label: "BEDOK", value: "BEDOK" },
                            { label: "HOUGANG", value: "HOUGANG" },
                            { label: "ANG MO KIO", value: "ANG MO KIO" },
                            { label: "BUKIT MERAH", value: "BUKIT MERAH" },
                            { label: "CHOA CHU KANG", value: "CHOA CHU KANG" },
                            { label: "TOA PAYOH", value: "TOA PAYOH" },
                            { label: "BUKIT BATOK", value: "BUKIT BATOK" },
                            { label: "BUKIT PANJANG", value: "BUKIT PANJANG" },
                            { label: "KALLANG/WHAMPOA", value: "KALLANG/WHAMPOA" },
                            { label: "PASIR RIS", value: "PASIR RIS" },
                            { label: "GEYLANG", value: "GEYLANG" },
                            { label: "QUEENSTOWN", value: "QUEENSTOWN" },
                            { label: "SEMBAWANG", value: "SEMBAWANG" },
                            { label: "JURONG EAST", value: "JURONG EAST" },
                            { label: "BISHAN", value: "BISHAN" },
                            { label: "CLEMENTI", value: "CLEMENTI" },
                            { label: "SERANGOON", value: "SERANGOON" },
                            { label: "CENTRAL AREA", value: "CENTRAL AREA" },
                            { label: "MARINE PARADE", value: "MARINE PARADE" },
                            { label: "BUKIT TIMAH", value: "BUKIT TIMAH" },
                        ]}
                    />
                </View>

                <Text style={styles.sectionTitle}>Filter by Flat:</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => FilterDataByFlat(value)}
                        items={[
                            { label: "*Click to reset*", value: "" },
                            { label: "4 ROOM", value: "4 ROOM" },
                            { label: "3 ROOM", value: "3 ROOM" },
                            { label: "5 ROOM", value: "5 ROOM" },
                            { label: "EXECUTIVE", value: "EXECUTIVE" },
                            { label: "2 ROOM", value: "2 ROOM" },
                            { label: "1 ROOM", value: "1 ROOM" },
                            { label: "MULTI-GENERATION", value: "MULTI-GENERATION" },
                        ]}
                    />
                </View>



                <View style={styles.flatListcontainer}>
                    <FlatList data={mydata} renderItem={renderItem} maxToRenderPerBatch={10}/>
                </View>
            </View>

        );
    };

    // Define styles using StyleSheet
    const styles = StyleSheet.create({
        pageContainer: {
            flex: 1,
            backgroundColor: '#f0f0f0',
            padding: 20,

        },
        pageTitle: {
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#007BFF',
            textAlign: 'center',
        },
        sectionTitle: {
            fontSize: 13,
            fontWeight: 'bold',
            marginVertical: 10,
            color: '#333',
        },
        searchInput: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#fff',
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: '#ccc',

            borderRadius: 5,
            backgroundColor: '#fff',
        },
        flatListcontainer:{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10
        },
        dataContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginBottom: 15,
            backgroundColor: '#fff',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ddd',
        },

        icon: {
            marginRight: 10,
            color: '#007BFF',
        },
        streetName: {
            fontSize: 16,
            fontWeight: 'bold',
            flex: 1,
        },
        flatType: {
            fontSize: 14,
            color: '#555',
        },
    });

    export default Home;
