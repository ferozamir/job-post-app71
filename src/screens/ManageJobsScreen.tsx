import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import JobPostCard from '../components/JobPostCard';
import colors from '../colors';
import CustomText from '../components/CustomText';
import Loader from '../components/Loader';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { ParamListBase, useNavigation } from '@react-navigation/native';

const ManageJobsScreen = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [jobsPosted, setJobsPosted] = useState([]);

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        const fetchJobsPosted = async () => {

            setIsLoading(true);

            const API_URL = `http://10.0.2.2:3000/jobs`; // You can replace your own API_URL to Test

            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    Alert.alert('Error', 'Network response was not ok', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    throw new Error('Network response was not ok');
                }

                const json = await response.json();

                console.log(json);
                setJobsPosted(json);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                Alert.alert('Error', 'Network error occuured', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                throw new Error('Network response was not ok');
            }

            setIsLoading(false)
        };

        fetchJobsPosted();

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Loader visible={isLoading} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
                    <CustomText style={styles.buttonText}>Post New Job</CustomText>
                </TouchableOpacity>
            </View>

            <CustomText style={{ fontFamily: 'Poppins-Bold', fontSize: 16, textAlign: 'center' }}>Latest Jobs</CustomText>
            <ScrollView style={styles.jobsContainer} contentContainerStyle={{paddingBottom: 30}}>
                {jobsPosted?.map((job, index) => (
                    <JobPostCard jobDetails={job} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        marginVertical: 30
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
        marginHorizontal: 'auto'
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        textAlign: 'center'
    },
    jobsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20
    }
})

export default ManageJobsScreen