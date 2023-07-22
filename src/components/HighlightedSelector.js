import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
 //for filter screen, preferenceData for filtering will be the following:
//denomination, age, children, church activity, drink, smoke, physical activity level, education,
export function PartnerSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleMalePartnerSelect} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.malePartnerSelected? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Male
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleFemalePartnerSelect} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.femalePartnerSelected? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Female
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export function DenominationSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleDenominationSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.orthodox? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Orthodox
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleDenominationSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.catholic? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Catholic
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export function EducationSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleEducationSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.hsDiploma? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    HS Diploma
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleEducationSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.tradeSchool? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Trade/Tech School
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleEducationSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.inCollege? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    In College
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleEducationSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.undergradDegree? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Undergrad Degree
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleEducationSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.gradSchool? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Grad School
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleEducationSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.gradDegree? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Graduate Degree
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export function PhysicalActivitySelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handlePhysicalActivitySelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.never? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Never
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handlePhysicalActivitySelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.rarely? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Rarely
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handlePhysicalActivitySelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.sometimes? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Sometimes
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handlePhysicalActivitySelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.often? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Often
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export function DrinkingSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleDrinkingSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.never? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Never
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleDrinkingSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.socially? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Socially
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleDrinkingSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.rarely? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Rarely
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleDrinkingSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.frequently? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Frequently
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export function SmokingSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity onPress={props.handleSmokingSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                justifyContent: 'center', alignItems: 'center', 
                backgroundColor: !props.never? 'transparent' : '#ff056d' }}> 
            <Text style={{ fontWeight: 'bold' }}>
                Never
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.handleSmokingSelector} style={{flex: 1, height: 38, marginRight: 5, 
                justifyContent: 'center', alignItems: 'center', 
                backgroundColor: !props.socially? 'transparent' : '#ff056d'}}>
            <Text style={{ fontWeight: 'bold' }}>
                Socially
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.handleSmokingSelector} style={{flex: 1, height: 38, marginRight: 5, 
                justifyContent: 'center', alignItems: 'center', 
                backgroundColor: !props.rarely? 'transparent' : '#ff056d'}}>
            <Text style={{ fontWeight: 'bold' }}>
                Rarely
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.handleSmokingSelector} style={{flex: 1, height: 38, marginRight: 5, 
                justifyContent: 'center', alignItems: 'center', 
                backgroundColor: !props.frequently? 'transparent' : '#ff056d'}}>
            <Text style={{ fontWeight: 'bold' }}>
                Frequently
            </Text>
        </TouchableOpacity>
    </View>
    )
}
export function ChurchActivity(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleChurchActivitySelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.notActive? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Not Active
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChurchActivitySelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.somewhatActive? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Somewhat Active
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChurchActivitySelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.active? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Every Week
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChurchActivitySelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.extremelyActive? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Multiple Times a Week
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export function ChildrenSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleChildrenSelector} style={{flex: 1, height: 38, marginLeft: 8, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.noKidsButWants? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    No Kids But Wants Kids
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChildrenSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.hasKidsWantMore? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Has Kids Want More
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChildrenSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.hasKidsDoesntWantMore? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Has Kids But Doesn't Want More
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChildrenSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.noKidsButDontWant? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                   No Kids And Does Not Want
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleChildrenSelector} style={{flex: 1, height: 38, marginRight: 5, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.notSure? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                   Not Sure/Open To Kids
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export function SexSelector(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={props.handleMaleSelect} style={{flex: 1, height: 38, marginLeft: 8, 
                    marginRight: 5, justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: !props.maleSelected? 'transparent' : '#ff056d' }}> 
                <Text style={{ fontWeight: 'bold' }}>
                    Male
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleFemaleSelect} style={{flex: 1, height: 38, marginRight: 8, 
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: !props.femaleSelected? 'transparent' : '#ff056d'}}>
                <Text style={{ fontWeight: 'bold' }}>
                    Female
                </Text>
            </TouchableOpacity>
        </View>
    )
}