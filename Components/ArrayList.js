import React, {useContext, useState} from 'react'
import {FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation';
import { AppContext } from '../Store/AppContext';


class ArrayList extends React.PureComponent {
    constructor(props){
        super(props)
       this.state = {
           itemName: (new Map()),
           userState: this.props.data.currentUser.userState,
           userDistrict: this.props.data.currentUser.district,
           
       }
    }
 
   renderItem = ( {item} ) => {
    const {senator, id } = item
    const {userState, userDistrict} = this.state
    const {navigation: {navigate}} = this.props
   // alert(senator)
    return (
       <MyListItem
            style = {styles.Buttons}
            repState = {userState}
            onPressItem={()=>navigate('SenatorScreen',{senatorName: senator,repId: id})}
            senator={senator}
            userDistrict ={userDistrict}
    />
    )
}


   render(){
    alert(this.userState)
    const list = this.props.data.reps.senators.filter(item => (item.state === this.userState))
     alert(list[0])
   return (
       <FlatList
       style = {styles.flatList}
       data={list}
       extraData={this.state}
       keyExtractor={(item, index) => item.senator+index.toString()}
       renderItem={this.renderItem}

       />
   )
   }
  }

class MyListItem extends React.PureComponent {
    handlePress = () => {
        this.props.onPressItem(this.props.id)
    }
   
    render(){
        const {senator} = this.props
        const state = this.props.repState
    
if(senator !== '') {
    return(
            <TouchableOpacity 
            style = {styles.Buttons} 
            onPress = {this.handlePress}>
                <Text style = {styles.text}>
                {senator} senator of {state}
                </Text>
            </TouchableOpacity>
        )
    
    }

    }

}


const styles = StyleSheet.create({
    Buttons: {
        padding: 15,
        margin: 10,
        backgroundColor: '#353536',
        borderRadius: 15,
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color : 'white',
        fontSize: 15,
    },
    ButtonsSmall: {
        color : 'white',
        fontSize: 15,
    },
    flatList: {
        flex: 1,
        backgroundColor: '#131315',
        alignContent: 'center',
        width: 250,

    },
})


export default withNavigation(ArrayList)

//353536