import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components'




export default (props) => {
    if (props.size === 'minimal')
        return (
            <MinimalContainer onPress={props.onPress}>
                <MinimalButtonText>{props.ButtonsTitle}</MinimalButtonText>
            </MinimalContainer>
        )

    else if (props.size === 'small')
        return (
            <SmallContainer onPress={props.onPress}>
                <ButtonText>{props.ButtonsTitle}</ButtonText>
            </SmallContainer>
        )
    else if (props.size === 'small' && props.color === 'dark')
        return (
            <SmallDarkContainer onPress={props.onPress}>
                <ButtonDarkText>{props.ButtonsTitle}</ButtonDarkText>
            </SmallDarkContainer>
        )
    else if (props.size === 'large')
        return (
            <TouchableOpacity
                style={styles.Buttons}
                onPress={props.onPress}
            >
                <Text style={styles.TextButtons}>{props.ButtonsTitle}</Text>
            </TouchableOpacity>
        )
    else if (props.type === 'repCard')
        return (
            <TouchableOpacity
                style={styles.Buttons}
                onPress={props.onPress}
            >
                <Text style={styles.TextButtons}>{props.ButtonsTitle}</Text>
                <Text style={styles.TextButtons}>{props.repId}</Text>
            </TouchableOpacity>
        )
    else if (props.color === 'dark')
        return (
            <ContainerDark onPress={props.onPress}>
                <ButtonDarkText>{props.ButtonsTitle}</ButtonDarkText>
            </ContainerDark>
        )
    else
        return (
            <Container onPress={props.onPress}>
                <ButtonText>{props.ButtonsTitle}</ButtonText>
            </Container>
        )
}





const Container = styled.TouchableOpacity`

    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 1px #FFFFFF;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    position: relative;
    margin: 10px;
 
`
const ContainerDark = styled.TouchableOpacity`

    background: rgba(0,0,0, 0);
    width: 280px;
    height: 50px;
    border-radius: 0px;
    border: 1px #171A27;
    box-shadow: 0 5px 15px rgba(0,0,0, 0);
    opacity: .80;
    margin: 10px;
 
`
const MinimalContainer = styled.TouchableOpacity`
    background: rgba(0,0,0, 0.0);
    width: 175px;
    height: 50px;
    border-radius: 0px;
    
    box-shadow: 0 5px 15px rgba(0,0,0, 0.15);
  
    margin: 10px;
`
const SmallContainer = styled.TouchableOpacity`
    background: rgba(0,0,0, 0.0);
    width: 200px;
    height: 50px;
    border-radius: 0px;
    border: 1px #FFFFFF;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.15);
  
    margin: 10px;
`
const SmallDarkContainer = styled.TouchableOpacity`
    background: rgba(0,0,0, 0.0);
    width: 200px;
    height: 50px;
    border-radius: 0px;
    border: 1px #171A27;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.15);
    opacity: .80;
    margin: 10px;
`
const ButtonText = styled.Text`
    flex: 1;
    color: #FFFFFF;
    font-size: 18px;
    margin: 15px;
    text-align: center;
    
`
const ButtonDarkText = styled.Text`
    flex: 1;
    color: #171A27;
    font-size: 18px;
    margin: 15px;
    text-align: center;
    opacity: .80;
`


const MinimalButtonText = styled.Text`
    flex: 1;
    color: #FFFFFF;
    font-size: 20px;
    margin: 15px;
    text-align: center;
`


styles = StyleSheet.create({
    Buttons: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    TextButtons: {
        color: 'green',
        fontSize: 20,
    },
    ButtonsSmall: {
        //color: '#319F29',
        fontSize: 15,
        padding: 10,
        margin: 7,
        backgroundColor: '#319F29',
        borderRadius: 15,
    },
})



//353536