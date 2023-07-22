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
                    physicalActivity: '',
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

        const res = await axios.post(`http://192.168.5.136:8080/createUser`, params, { withCredentials: true })
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
export async function updateMatchPreferences(uid, preferenceData, token) {
    let params = { uid: uid, token: token };

    const batch = firestore().batch();
    const docRef = firestore()
        .collection('matchPreferences')
        .doc(uid);
//for filter screen, preferenceData for filtering will be the following:
//denomination, age, children, church activity, drink, smoke, physical activity level, education,
    if (preferenceData.partner) {
        batch.update(docRef, { partner: preferenceData.partner });
        params.partner = preferenceData.partner;
    }

    if (preferenceData.level) {
        batch.update(docRef, { level: preferenceData.level });
        params.level = preferenceData.level;
    }

    if (preferenceData.climbingType) {
        batch.update(docRef, { climbingType: preferenceData.climbingType });
        params.climbingType = preferenceData.climbingType;
    }

    if (preferenceData.daysSelected) {
        batch.update(docRef, { daysSelected: preferenceData.daysSelected });
        params.daysSelected = preferenceData.daysSelected;
    }

    if (preferenceData.timesSelected) {
        batch.update(docRef, { timesSelected: preferenceData.timesSelected });
        params.timesSelected = preferenceData.timesSelected;
    }

    if (preferenceData.agesSelected) {
        batch.update(docRef, { agesSelected: preferenceData.agesSelected });
        params.agesSelected = preferenceData.agesSelected;
    }

    if (preferenceData.age) {
        batch.update(docRef, { age: preferenceData.age });
        params.age = preferenceData.age;
    }

    if (preferenceData.sex) {
        batch.update(docRef, { sex: preferenceData.sex });
        params.sex = preferenceData.sex;
    }

    try {
        await batch.commit();
        // const res = await axios.post(`http://localhost:8080/matchPreferences`, params, { withCredentials: true })
        const res = await axios.post(`${SERVER_URL}/matchPreferences`, params, {
            withCredentials: true,
        });

        return true;
        // TODO: save data on server

        // if (res.status == 200) {
        //   return true;
        // } else {
        //   return false;
        // }
    } catch (err) {
        //console.log("error: " + err)
        return true;
    }
}
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
export async function getMatchPool(uid, location, token) {
    try {
        const params = {
            uid: uid,
            location: { longitude: location.longitude, latitude: location.latitude },
            token: token,
        };

        // console.log("IDTOKEN: " + params.token);

        // const res = await axios.post('http://192.168.5.136:8080/matchPool', params, { withCredentials: true })
        const res = await axios.post('http://192.168.68.64:8080/matchPool', params, { withCredentials: true })

        // const res = await axios.post(`${SERVER_URL}/matchPool`, params, {
        //     withCredentials: true,
        // });

        if (res.data.matchPool.length) {
            return res.data.matchPool;
        } else {
            return [];
        }
    } catch (err) {
        return [];
    }
}