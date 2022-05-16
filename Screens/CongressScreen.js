import React, {useContext, useState}   from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import { withNavigation } from 'react-navigation'
import Buttons from '../Components/Buttons'
import { AppContext, DispatchContext } from '../Store/AppContext';

export default  CongressScreen = (props) => {

    const passedRepId = props.navigation.getParam('repId', 'no dis')


    const[state, dispatch] = useContext(DispatchContext)
    
    const[repScreenState, setRepScreenState] = useState({
            
            
            congressState: {},
    })

    
    
    const currentCongressPerson = state.reps.congressData.reduce((acc , item) => item.repId === passedRepId ? item : acc )
        return(
            <View style = {styles.container}>
              <Buttons
                    ButtonsTitle = {'Back Home'}
                    onPress = {() => props.navigation.goBack()}
                />
                <Text style = {styles.text}> {state.currentUser.name} </Text>
                <Text style = {styles.text}> {currentCongressPerson.rep} </Text>
                <Text style = {styles.text}> {currentCongressPerson.bio} </Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131315',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
          color : 'white',
          fontSize: 17
      },

})