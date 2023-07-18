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
                    }}>
                        <Image source={require("../../../images/authentication/notesbg.png")} style={{ width: '100%', aspectRatio: 1 / 1 }} />
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40,
                    marginBottom: 20
                }}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: COLOURS.black,
                            fontWeight: '800',
                            letterSpacing: 1,
                        }}
                    >
                        Simplify Your Notes
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            color: COLOURS.black,
                            fontWeight: '800',
                            letterSpacing: 1,
                        }}
                    >
                        Boost Your Productivity
                    </Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 40,
                    }}
                >
                    <Text
                        style={{
                            color: COLOURS.black,
                        }}
                    >
                        Effortless Note-Taking and Seamless
                    </Text>
                    <Text
                        style={{
                            color: COLOURS.black,
                        }}
                    >
                        Organization for Productivity Enthusiasts
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal: 40,
                    marginTop: 60,
                }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignUp")}
                            activeOpacity={0.8}
                            style={{
                                width: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 16,
                                backgroundColor: COLOURS.white,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '600'
                                }}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignIn")}
                            activeOpacity={0.8}
                            style={{
                                width: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 16,
                                backgroundColor: COLOURS.transparent,
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 10,
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
                                SignIn
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

        </View>
    )
}

export default OnBoarding