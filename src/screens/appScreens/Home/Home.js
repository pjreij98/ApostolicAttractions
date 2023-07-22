import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLOURS from '../../../constants/COLOURS';
import LinearGradient from 'react-native-linear-gradient';
import { signOutUser } from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';
import MatchSwiper from '../../../components/MatchSwiper';
import Geolocation from 'react-native-geolocation-service';
import { getMatchPool } from '../../../controllers/FirestoreController';

const Home = () => {

    const handleSignOut = () => {
        try {
            signOutUser()
            console.log("signed out")
        } catch (error) {
            console.log(error)
        }
    }


    const [matches, setMatches] = useState([])
    const [cardIndex, setCardIndex] = useState(0)
    const [userIdToken, setUserIdToken] = useState("")
    const [location, setLocation] = useState();
    
    const getLocation = () => {
        const options = {
            //won't return until has location
            timeout: 50000,
            enableHighAccuracy: true,
            //can pull cached locations up to a day old
            maximumAge: 86400000
        }
        const callback = (position) => {
            setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        }
        const errorHandler = (err) => {
            //console.log(err)
            setError(err)
        }
        Geolocation.getCurrentPosition(callback, errorHandler, options)
        // console.log(location)
    }
    useEffect(() => {
        async function fetchMatches() {
            try {
                //only get cached pool if not reloading
                if (matches.length === 0) {
                    // const result = await checkCachedMatchPool(userState.firebaseUser.uid)
                    // if (result) {
                        const matchPool = await getCachedMatchPool(userState.firebaseUser.uid)
                        if (matchPool) {
                            setMatches(matchPool)
                        }
                        return
                    // }
                }
                await getPool()
            }
            catch (err) {
                setMatches([])
                setLoading(false)
            }
        }
        if (location) {
            fetchMatches()
            // console.log(location)
            setCardIndex(0)
        }
    }, [location])
    const getPool = async () => {
        try {
            setNoMoreMatches(false)
            // console.log(userState.idToken)
            const matchPool = await getMatchPool(user.uid, location, userIdToken)
            if (matchPool.length === 0) {
                // setNoMoreMatches(true)
                setMatches([])
                // setLocationUpdated(false)
            }
            else {
                // setNoMoreMatches(false)
                setMatches(matchPool)
                // setLocationUpdated(false)
            }
        }
        catch {
            setMatches([])
        }
    }
    const user = auth().currentUser;
    useEffect(async () => {
        await setUserIdToken(user.getIdToken());
    }, [])

    return (
        <View>
            <StatusBar backgroundColor={COLOURS.bgLineGradOne} barStyle='dark-content' />
            <LinearGradient
                colors={[
                    COLOURS.bgLineGradOne,
                    COLOURS.bgLineGradTwo,
                    COLOURS.bgLineGradThree,
                    COLOURS.bgLineGradFour,
                    COLOURS.bgLineGradFive,
                    COLOURS.bgLineGradSix
                ]}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text
                    style={{
                        color: COLOURS.black,
                        fontSize: 20,
                    }}>
                    Welcome
                </Text>
                <Text
                    style={{
                        color: COLOURS.black,
                        fontSize: 40,
                        fontWeight: '700',
                        letterSpacing: 2,
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                    {user.displayName ? user.displayName : "Anonymous User"}
                </Text>
                <MatchSwiper matches={matches} cardIndex={cardIndex} idToken={user.idToken} setFetchMoreMatches={() => {
                    //hack: the server function to get new matches is running before the function to register the match is finished
                    //--> otherwise, if match with user on last card, card will appear again
                    setTimeout(() => setRefreshing(true), 3000)
                }}
                    uid={uid} />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSignOut()}
                    style={{
                        marginTop: 20,
                        backgroundColor: COLOURS.warning,
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                    }}>
                    <Text>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default Home