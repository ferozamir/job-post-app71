
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import colors from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DropdownProps {
    data: Array<{ title: string }>;
    placeholder?: string,
    onSelect: (selectedItem: { title: string }, index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, placeholder = 'Select Option..', onSelect }) => {
    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                onSelect(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={[styles.dropdownButtonStyle]}>
                        <Text style={[styles.dropdownButtonTxtStyle, selectedItem?.title ? { color: '#151E26' } : { color: '#ADAEAE' }]}>
                            {(selectedItem && selectedItem.title) || placeholder}
                        </Text>

                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    );
};

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        height: 50,
        backgroundColor: colors.background,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular'
    },
    dropdownButtonArrowStyle: {
        fontSize: 12,
        color: '#95969D'
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        padding: 10
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontWeight: '500',
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

export default Dropdown;
