import React, { useContext, useEffect } from 'react'
import { ImageBackground, View, Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components'
import { DispatchContext, StateContext } from '../Store/AppContext';
import { withNavigation } from 'react-navigation';



const Posts = (props) => {

    const [, dispatch] = useContext(DispatchContext)
    const [state,] = useContext(StateContext)

    return (
        <PostContainer>
            <RepImage source={require('../assets/LightThemeBG.png')}>
                <Title> {props.body} </Title>
            </RepImage>
        </PostContainer>
    )
}

export default withNavigation(Posts)

//onPress={() => props.navigation.navigate('SenatorScreen', { repId: props.repId })}

// () => dispatch({
//     type: 'ADD-REP',
//     payload: props.repId,
//     payload2: props.repType,
// })

const PostContainer = styled.TouchableHighlight`
    background: white;
    width: 320px;
    height: 150px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 5px 5px rgba(0,0,0, 0.5);
`
const RepImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    
    overflow: hidden;
`

const Title = styled.Text`
    color: #171A27;
    font-size: 20px;
    font-weight: bold;
    margin-top: 175px;
    margin-left: 10px;
`