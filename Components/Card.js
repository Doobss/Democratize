import React, { useContext, useEffect, useState } from 'react'
import { ImageBackground, View, Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { DispatchContext, StateContext } from '../Store/AppContext';
import { withNavigation } from 'react-navigation';



const Card = (props) => {


    var initalScreenWidth = Dimensions.get('window').width
    const [screenWidth, setScreenWidth] = useState(initalScreenWidth)

    // const [, dispatch] = useContext(DispatchContext)
    // const [state,] = useContext(StateContext)

    return (
        (props.repPic) ? (
            <TouchableOpacity onPress={props.onPress}>
                <Container>
                    <RepImage source={props.repPic}>
                        <Title> {props.repName} </Title>
                        <SubTitle> {props.repState}</SubTitle>
                    </RepImage>
                </Container>
            </TouchableOpacity>
        ) : (
                <TouchableOpacity onPress={props.onPress}>
                    <Container>
                        <RepImage source={require('../assets/AppIcon.png')}>
                            <Title> {props.repName} </Title>
                            <SubTitle> {props.repState}</SubTitle>
                        </RepImage>
                    </Container>
                </TouchableOpacity>
            )
    )

}

export default withNavigation(Card)

// onPress={() => dispatch({
//     type: 'SHOW-REP-MODAL',
//     payload: props.repId
// })}


// () => dispatch({
//     type: 'ADD-REP',
//     payload: props.repId,
//     payload2: props.repType,
// })

const Container = styled.View`
    background: #171A27;
    width: 150px;
    height: 200px;
    border-radius: 5px;
    box-shadow: 0 2px 2px rgba(0,0,0, 0.5);
    
`
const RepImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    /* position: relative;
    z-index: 5; */
`

const Title = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-top: 155px;
    margin-left: 10px;
`
const SubTitle = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin-top: 5px;
    margin-left: 10px;
`