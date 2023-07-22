import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Tile } from 'react-native-elements'
import { FastImage } from 'react-native-fast-image'

const { width, height } = Dimensions.get('screen')

export default function Card(props) {

    return (
        <Tile
            key={props.uid}
            imageProps={{ source: { uri: props.profilePicURL } }}
            imageContainerStyle={{ flex: 1 }}
            ImageComponent={FastImage}
            activeOpacity={0.9}
            title={`${props.name}, ${props.age}\n${props.hometown}`}
            titleStyle={{ bottom: 75, color: 'white', fontWeight: '900' }}
            containerStyle={{ backgroundColor: 'white', width: width * .88, height: height * .60, borderRadius: 15 }}
            onPress={() => {
                const params = {
                    matchID: props.uid,
                }
                props.navigate(params)
            }}
        >
            <View style={{ backgroundColor: 'white', bottom: 60, height: 1 }}>
                <Text style={{ fontSize: 18 }}>
                    {props.showInfo ? props.education : null}
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {props.showInfo ? props.work : null}
                </Text>
            </View>
        </Tile>
    )
}
