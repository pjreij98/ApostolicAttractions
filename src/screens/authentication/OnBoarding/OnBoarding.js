import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLOURS from '../../../constants/COLOURS'
import LinearGradient from 'react-native-linear-gradient';


const OnBoarding = ({ navigation }) => {
    return (
        <View>
            <StatusBar barStyle='dark-content' backgroundColor={COLOURS.bgLineGradOne} />
            <LinearGradient
                colors={[
                    COLOURS.bgLineGradOne,
                    COLOURS.bgLineGradTwo,
                    COLOURS.bgLineGradThree,
                    COLOURS.bgLineGradFour,
                    COLOURS.bgLineGradFive,
                    COLOURS.bgLineGradSix
                ]}
                style={{ width: '100%', height: '100%' }}>
                <View style={{
                    width: '100%',
                    height: '50%',
                    padding: 16
                }}>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: COLOURS.onBoardCardBG,
                        borderRadius: 20,
                        alignItems: 'center'
                    }}>
                        <Image source={require("../../../images/authentication/StPeterandPaul.jpg")} style={{ width: '300', height: 300, aspectRatio: 1 / 1 }} />
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                    marginBottom: 20,
                }}>
                    <Text
                        style={{
                            fontSize: 36,
                            color: COLOURS.black,
                            fontWeight: '800',
                            letterSpacing: 1,
                            textAlign: 'center',
                        }}
                    >
                        Where traditional believers meet their match.
                    </Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                        activeOpacity={0.8}
                        style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 16,
                            backgroundColor: COLOURS.black,
                            borderRadius: 30
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLOURS.white,
                                fontWeight: '600'
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignIn")}
                        activeOpacity={0.8}
                        style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 16,
                            backgroundColor: 'skyblue',
                            borderRadius: 30,
                            borderWidth: 2,
                            borderColor: COLOURS.white
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLOURS.black,
                                fontWeight: '600'
                            }}
                        >
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 40,
                    }}
                >
                    <Text
                        style={{
                            color: 'gray',
                        }}
                    >
                        By Continuing you agree to the Terms and Conditions
                    </Text>
                </View>
            </LinearGradient>

        </View>
    )
}

export default OnBoarding