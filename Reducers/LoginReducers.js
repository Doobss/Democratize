import React, { useReducer, useContext, useState } from 'react'
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

export const FIELD = 'FIELD'
export const LOGIN = 'LOGIN'
export const FETCHLOGIN = 'FETCH-LOGIN'
export const FETCHHOME = 'FETCH-HOME'
export const SENSCREEN = 'SEN-SCREEN'

//called in homeScreen useEffect for giving a user a token for auto logins and updates the timer whenever they go to the homescreen
persistUsers = async (user, persistedUsers) => {



    if (persistedUsers.length === 0) {
        const firstToken = [{ userName: user.userName, timeLoggedIn: Date.now() }]
        const firstUser = JSON.stringify(firstToken)
        await AsyncStorage.setItem('persistedUsers', firstUser)

    }
    else if (persistedUsers.filter(item => item.userName === user.userName ? item : null).length !== 0) {

        const checkForDuplicateUser = persistedUsers.filter((item) => {
            return (
                item.userName === user.userName ? (
                    item.timeLoggedIn = Date.now()
                )
                    : (
                        item
                    )
            )
        }
        )
        const updatedLoginTime = JSON.stringify([...checkForDuplicateUser])
        await AsyncStorage.setItem('persistedUsers', updatedLoginTime)
    }
    else {
        const newToken = { userName: user.userName, timeLoggedIn: Date.now() }
        console.log([...persistedUsers, newToken])
        const updatedUsers = JSON.stringify([...persistedUsers, newToken])

        await AsyncStorage.setItem('persistedUsers', updatedUsers)
    }

}


//function for checking data stored in Async
checkStoredData = async (dataType) => {
    const response = await AsyncStorage.getItem(dataType)
    alert(response)

}

addPost = async (state, id) => {
    const newPost = {
        userName: state.currentUser.userName,
        repId: id,
        body: state.screenState.postInput,
        uuid: uuidv4()
    }
    const oldPostsStr = JSON.stringify([...state.posts, newPost])
    await AsyncStorage.setItem('posts', oldPostsStr)
}

addRep = async (state, action) => {
    const updatedUser = { ...state.currentUser, userReps: [...state.currentUser.userReps] }
    //alert(JSON.stringify(updatedUser))
    const oldUsers = state.users.filter(item => item.userName !== state.currentUser.userName)

    const updated = JSON.stringify([oldUsers, updatedUser])

    await AsyncStorage.setItem('users', updated)

    //alert(JSON.stringify(updatedUser))
    //return updatedUser
}

addUser = async (state, users) => {
    const newUser = {
        userName: state.userName,
        name: state.name,
        district: state.district,
        password: state.password,
        userState: state.userState,
        userReps: [{ repId: (state.userState.abbrev + 'Sen1'), repType: 'senator', },
        { repId: (state.userState.abbrev + 'Sen2'), repType: 'senator' },
        { repId: (state.userState.abbrev + 'Con' + state.district), repType: 'congress', }]
    }
    // const newUserStr = JSON.stringify(newUser)
    const oldUsersStr = JSON.stringify([...users, newUser])
    alert(oldUsersStr)
    await AsyncStorage.setItem('users', oldUsersStr)
}

checkForDuplicateReps = (state, repId) => {
    const rep = state.currentUser.userReps.filter((item) => item.repId === repId)
    return (rep)
}





