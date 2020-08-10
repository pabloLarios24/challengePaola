import React from 'react'
import { View , Alert, StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

//import components 
import Shadow from './dynamicShadow'

//import styles
var colors = require('../styles').colors;
var fontStyles = require('../styles').fontStyles;
var themeClasses = require('../styles').themeClasses;
var dimensions = require('../styles').dimensions;

export default class Header extends React.Component{
    constructor(){
        super()
        this.state={
            isLoading:false,
            isVisible:false
        }
    }

    async logOut(){
        await this.setState({
            isLoading:true
        })
        Alert.alert(
            "Cerrar sesión.", 
            "¿Estás seguro de cerrar la sesión?",
            [
                {
                    text: "Continuar",
                    onPress: async () => {
                        await AsyncStorage.clear()
                        await this.setState({
                            isLoading:false
                        })
                        Actions.reset("Login");
                    }
                },
                {
                    text: "Cancelar",
                    onPress: async () => {}
                }
            ]
        )
    }

    render(){
        const { isBack , title  } = this.props;
        return(
            <View>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Cargando...'}
                />
                <Shadow style={styles.container}>
                    <View style={{width:"25%", height:"100%", justifyContent:"center"}}>
                        {
                            isBack ?
                                <TouchableOpacity
                                    onPress={()=>{
                                        Actions.pop()
                                    }}
                                >

                                    <Icon 
                                        type={"FontAwesome5"} 
                                        name="chevron-left" 
                                        style={[styles.icon ]} 
                                    />
                                </TouchableOpacity>
                            :
                                null
                        }
                    </View>
                    <View style={[{width:"50%", height:"100%"}, themeClasses.fullCenterAlign]}>
                        <Text style={fontStyles.h1Bold}>{title ? title : "Challenge"}</Text>
                    </View>
                    <TouchableOpacity 
                        style={{width:"25%", height:"100%", alignItems:"flex-end", justifyContent:"center"}}
                        onPress={()=>{
                            this.logOut()
                        }}
                    >
                        <Icon 
                            type={'Feather'} 
                            name="log-out" 
                            style={[styles.icon , { color: colors.yellow }]} 
                        />
                    </TouchableOpacity>
                </Shadow>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        width: dimensions.width,
        height:moderateScale(60),
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:moderateScale(20), 
        ...themeClasses.paddingTop, 
        backgroundColor: colors.white,
        shadowColor: colors.line,
        shadowOffset: {
            width: 0,
            height:2,
        },
        shadowOpacity: 1 ,
        shadowRadius: moderateScale(5),
    },
    icon:{
        ...fontStyles.h1BoldWhite, 
        fontSize: moderateScale(20),
        color: colors.secondaryGray
    },
    
})