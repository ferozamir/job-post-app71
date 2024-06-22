import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import colors from '../colors';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import JobPostCard from './JobPostCard';


interface Props {
    setCurrentStep: (index: number) => void
    jobDetails: any
}

const PreviewSection: React.FC<Props> = ({ setCurrentStep, jobDetails }) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [starMarked, setStarMarked] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const updateOrientation = () => {
            const { width, height } = Dimensions.get('window');
            console.log('first')
            setIsLandscape(width > height);
        };

        updateOrientation();

        let dimensionsHandler;
        dimensionsHandler = Dimensions.addEventListener('change', updateOrientation);

        return () => {
            dimensionsHandler.remove();
        };
    }, []);

    const handlePayment = async () => {

        const API_URL = `http://10.0.2.2:3000/jobs`; // You can replace your own API_URL to Test

        const bodyData = {
            ...jobDetails,
            isFavorite: false,
            created: Date.now()
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                Alert.alert('Error', 'Network response was not ok', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                throw new Error('Network response was not ok');
            }


            setTimeout(() => {
                setIsLoading(false);
                setCurrentStep(0);
                navigation.navigate('Posted');
            }, 2000);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            Alert.alert('Error', 'Network error occuured', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            throw new Error('Network response was not ok');
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setCurrentStep(0)}>
                <CustomText><Icon name={'chevron-left'} style={{ fontSize: 12, color: "#95969D" }} /> Back</CustomText>
            </TouchableOpacity>
            <CustomText style={styles.previewText}>This is a preview of what your job post will look like to job seekers.</CustomText>

            <JobPostCard jobDetails={jobDetails} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.paymentButton, { width: isLandscape ? '96%' : '100%' }]} onPress={handlePayment}>
                    <CustomText style={styles.paymentButtonText}>Payment</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        height: '110%'
    },
    previewText: {
        marginBottom: 20,
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        padding: 3,
        textAlign: 'justify'
    },
    buttonContainer: {
        // position: 'absolute'
        borderTopColor: '#AFB0B6',
        borderTopWidth: 0.5,
        width: '109%',
        paddingHorizontal: 16,
        marginLeft: -16
    },
    paymentButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 'auto',
    },
    paymentButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-Bold'
    },
});

export default PreviewSection;
