import React from 'react'
import { getUserInfo } from '../../common/userInfo'
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends React.Component{
    constructor(){
        super()
    }

    componentDidMount(){
        this.init()
    }

    async init(){
        const myId = await getUserInfo();
        if(myId){
            Actions.reset("ListUsers")
        }else{
            Actions.reset("Login")
        }
    }

    render(){
        return(
            null
        )
    }
}