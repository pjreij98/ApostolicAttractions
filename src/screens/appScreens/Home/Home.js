import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import COLOURS from '../../../constants/COLOURS'
import LinearGradient from 'react-native-linear-gradient'
import { signOutUser } from '../../../utilities/Utilities'

const Home = () => {
    const handleSignOut = () => {
        try {
            signOutUser()
            console.log("signed out")
        } catch (error) {
            console.log(error)
        }
    }
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
                    user
                </Text>
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