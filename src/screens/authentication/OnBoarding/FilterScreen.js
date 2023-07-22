import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast'
import IconLoader from 'react-native-vector-icons/MaterialCommunityIcons'
import { PartnerSelector } from '../../../components/HighlightedSelector'

IconLoader.loadFont()

import { useFocusEffect } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'


import AvailabilitySelector from '../../components/AvailabilitySelector'
import TimePicker from '../../components/TimePicker'

import { useSession } from '../../controllers/Hooks'

import { getMatchPreferences, updateMatchPreferences } from '../../controllers/FirestoreController'

import BackArrow from '../../components/BackArrow'
import Button from '../../components/RopedInButton'

import { Picker } from 'react-native-wheel-pick'

import messaging from '@react-native-firebase/messaging'

const { width, height } = Dimensions.get('window')

export default function FilterScreen({navigation, route}) {

  const ageRange = require('../../assets/ageRange.js').ageRange

  const [initialPreferencesState, setInitialPreferencesState] = useState()

  const [partnerUpdated, setPartnerUpdated] = useState(false)
  const [levelUpdated, setLevelUpdated] = useState(false)
  const [typeUpdated, setTypeUpdated] = useState(false)
  const [agesUpdated, setAgesUpdated] = useState(false)


  const [showMinAgePicker, setShowMinAgePicker] = useState(false)
  const [showMaxAgePicker, setShowMaxAgePicker] = useState(false)

  const [minAge, setMinAge] = useState()
  const [maxAge, setMaxAge] = useState()

  const userState = useSession()

  const [malePartnerSelected, setMalePartnerSelected] = useState(false)
  const [femalePartnerSelected, setFemalePartnerSelected] = useState(false)

  
  const handleMalePartnerSelect = () => {
      setMalePartnerSelected(!malePartnerSelected)
      setPartnerUpdated(true)
  }

  const handleFemalePartnerSelect = () => {
      setFemalePartnerSelected(!femalePartnerSelected)
      setPartnerUpdated(true)
  }

 

  
  const setUI = () => {
    //for filter screen, preferenceData for filtering will be the following:
//denomination, age, children, church activity, drink, smoke, physical activity level, education,

    if (initialPreferencesState.partner.includes('male')) {
      setMalePartnerSelected(true)
    }

    if (initialPreferencesState.partner.includes('female')) {
      setFemalePartnerSelected(true)
    }

    


    setMinAge(initialPreferencesState.agesSelected.min)
    setMaxAge(initialPreferencesState.agesSelected.max)

   
  }

  const getUpdatedPreferencesState = () => {

   
    
    let partnerPreference = []

    if (partnerUpdated) {

      if (malePartnerSelected) {
        partnerPreference.push("male")
      }
  
      if (femalePartnerSelected) {
        partnerPreference.push("female")
      }    

    }

    }

  

    const updatedPreferencesState = {

     
      partner: partnerUpdated ? partnerPreference : false,

      
      agesSelected: agesUpdated ? { min: minAge, max: maxAge } : false

    }
  
    return updatedPreferencesState

  }

  //alternate icon: 'filter-list' 'material'
  //https://oblador.github.io/react-native-vector-icons/

  const submitData = async () => {

    const updatedPreferencesState = getUpdatedPreferencesState()

    const result = await updateMatchPreferences(userState.firebaseUser.uid, updatedPreferencesState, userState.idToken.IDToken)

    if (result) {
      return
    }

    else {
      
      alert("Error updating your preferences. Make sure you're connected to the Internet.")
      
    }

  }

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      switch (remoteMessage.data.messageType) {
        case 'match': 
          Toast.showWithGravity('You have a new match!', Toast.LONG, Toast.TOP)
          break
        case 'chat': 
          Toast.showWithGravity(`You have a new message from ${remoteMessage.data.name}!`, Toast.LONG, Toast.TOP)
          break     
        default: break
      }
    })

    return unsubscribe
  }, [])

  useFocusEffect(useCallback(() => {

    (async function setInitialState() {

        const data = await getMatchPreferences(userState.firebaseUser.uid)

        if (data) {
          setInitialPreferencesState(data)
        }

        else {
          alert("Check your Internet connection")
        }
      
    })()
    
  }, [userState.firebaseUser.uid]))

  useEffect(() => {
      if (initialPreferencesState) {
          setUI()
      }
  }, [initialPreferencesState])

  useBackHandler(() => {
      
    if ( partnerUpdated || agesUpdated) {
      submitData()
      route.params.reload(true)
    }

    //navigation.navigate("LoggedInScreens", { screen: 'SwipeScreen'})

  })

  return (
    <View style={ styles.container }>
       <BackArrow navigate={() => {
          
          if ( partnerUpdated || agesUpdated) {
          
              submitData()
              route.params.reload(true)
              
          } 
         navigation.goBack() } }/>
        <View style={styles.header}>
          <Icon name='filter-variant' type='material-community' color='#ff056d'/>
          <Text style={styles.headerText}>
            Filters
          </Text>
        </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text style={ styles.text }>
            Looking for a...
        </Text> 
      </View>
      <View style={ styles.selectorsContainer }>        
        <PartnerSelector malePartnerSelected={malePartnerSelected} handleMalePartnerSelect={handleMalePartnerSelect} 
                  femalePartnerSelected={femalePartnerSelected} handleFemalePartnerSelect={handleFemalePartnerSelect} />
        <ClimbingTypeSelector handleTopRopeSelect={handleTopRopeSelect} topRopeSelected={topRopeSelected}
                  handleBoulderSelect={handleBoulderSelect} boulderSelected={boulderSelected}
                  handleLeadSelect={handleLeadSelect} leadSelected={leadSelected}/>
        <ClimbingLevelSelector beginnerSelected={beginnerSelected} handleBeginnerSelect={handleBeginnerSelect}
                  intermediateSelected={intermediateSelected} handleIntermediateSelect={handleIntermediateSelect}
                  advancedSelected={advancedSelected} handleAdvancedSelect={handleAdvancedSelect}
                  />
          </View>
          <View style={{ flex: 1, bottom: 15 }}>
            <Text style={ styles.text }>
              ... climber
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{flex: 1, marginHorizontal: 20}}>
              <Text style={{fontSize: 18}}>
                Aged...
              </Text>
            </View>
            <TouchableOpacity style={{flex: 1}} onPress={() => {setShowMinAgePicker(true)}}>
              <Text style={{fontSize: 17}}>
                {minAge}
              </Text>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 17}}>
                to
              </Text>
            </View>
            <TouchableOpacity style={{flex: 1}} onPress={() => {setShowMaxAgePicker(true)}}>
              <Text style={{fontSize: 17}}>
                {maxAge}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1}}>
             <Text style={styles.text}>
              Available
            </Text>
          </View>
          <View style={{flex: 1, width: '100%'}}>
            <AvailabilitySelector handleDayPresses={handleDayPresses} daysSelected={daysSelected}/>
          </View>
          <TouchableOpacity onPress={() => {setShowTimePicker(true)}}>
            {/*
            <Text style={{fontSize: 15, paddingTop: 25}}>
              Select a time
            </Text> */}
          </TouchableOpacity>
          <View style={{ flex: 4 }}/>
          { showTimePicker && (
            <TimePicker 
              mSelected={mSelected} tuSelected={tuSelected} wSelected={wSelected} thSelected={thSelected}
              fSelected={fSelected} sSelected={sSelected} suSelected={suSelected}
              mTimeSelected={mTimeSelected} tuTimeSelected={tuTimeSelected} wTimeSelected={wTimeSelected}
              thTimeSelected={thTimeSelected} fTimeSelected={fTimeSelected} sTimeSelected={sTimeSelected}
              suTimeSelected={suTimeSelected}
              visible={showTimePicker}
              setMTimeSelected={setMTimeSelected} setTuTimeSelected={setTuTimeSelected} setWTimeSelected={setWTimeSelected}
              setThTimeSelected={setThTimeSelected} setFTimeSelected={setFTimeSelected} setSTimeSelected={setSTimeSelected}
              setSuTimeSelected={setSuTimeSelected}
              timeUpdated={setTimeUpdated}
              close={() => { setShowTimePicker(false)}}
            />
          )}
          { showMinAgePicker && (
            <Overlay height={height*.4} width={width*.9}
              onBackdropPress={() => { setShowMinAgePicker(false) } }
              animationType="slide"
              transparent={true}
              overlayStyle={styles.overlay}
              borderRadius={30}
              overlayBackgroundColor='rgba(255, 255, 255, 1)'
              isVisible={showMinAgePicker}
              >
              <Picker
                style={{ backgroundColor: 'rgba(255, 255, 255, .8)', width: width*.7, height: height*.25, bottom: 2, borderRadius: 30}}
                selectedValue={minAge}
                pickerData={ageRange}
                onValueChange={value => { 
                  setAgesUpdated(true)
                  setMinAge(parseInt(value)) }}
                itemSpace={30}
              />
              <Button buttonText="Select" submit={() => { setShowMinAgePicker(false)}}/>
            </Overlay>
            )
          }
          { showMaxAgePicker && (
            <Overlay height={height*.4} width={width*.9}
            onBackdropPress={() => { setShowMaxAgePicker(false) } }
            animationType="slide"
            transparent={true}
            overlayStyle={styles.overlay}
            borderRadius={30}
            overlayBackgroundColor='rgba(255, 255, 255, 1)'
            isVisible={showMaxAgePicker}
            >
            <Picker
              style={{ backgroundColor: 'rgba(255, 255, 255, .8)', width: width*.7, height: height*.25, bottom: 2, borderRadius: 30}}
              selectedValue={maxAge}
              pickerData={ageRange}
              onValueChange={value => { 
                setAgesUpdated(true)
                setMaxAge(parseInt(value)) }}
              itemSpace={30}
            />
            <Button buttonText="Select" submit={() => { setShowMaxAgePicker(false)}}/>
          </Overlay>
            )
          }
      </View>
    )    


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center', 
        backgroundColor: 'white'
    },

    header: {
        marginTop: 50,
        flexDirection: 'row',
        flex: 1
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#ff056d'
    },

    overlay: {
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },

    selectorsContainer: {
        flex: 4.5,
        width: '95%', 
        paddingTop: 10
    },

    text: {
        fontSize: 22, 
        color: 'black'
    }
})