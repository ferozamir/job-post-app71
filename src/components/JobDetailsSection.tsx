
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Button, Chip, HelperText } from 'react-native-paper';
import colors from '../colors';
import CustomText from './CustomText';
import Dropdown from './Dropdown';

interface Props {
    setCurrentStep: (index: number) => void
    setJobDetails: (details: any) => void
}

const JobDetailsSection: React.FC<Props> = ({ setCurrentStep, setJobDetails }) => {

    const jobTypes = [{ title: 'Full-Time' }, { title: "Part-Time" }, { title: 'Contract' }]
    const educationList = [{ title: 'BS Computer Science' }, { title: "BS Software Engineering" }, { title: 'BS Information Technology' }, { title: 'BS Data Science' }]
    const experienceLevelList = [{ title: '1 Year' }, { title: "2 Years" }, { title: '3 Years' }, { title: '4 Years+' }]

    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [jobType, setJobType] = useState('');
    const [education, setEducation] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [skillsList, setSkillsList] = useState<string[]>([]);

    const addSkill = () => {
        if (skills.trim()) {
            setSkillsList([...skillsList, skills.trim()]);
            setSkills('');
        }
    };

    const handleGetStarted = () => {

        if (!jobTitle) {
            Alert.alert('Please Enter a Job Title');
            return;
        }

        if (!description) {
            Alert.alert('Please Enter a Job Descroption.')
            return;
        }

        setJobDetails({
            title: jobTitle,
            description: description,
            skillsList: skillsList,
            jobType: jobType,
            education: education,
            experienceLevel: experienceLevel,
        });
        setCurrentStep(2);
    }

    useEffect(() => {
        // For this project I didn't find any need to use the use Effect Hook. 
        // Because No Data Retrieval Required on Component Load

        return () => {
            // Used while unmounting component 
        }
    }, [])

    return (
        <View style={styles.container}>
            <CustomText style={styles.sectionTitle}>Job Title</CustomText>
            <TextInput
                style={styles.input}
                placeholder="Enter job title"
                placeholderTextColor="#ADAEAE"
                value={jobTitle}
                onChangeText={text => setJobTitle(text)}
            />

            <CustomText style={styles.sectionTitle}>Description</CustomText>
            <View>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    multiline
                    placeholder="Your job description"
                    placeholderTextColor="#ADAEAE"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    maxLength={1500}
                />
                <HelperText type="info" style={styles.descLength} children={`${description.length}/1500`}>
                    { }
                </HelperText>
            </View>
            <CustomText style={styles.sectionTitle}>Skills</CustomText>
            <View style={styles.skillsContainer}>
                <TextInput
                    style={styles.skillInput}
                    placeholder="Type skill"
                    placeholderTextColor="#ADAEAE"
                    value={skills}
                    onChangeText={text => setSkills(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={addSkill}>
                    <Text style={{ color: '#fff', fontSize: 26, fontWeight: '300' }}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.skillsChips, skillsList?.length > 0 && { marginVertical: 8 }]}>
                {skillsList.map((skill, index) => (
                    <Chip
                        key={index}
                        style={styles.chip}
                        onClose={() => setSkillsList(skillsList.filter((s, i) => i !== index))}
                    >
                        {skill}
                    </Chip>
                ))}
            </View>

            <CustomText style={styles.sectionTitle}>Job Type</CustomText>

            <View style={styles.dropdownContainer}>
                <Dropdown data={jobTypes} placeholder='Select Job Type' onSelect={(selectedItem, index) => setJobType(selectedItem.title)} />
            </View>

            <CustomText style={styles.sectionTitle}>Education</CustomText>

            <View style={styles.dropdownContainer}>
                <Dropdown data={educationList} placeholder='Select Education' onSelect={(selectedItem, index) => setEducation(selectedItem.title)} />
            </View>


            <CustomText style={styles.sectionTitle}>Experience Level</CustomText>

            <View style={styles.dropdownContainer}>
                <Dropdown data={experienceLevelList} placeholder='Select Experience Level' onSelect={(selectedItem, index) => setExperienceLevel(selectedItem.title)} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <CustomText style={styles.buttonText}>Get Started</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 14,
        marginVertical: 8,
        color: '#040607',
        fontFamily: 'Poppins-Bold'
    },
    input: {
        marginBottom: 16,
        backgroundColor: colors.background,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    textArea: {
        height: 307,
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    descLength: {
        color: '#ADAEAE',
        position: 'absolute',
        bottom: 26,
        right: 4,
        fontSize: 12,
        letterSpacing: -0.2
    },
    skillsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    skillInput: {
        width: '100%',
        marginBottom: 0,
        backgroundColor: colors.background,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 8,
        fontFamily: 'Poppins-Regular'
    },
    addButton: {
        position: 'absolute',
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        right: 7,
        top: "9%"
    },
    skillsChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 4,
        backgroundColor: '#CFFCE6'
    },
    buttonContainer: {
        borderTopColor: '#AFB0B6',
        borderTopWidth: 0.5,
        width: '110%',
        paddingHorizontal: 16,
        marginLeft: -18,
        marginTop: 20
    },
    button: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-Bold'
    },
    dropdownContainer: {
        marginBottom: 10
    }

});

export default JobDetailsSection