import React, {useContext, useState, useEffect} from 'react'
import {FlatList, TouchableOpacity, Text, StyleSheet, View, TextInput} from 'react-native'
import {  DispatchContext } from '../Store/AppContext';
import Buttons from '../Components/Buttons'



export default PostEditScreen  = (props) => {

    const [state, dispatch] = useContext(DispatchContext)

    const data = props.navigation.getParam('body', 'no data')
    const repId = props.navigation.getParam('repId', 'no id')
    const uuid = props.navigation.getParam('uuid', 'no uuid')
    const[mounted, setMounted] = useState(false)

    const[editState, setEditState] = useState({

        textInput : data,
    })



    handleTextInputChange = (text) => {
        setEditState(editState => ({...editState, textInput: text}))
    }

    editPost = (text, id) => {
        setState(state => ({...state, currentUser: {...user, posts: [...userPosts, {repId: repId, data: text, uuid: uuid},]}}))
    }

    test = () => {
        alert(uuid)
    }

    const user = state.currentUser
    const userPosts = [...state.currentUser.posts]

//if(mounted === true){
    return(
        <View style = {styles.container}>
           
            <Text style = {styles.text}> {user.name} </Text>

            <TextInput style = {styles.textInput}
                placeholder = {data}
                onChangeText = {(text) => handleTextInputChange(text)}
                value = {editState.textInput}
                //onEndEditing
                />
                 {/* <Buttons
                ButtonsTitle = {'Edit'}
                onPress = {() => editPost(editState.texttInput , id)}   
                 />
        */}
                <Buttons
                ButtonsTitle = {'Test'}
                onPress = {() => test()}
                />
                  <Buttons
                    ButtonsTitle = {'Back'}
                    onPress = {() => props.navigation.goBack()}
                />
        </View>
    )
// }
// else{
//     return(
//     <View style = {styles.container}>
//         <Text style = {styles.text}> {user.name} </Text>
//     </View>
//     )
// }


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

})