import { View, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import COLOURS from '../../../constants/COLOURS'
import Ionic from 'react-native-vector-icons/Ionicons'
import { CreateAccountWithEmailAndPassword, SignInWithGoogle, signOutUser } from '../../../utilities/Utilities'

const SignUp = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showErrors, setShowErrors] = useState(false)
    const [errors, setErrors] = useState({})

    const getErrors = (email, password, confirmPassword) => {
        const errors = {}
        if (!email) {
            errors.email = "Please Enter Email";
        } else if (!email.includes("@") || !email.includes(".com")) {
            errors.email = "Please Enter Valid Email";
        }

        if (!password) {
            errors.password = "Enter Password"
        } else if (password.length < 8) {
            errors.password = "Enter Password of 8 characters";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Enter Password"
        } else if (confirmPassword.length < 8) {
            errors.confirmPassword = "Enter correct password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords don't match"
        }


        return errors;
    }

    const handleRegister = () => {
        const errors = getErrors(email, password, confirmPassword);

        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            setErrors(showErrors && errors);
            console.log(errors)
        } else {
            setErrors({});
            setShowErrors(false);
            handleSignIn(email,password);
        }
    }

    const handleSignIn = (email, password) => {
        CreateAccountWithEmailAndPassword({email,password}).then(() => {
            ToastAndroid.show("Account Created", ToastAndroid.SHORT)
        }).catch(err => {
            if(err.code === "auth/email-already-in-use") {
                return setErrors({email: "Email already in use"})
            }
            if(err.code === "auth/invalid-email") {
                return setErrors({email: "Email is invalid"})
            }
            setErrors({})
            setShowErrors(false)
            console.log(err)
        })
    }

    const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={{
                    width: '40%',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    backgroundColor: COLOURS.transparent,
                    borderWidth: 2,
                    borderColor: COLOURS.white,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Ionic
                    name={iconName}
                    style={{
                        fontSize: 26,
                        color: COLOURS.black,
                        marginBottom: 4,
                    }}
                />
                <Text style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    opacity: 0.4
                }}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <LinearGradient
                colors={[
                    COLOURS.bgLineGradOne,
                    COLOURS.bgLineGradTwo,
                    COLOURS.bgLineGradThree,
                    COLOURS.bgLineGradFour,
                    COLOURS.bgLineGradFive,
                    COLOURS.bgLineGradSix
                ]}
                style={{ width: '100%', height: '100%', paddingVertical: 10, paddingHorizontal: 20, }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: COLOURS.white,
                        width: 40,
                        aspectRatio: 1 / 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                        elevation: 4,
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        zIndex: 100,
                    }}>
                    <Ionic
                        name='ios-chevron-back'
                        style={{ fontSize: 20, color: COLOURS.black }}
                    />
                </TouchableOpacity>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        paddingTop: 60,
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginVertical: 20,
                            fontSize: 30,
                            marginBottom: 80,
                            color: COLOURS.black,
                            letterSpacing: 2,
                            fontWeight: '500',
                        }}
                    >
                        Welcome
                    </Text>
                    <View
                        style={{
                            width: '100%',
                        }}>
                        <View
                            style={{
                                width: '100%',
                                marginBottom: 20,
                            }}
                        >
                            <TextInput
                                placeholder='Enter Email'
                                placeholderTextColor={COLOURS.lightText}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={e => setEmail(e)}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    borderRadius: 10,
                                    backgroundColor: COLOURS.white,
                                }}
                            >

                            </TextInput>
                            {errors.email && (
                                <Text style={{ fontSize: 14, color: COLOURS.warning, marginTop: 4, }}>
                                    {errors.email}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginBottom: 20,
                            }}
                        >
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={COLOURS.lightText}
                                keyboardType='visible-password'
                                value={password}
                                onChangeText={e => setPassword(e)}
                                maxLength={15}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    borderRadius: 10,
                                    backgroundColor: COLOURS.white,
                                }}
                            >

                            </TextInput>
                            {errors.password && (
                                <Text style={{ fontSize: 14, color: COLOURS.warning, marginTop: 4, }}>
                                    {errors.password}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginBottom: 20,
                            }}
                        >
                            <TextInput
                                placeholder='Confirm Password'
                                placeholderTextColor={COLOURS.lightText}
                                keyboardType='visible-password'
                                value={confirmPassword}
                                onChangeText={e => setConfirmPassword(e)}
                                maxLength={15}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    borderRadius: 10,
                                    backgroundColor: COLOURS.white,
                                }}
                            >

                            </TextInput>
                            {errors.confirmPassword && (
                                <Text style={{ fontSize: 14, color: COLOURS.warning, marginTop: 4, }}>
                                    {errors.confirmPassword}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={() => handleRegister()}
                            activeOpacity={0.8}
                            style={{
                                width: '100%',
                                paddingVertical: 14,
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLOURS.accent,
                                borderRadius: 10,
                                elevation: 8,
                                shadowColor: COLOURS.accent,
                            }}>
                            <Text
                                style={{
                                    color: COLOURS.white,
                                    fontSize: 16,

                                }}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 30,
                    }}>
                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0.5, y: 1.0 }}
                            colors={['#000090', '#000090', '#ffffff00']}
                            style={{
                                flex: 1,
                                paddingVertical: 1.4,
                                borderRadius: 100,
                            }}
                        >

                        </LinearGradient>
                        <Text style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            opacity: 0.4,
                            marginHorizontal: 18,
                        }}>
                            Or continue with
                        </Text>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            colors={['#000090', '#000090', '#ffffff00']}
                            style={{
                                flex: 1,
                                paddingVertical: 1.4,
                                borderRadius: 100,
                            }}
                        >

                        </LinearGradient>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            marginTop: 10,
                            marginBottom: 40,
                        }}
                    >
                        <LoginWithIcon iconName='logo-google' onPress={() => SignInWithGoogle().then(() => ToastAndroid.show("Signed In With Google", ToastAndroid.SHORT))} buttonTitle='Google' />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('SignIn')}
                        style={{
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: COLOURS.black
                        }}>
                            Already a member? 
                            <Text style={{
                                color: COLOURS.accent
                            }}>
                                Sign In Now
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 60,
                            width: '100%',
                            backgroundColor: COLOURS.transparent,
                        }}
                    >

                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    )
}

export default SignUp