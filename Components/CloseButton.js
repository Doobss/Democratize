import React, { useContext, useEffect } from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { DispatchContext } from '../Store/AppContext';
import { withNavigation } from 'react-navigation';

export default CloseButton = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} hitSlop={{ top: 5, bottom: 5, left: 5, right: 5, }} >
            <Container>
                <CloseButtonContainer>
                    <CloseButtonImage source={require('../assets/CloseIcon.png')} />
                </CloseButtonContainer>
            </Container>
        </TouchableOpacity>

    )
}




const CloseButtonTouchable = styled.TouchableOpacity`

`
const Container = styled.View`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: white;
    overflow: visible;
    box-shadow: 5px 5px 5px rgba(0,0,0, .5);
`
const CloseButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const CloseButtonImage = styled.Image`
    width: 75%;
    height: 75%    
`