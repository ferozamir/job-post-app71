import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
import colors from '../colors';

interface LoaderProps {
    visible: boolean;
    size?: 'small' | 'large';
    color?: string;
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ visible, size = 'large', color = colors.primary, text }) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size={size} color={color} />
                    {text && <Text style={styles.loadingText}>{text}</Text>}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#000',
    },
});

export default Loader;