export const loginReducer = (draft, action) => {

    'FETCH-REGISTER'

    switch (action.type) {

        case 'ADD-DAY': {
            draft.date = new Date('10/18/2019')
            return;
        }

        case 'SUBTRACT-DAY': {
            draft.date = new Date('10/14/2019')
            return;
        }

        case 'ADDPOST': {
            if (draft.screenState.postInput !== '') {
                addPost(draft, action.idPayload)
                draft.screenState.newPost = true

            } else {
                alert('passwords do not match')
            }
            return;
        }

        case 'ADD-REP': {
            const duplicates = checkForDuplicateReps(draft, action.payload)
            if (duplicates == false) {
                draft.currentUser.userReps.push({ repId: action.payload, repType: action.payload2 })
                addRep(draft, action)
            }
            else {
                alert('already a followed Rep')
            }
            return;
        }

        case 'ADDUSER': {
            if (draft.screenState.password === draft.screenState.confirmPassword) {
                addUser(draft.screenState, draft.users)
                draft.screenState.registerSuccses = true
                action.navigate
            } else {
                alert('passwords do not match')
            }
            return;
        }

        case 'CLEAR-CURRENT-USER': {
            draft.currentUser = ''
            return;
        }

        case 'FIELD': {
            draft.screenState[action.field] = action.value;
            return;
        }

        case 'FETCH-LOGIN': {
            draft.users = action.payload
            draft.screenState = action.screenState
            return;
        }

        case 'FETCH-NEW-POSTS': {
            draft.posts = action.payload
            return;
        }

        case 'FETCH-HOME': {
            draft.reps = action.payload
            draft.posts = action.payload2
            draft.stateArray = action.payload3
            draft.bills = action.payload4
            draft.calendar = action.payload5
            //draft.loading = true
            return;
        }

        case 'FETCH-REGISTER': {
            draft.stateArray = action.payload
            //draft.screenState = action.screenState
            return;
        }

        case 'LOGIN': {
            //alert('called')
            user = action.payload
            if (user.password === draft.screenState.password) {
                draft.loading = true
                draft.currentUser = { ...user }
                draft.screenState.loginSuccses = true
                draft.screenState.password = ''
                draft.screenState.userName = ''
                draft.modalName = ''
                draft.showModal = false
                return
            }
            else {
                alert('Incorrect credentials')
                //alert(user.password)
                draft.screenState.password = ''
                return;
            }
        }

        case 'LOAD-BILLS': {

            draft.Addedbills = action.payload

            return;
        }

        case 'LOGOUT': {
            action.navigate
            draft.currentUser = ''

            return;
        }
        case 'NAVIGATE': {
            draft.screenState.userName = ''
            draft.screenState.password = ''
            draft.screenState.confirmPassword = ''
            draft.screenState.passwordMatch = false
            draft.screenState.checkingPasswords = false
            draft.screenState.district = ''
            draft.screenState.name = ''
            draft.screenState.userState = ''
            draft.screenState.loginSucssesful = false
            action.navigate
            return;
        }

        case 'NEWUSERSTATE': {
            draft.screenState.userState = { abbrev: action.payload1, full: action.payload2 }
            alert(action.payload2 + ' is your state')
            return;
        }

        case 'PERSISTED-LOGIN': {
            draft.currentUser = action.payload
            draft.loginSuccses = true
            draft.loading = true
            return;
        }

        case 'PERSISTED-LOGIN-FAIL': {
            draft.loginSuccses = false
            draft.loading = true
            draft.showModal = false
            return;
        }

        case 'PERSIST': {
            //alert('hi')
            persistUsers(action.user, action.payload)
            return;
        }

        case 'RESET-LOGIN': {
            draft.screenState.loginSuccses = false
            return;
        }

        case 'CHANGELOADING': {
            draft.loading = false
            return;
        }

        case 'SEN-SCREEN': {
            draft.screenState = action.screenState
            return;
        }

        case 'SHOW-BILL-MODAL': {
            draft.showModal = true
            draft.focusedBillId = action.payload
            draft.modalName = action.payload2

            // alert('ran')
            return;
        }

        case 'SHOW-REP-MODAL': {
            draft.showModal = true
            draft.focusedRepId = action.payload
            draft.modalName = action.payload2

            // alert('ran')
            return;
        }

        case 'SHOW-MODAL': {
            draft.showModal = true
            draft.modalName = action.payload
            return;
        }

        case 'SCREEN-LOADED': {
            draft.showModal = false
            draft.loading = false

            return;
        }
        case 'CLOSE-REP-MODAL': {
            draft.showModal = false
            draft.modalName = ''
            draft.focusedRepId = ''
            return;
        }

        case 'CLOSE-LOGIN-MODAL': {
            draft.showModal = false
            draft.screenState.userName = ''
            draft.screenState.password = ''
            draft.screenState.confirmPassword = ''
            draft.screenState.passwordMatch = false
            draft.screenState.checkingPasswords = false
            draft.screenState.district = ''
            draft.screenState.name = ''
            draft.screenState.userState = ''
            draft.screenState.loginSucssesful = false
            draft.modalName = ''
            draft.focusedRepId = ''
            return;
        }

        case 'STORED-DATA': {
            checkStoredData(action.dataType)
            return;
        }
        case 'RESET-LOGIN-IN': {
            draft.screenState.loginSuccses = false
            return;
        }

        default:
            break;

    }
}





    // changeCurrentUser = (newUser, [...usersArray]) => {
    //     const changedUser = usersArray.filter((item) => {
    //         if(item.userName === newUser) {
    //             return(item)
    //         } else{
    //             return('')
    //         }
    //       }
    //     )
    //     if (changedUser.length === 0){
    //         alert('No user register with that username')
    //     }
    //     else{
    //     setState(state => ({...state, currentUser: changedUser[0]}))
    //    }
    // }