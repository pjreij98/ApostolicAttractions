import React from 'react'
import { Dimensions, Platform } from 'react-native'

import Swiper from 'react-native-deck-swiper'
import Card from './Card'

import { useNavigation } from '@react-navigation/native'

import { addPotentialMatch, rejectPotentialMatch } from '../controllers/FirestoreController'

const { width, height } = Dimensions.get('screen')

export default function MatchSwiper(props) {

    const navigation = useNavigation()

    const navigate = (params) => {
        navigation.navigate('LoggedInScreens', { screen: 'MatchProfileScreen', params: {...params} })
    }    

    const matches = typeof props.matches !== 'undefined' ? props.matches : []
    
    if (matches.length > 0) {

        return (
            <> 
                <Swiper
                    cards={matches}
                    keyExtractor={({uid}) => uid}
                    renderCard={(item) => {
                        return (<Card navigate={navigate} profilePicURL={item?.profilePicURL} name={item?.name?.first} education={item?.education} 
                            hometown={item?.hometown === null ? '' : typeof item?.hometown === 'object' ? item?.hometown?.name : item?.hometown} 
                                work={item?.jobTitle ? ( item?.company ? `${item?.jobTitle} at ${item?.company}` : `${item?.jobTitle}` ) : null } age={item?.age} 
                            uid={item?.uid} showInfo={item?.showInfo}/>)
                        }}
                    backgroundColor='rgba(255, 255, 255, 0.1)'
                    cardHorizontalMargin={10}
                    stackSize={2}
                    stackSeparation={0}
                    useViewOverflow={Platform.OS === 'ios'}
                    cardIndex={props.cardIndex}
                    cardStyle={{height: height*.54, width: width*.85}}
                    cardVerticalMargin={3}
                    onSwipedLeft={(index) => { rejectPotentialMatch(props.uid, matches[index].uid, props.idToken)}} 
                    onSwipedRight={(index) => { addPotentialMatch(props.uid, matches[index].uid, props.idToken)}}
                    onSwipedAll={() => { props.setFetchMoreMatches() }}
                    overlayLabels={{
                    left: {
                        title: 'NOPE',
                        style: {
                        label: {
                            backgroundColor: 'black',
                            borderColor: 'black',
                            color: 'white',
                            borderWidth: 1
                        },
                        wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            marginTop: 30,
                            marginLeft: -30
                        }
                        }
                    },
                    right: {
                        title: 'LIKE',
                        style: {
                        label: {
                            backgroundColor: 'black',
                            borderColor: 'black',
                            color: 'white',
                            borderWidth: 1
                        },
                        wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginTop: 30,
                            marginLeft: 30
                        }
                        }
                    },
                }}
                />     
            </> 
        )
    }

    else {
        return null
    }
}