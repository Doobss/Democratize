import React, {useState, useContext, useEffect} from 'react'
import {View, Text,StyleSheet, TextInput, ScrollView, Modal, TouchableHighlight, FlatList} from 'react-native'
import Buttons from '../Components/Buttons';
import { AppContext, DispatchContext } from '../Store/AppContext'
import FlatListItem from './FlatListItem'


export default  MyModal = (props) => {

    const [state, dispatch] = useContext(DispatchContext)

    const stateArrayRendered = state.stateArray

    test = () => {
        // const test = stateArrayRendered.map(item => {
        //     alert(item.full)
        // })
        alert(stateArrayRendered.length)
    }

    


            return(
                        <View style = {styles.modalContainer}>
                           <FlatList
                                data= {state.stateArray}
                                renderItem = {({item, index,}) => (
                                   
                                   <FlatListItem
                                    id = {item.abbrev}
                                    title = {item.full}
                                    onPress = {() => dispatch({
                                        type: 'NEWUSERSTATE',
                                        payload1:item.abbrev,
                                        payload2: item.full
                                    })}
                                    />
                                )}
                                    keyExtractor = {(item, index) => item.abbrev + index}
                                    />
                    
                            <Buttons 
                                size = {'small'}
                                ButtonsTitle='Close Modal'
                                onPress = {() => dispatch({
                                    type: 'CLOSE-MODAL',
                                })}
                                />
                                 <Buttons 
                                //size = {'small'}
                                ButtonsTitle='test'
                                onPress = {() =>test()}
                                />
                         </View>
                
            )
        

  }       


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1/2,
        backgroundColor: '#131300',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 100,
        // height: 25,
      },
      text: {
          color : 'white',
          fontSize: 17
      },
      textInput: {
        margin: 10,
        padding: 15,
        height: 50,
        width: 250,
        borderColor: 'dimgrey',
        borderWidth: 1,
        backgroundColor: '#353536',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 17,
        color: 'white',
    },
    textInputNonMatchingPasswords: {
        margin: 10,
        padding: 15,
        height: 50,
        width: 250,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: '#353536',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 17,
        color: 'white',
    },textInputMatchingPasswords: {
        margin: 10,
        padding: 15,
        height: 50,
        width: 250,
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: '#353536',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 17,
        color: 'white',
    },

})