import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export async function createUserDocument(uid, token) {
    try {
        await firestore()
            .collection('users')
            .doc(uid)
            .set({
                newUser: true,
                premiumUser: false,
                profile: {
                    aboutMe: '',
                    denomination: '',
                    age: null,
                    children: '',
                    pets: '',
                    drinks: '',
                    smokes: '',
                    churchActivityLevel: '',
                    company: '',
                    education: '',
                    hometown: '',
                    name: {
                        first: '',
                        last: '',
                    },
                    industry: '',
                    jobTitle: '',
                    profilePicURL: null,
                    sex: null,
                    showInfo: false,
                    uid: uid,
                },
                interests: [],
                contactInfo: {
                    phone: null,
                    email: null,
                },
                tokens: [],
                fcmToken: null,
                lastLoggedIn: new Date(),
            });

        await firestore()
            .collection('demographics')
            .doc(uid)
            .set({ age: null, sex: '', industry: '', jobTitle: '' })
            .catch(handleError);

        await firestore()
            .collection('users')
            .doc(uid)
            .collection('chats')
            .doc('threadIDs')
            .set({ chatIDs: [] })
            .catch(handleError);

        await firestore()
            .collection('users')
            .doc(uid)
            .collection('matchPool')
            .doc('potentialMatches')
            .set({ matchUIDs: [] })
            .catch(handleError);

        await firestore()
            .collection('users')
            .doc(uid)
            .collection('matchPool')
            .doc('cachedPool')
            .set({ matchPoolUIDs: [] })
            .catch(handleError);

        await firestore()
            .collection('matchPreferences')
            .doc(uid)
            .set({
                denomination: [],
                profileInvisible: false,
                agesSelected: { min: 18, max: 99 },
                age: null,
            })
            .catch(handleError);

        await firestore()
            .collection('matches')
            .doc(uid)
            .set({ matchUIDs: [] })
            .catch(handleError);

        await firestore()
            .collection('rejects')
            .doc(uid)
            .set({ rejectUIDs: [] })
            .catch(handleError);

        await firestore()
            .collection('blockedLists')
            .doc(uid)
            .set({ blockedUIDs: [] })
            .catch(handleError);

        // await firestore()
        //     .collection('geoDocuments')
        //     .doc(uid)
        //     .set({uid: uid})
        //     .catch(handleError);

        const params = {
            uid: uid,
            token: token,
            params: {
                denomination: "",
                partner: [],
                profileInvisible: false,
                agesSelected: { min: 18, max: 99 },
                age: null,
            }
        }

        const res = await axios.post(`http://192.168.5.136:8080/createUser`, params, { withCredentials: true})
        // const res = await axios.post(`http://10.0.0.199:8080/createUser`, params, { withCredentials: true})
        // const res = await axios.post(`${SERVER_URL}/createUser`, params, {
        //     withCredentials: true,
        // });

        console.log(res)

        return true;
    } catch (err) {
        throw err;
    }
}

const handleError = err => {
    console.log(err);
};

export async function updateProfileInfo(uid, profileData) {
    const batch = firestore().batch();
    const docRef = firestore()
        .collection('users')
        .doc(uid);

    if (profileData.email) {
        batch.update(docRef, { 'contactInfo.email': profileData.email });
    }

    if (profileData.aboutMe) {
        batch.update(docRef, { 'profile.aboutMe': profileData.aboutMe });
    }

    if (profileData.hometown) {
        batch.update(docRef, { 'profile.hometown': profileData.hometown });
    }

    if (profileData.education) {
        batch.update(docRef, { 'profile.education': profileData.education });
    }

    if (profileData.company) {
        batch.update(docRef, { 'profile.company': profileData.company });
    }

    if (profileData.jobTitle) {
        batch.update(docRef, { 'profile.jobTitle': profileData.jobTitle });
    }

    if (profileData.profilePicURL) {
        batch.update(docRef, { 'profile.profilePicURL': profileData.profilePicURL });
    }
    // adding if condition failed to update false value
    if (profileData.showInfo === true || profileData.showInfo === false) {
        batch.update(docRef, { 'profile.showInfo': profileData.showInfo });
    }

    try {
        await batch.commit();
    } catch (err) {
        alert(
            "Error updating your profile. Make sure you're connected to the Internet.",
        );
    }
}