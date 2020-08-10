import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { getFilter } from '../../API/Services';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

//import components
import Header from '../components/headerBar.component'
import CardUser from '../components/cardUser.component';


//import styles
var fontStyles = require('../styles').fontStyles;
var colors = require('../styles').colors;
var themeClasses = require('../styles').themeClasses;
var dimensions = require('../styles').dimensions;



export default class ListPages extends Component {
     constructor(props) {
         super(props)
         this.state={
             users: null,
             isLoading: false
         }
    }

    componentDidMount(){
        this.init()
    }

    async init(){
        await this.setState({
            isLoading:true
        })
        let users = await getFilter("", "", "users", true)
        if(users){
            if(Object.keys(users).length){
                this.setState({
                    users,
                    isLoading:false
                })
            }else{
                await this.setState({
                    isLoading:false
                })
            }
        }else{
            await this.setState({
                isLoading:false
            })
        }
    }

    render() {
        return (
            <View style={[themeClasses.container]}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Cargando...'}
                />
                <Header title={"Usuarios"}/>
                <View style={{width:"100%"}}>
                    <ScrollView
                        contentContainerStyle={{paddingBottom:moderateScale(100), width:"100%"}}
                    >
                        {/* Products */}
                        <View style={{marginTop:moderateScale(20), width:"100%", flexDirection:"row",  flexWrap:"wrap"}}>
                            {
                                this.state.users ?
                                    Object.keys(this.state.users).length ?
                                        Object.keys(this.state.users).map((item)=>{
                                            return(
                                                <CardUser 
                                                    name={this.state.users[item].name} 
                                                    email={this.state.users[item].email} 
                                                    createdAt={this.state.users[item].createdAt} 
                                                    id={item}  
                                                />
                                            )
                                        })
                                    :
                                        null
                                :
                                    null
                            }
                        
                        </View>

                    </ScrollView>
                    
                    <TouchableOpacity 
                        style={styles.flotingButton} 
                        onPress={()=>{
                            Actions.EditUser({
                                isNew: true
                            })
                        }}
                    >
                        <Icon style={styles.iconPlus} type={'Feather'} name={'plus'} />
                    </TouchableOpacity>

                </View>
        </View>
        );
    }
}


let styles = StyleSheet.create({
    flotingButton:{
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        backgroundColor: colors.green,
        position: "absolute",
        top: dimensions.height - moderateScale(120),
        right: moderateScale(10),
        ...themeClasses.fullCenterAlign
    },
    iconPlus:{
        fontSize: moderateScale(22),
        color: colors.white
    }
})
