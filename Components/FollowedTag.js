import React, { useContext, useEffect } from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'


export default FollowTag = (props) => {

    return (props.followedRep ? (
        <Container>
            <WatchButtonContainer>
                <WatchButtonImage source={require('../assets/followed.png')} />
            </WatchButtonContainer>
        </Container>
    ) : (
            <Container />
        )
    )
}




const Container = styled.View`
    height: 25px;
    width: 100px;
    border-radius: 20px;
    
    overflow: hidden;
`
const WatchButtonContainer = styled.View`
    flex: 1;
    background-color: white;
    align-items: center;
    justify-content: center;
`
const WatchButtonImage = styled.Image`
    height: 25px;
    width: 100px
    
`