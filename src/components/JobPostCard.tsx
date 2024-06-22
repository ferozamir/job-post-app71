import React, { useEffect, useState } from 'react'
import CustomText from './CustomText'
import { Image, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


interface JobPostCardProps {
    jobDetails: {
        title: string;
        skillsList: string[];
        description: string,
        jobType: string,
        education: string,
        experienceLevel: string,
        created: string;
    };
}


const JobPostCard: React.FC<JobPostCardProps> = ({ jobDetails }) => {

    const [starMarked, setStarMarked] = useState(false);
    const [jobPostTime, setJobPostTime] = useState('')

    useEffect(() => {
        const calculateTimeDifference = (created: string) => {
            const createdDate = new Date(created);
            const currentDate = new Date();
            const differenceInMs = currentDate.valueOf() - createdDate.valueOf();
            const differenceInMinutes = Math.floor(differenceInMs / 1000 / 60);
            return differenceInMinutes;
        };

        if (jobDetails.created) {
            const timeDifference = calculateTimeDifference(jobDetails.created);
            let timeAgo: string = '';

            if (timeDifference <= 59) {
                timeAgo = `${timeDifference} minutes ago`;
            } else if (timeDifference > 59 && timeDifference < 1440) {
                timeAgo = `${Math.floor(timeDifference / 60)} hours ago`
            } else {
                timeAgo = `${Math.floor(timeDifference / 1440)} days ago`
            }

            setJobPostTime(timeAgo);
        }
    }, [])

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Image source={require('./../assets/images/PreviewInJob.png')} />
                </View>
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '84%',
                    }}>
                        <View>
                            <CustomText style={styles.title}>{jobDetails?.title ? jobDetails?.title : 'Jr. Front-End Developer'}</CustomText>
                            <CustomText style={styles.subtitle}><CustomText style={{ fontFamily: 'Poppins-Bold' }}>Kickstarter,</CustomText> in Manchester</CustomText>
                        </View>
                        <Icon name={starMarked ? 'star' : "star-o"} size={16} style={{ marginTop: 3 }} onPress={() => setStarMarked(!starMarked)} />
                    </View>
                    <CustomText style={styles.timePosted}>Posted {jobPostTime ? jobPostTime : '6 hours ago'}</CustomText>
                    <View style={styles.tags}>
                        {jobDetails?.skillsList?.map((skill: string, index: number) => (
                            <View style={styles.tag} key={index}>
                                <CustomText style={styles.tagText}>{skill}</CustomText>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                {jobDetails?.description && (
                    <>
                        <CustomText style={styles.sectionTitle}>Job Description</CustomText>
                        <CustomText style={styles.description}>
                            {jobDetails?.description ? jobDetails?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel tincidunt risus. Vestibulum commodo tincidunt interdum. Quisque porta odio eu urna maximus dapibus. Praesent ut fringilla arcu. Nam sed imperdiet diam.'}
                        </CustomText>
                    </>
                )}
                <CustomText style={styles.sectionTitle}>Requirements</CustomText>
                <CustomText style={styles.description}>
                    Suspendisse dignissim neque sed lorem mattis tristique. Cras viverra elit quis dolor sagittis, sed bibendum nisl consectetur. Pellentesque at imperdiet ante. Phasellus id felis eget leo scelerisque posuere quis sed est. Nam maximus dui vel quam vehicula, eget scelerisque velit lacinia. Quisque sodales eleifend urna. Fusce eu efficitur lectus, et fermentum dui.
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderColor: '#AFB0B6',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        justifyContent: 'flex-start',
        backgroundColor: '#FF6F61',
        borderRadius: 8,
        marginRight: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222741'
    },
    subtitle: {
        fontSize: 12,
        color: '#888',
    },
    tags: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#E0F7FA',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    tagText: {
        fontSize: 10,
        color: '#62636A',
    },
    timePosted: {
        fontSize: 10,
        color: '#75788D',
        marginBottom: 4
    },
    body: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        marginBottom: 8,
        color: '#222741'
    },
    description: {
        fontSize: 12,
        color: '#75788D',
        marginBottom: 16,
        lineHeight: 18
    },
})

export default JobPostCard