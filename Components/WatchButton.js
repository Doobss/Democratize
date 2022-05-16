import React, { useContext, useEffect } from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'


export default FollowButton = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} >
            <Container>
                <WatchButtonContainer>
                    <WatchButtonImage source={require('../assets/follow.png')} />
                </WatchButtonContainer>
            </Container>
        </TouchableOpacity>

    )
}




const Container = styled.View`
    height: 30px;
    width: 120px;
    border-radius: 20px;
    background-color: white;
    overflow: visible;
`
const WatchButtonContainer = styled.View`
    flex: 1;
    
    align-items: center;
    justify-content: center;
`
const WatchButtonImage = styled.Image`
    height: 20px;
    width: 70px;
`