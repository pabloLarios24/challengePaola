import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { Icon } from 'native-base';
import { getFilter } from '../../API/Services';
import { setUserInfo } from '../../common/userInfo';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

//import components
import Shadow from '../components/dynamicShadow'

//import styles
var fontStyles = require('../styles').fontStyles;
var colors = require('../styles').colors;
var themeClasses = require('../styles').themeClasses;
var dimensions = require('../styles').dimensions

export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            isLoading: false
        }
    }

    async login(){
        await this.setState({
            isLoading:true
        })
        let res = await getFilter("email",this.state.email, "users")
        if(Object.keys(res).length){
            let id = Object.keys(res);
            if(res[id].password === this.state.password){
                console.log(id[0])
                setUserInfo(id[0])
                Actions.reset("ListUsers")
            }else{
                Alert.alert("Error", "Correo o contraseña incorrectos")
            }
        }else{
            Alert.alert("Error", "Correo o contraseña incorrectos")
        }
        await this.setState({
            isLoading:false
        })
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Cargando...'}
                />
                <View style={styles.containerImage}>
                    <Image source={require("../../images/laguna-5413412_1920.jpg")} style={{width: "100%", height: "100%"}} />
                </View>
                <View style={styles.containerOver}>
                    <Shadow style={styles.subContainerOver}> 
                        <View style={styles.containerIconsHeader}>
                            <Icon type={"FontAwesome"} name={"close"} style={[styles.iconHeader]} />
                            <Icon type={"Entypo"} name={"help"} style={[styles.iconHeader, { fontSize: moderateScale(22)}]} />
                        </View>
                        <View style={styles.container}>
                            <Text style={fontStyles.h1Bold}>Iniciar sesión en<Text style={[fontStyles.h1Bold, { fontStyle: "italic" }]}> Challenge</Text></Text>
                            <Text style={[fontStyles.h2, { textAlign: "center", marginTop: moderateScale(10) }]}>Bienvenidos a mi Challenge</Text>
                        </View>
                        {/* Buttons */}
                        <View style={styles.container}>
                            <TextInput 
                                style={styles.input}
                                placeholder={"Correo electrónico"}
                                onChangeText={(email)=>{
                                    this.setState({email})
                                }}
                                textContentType={"emailAddress"}
                                autoCapitalize={"none"}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder={"Contraseña"}
                                onChangeText={(password)=>{
                                    this.setState({password})
                                }}
                                secureTextEntry={true}
                                textContentType={"password"}
                            />
                            <TouchableOpacity
                                style={{marginTop: moderateScale(80)}}
                                onPress={()=>{
                                    this.login()
                                }}
                            >
                                <Shadow removeTop style={styles.buttonsLogin}>
                                    <Text style={[fontStyles.h3Bold, { marginLeft: moderateScale(10) }]}>Iniciar sesión</Text>
                                </Shadow>
                            </TouchableOpacity>
                            
                        </View>
                        {/* Footer */}
                        
                        <TouchableOpacity 
                            style={[styles.container, { marginTop: moderateScale(20) }]}
                            onPress={()=>{
                                Actions.EditUser({
                                    isRegister: true,
                                    isNew: true
                                })
                            }}
                        >
                            
                            <Text style={fontStyles.h2Bold}>¿Aún no tines cuenta?<Text style={[fontStyles.h2, { color: colors.secondaryBlue }]}> Registrate</Text></Text>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    containerImage:{
        width: "100%", 
        height: dimensions.height * .25, 
        overflow: "hidden",
    },
    containerOver:{
        position:"absolute",
        marginTop: dimensions.height * .22,
    },
    subContainerOver:{
        width: dimensions.width,
        height: dimensions.height * .75,
        borderRadius: moderateScale(20),
        shadowColor: colors.line,
        shadowOffset: {
            width: 0,
            height:0,
        },
        shadowOpacity: 1 ,
        shadowRadius: moderateScale(2),
        justifyContent:"flex-start"
    },
    iconHeader:{
        color:colors.secondaryBlue,
        fontSize: moderateScale(25)
    },
    iconButton:{
        color:colors.white,
        fontSize: moderateScale(20)
    },
    containerIconsHeader:{
        width:"100%", 
        flexDirection:"row", 
        ...themeClasses.marginHorizontal, 
        justifyContent:"space-between",
        marginTop: moderateScale(10)
    },
    container:{
        width:"100%", 
        ...themeClasses.fullCenterAlign, 
        ...themeClasses.marginHorizontal, 
        marginTop: moderateScale(30)
    },
    buttonsLogin:{
        width: moderateScale(240),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        ...themeClasses.fullCenterAlign,
        flexDirection:"row",
        shadowColor: colors.line,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1 ,
        shadowRadius: moderateScale(10),
        backgroundColor: colors.white
    },
    input:{
        width: moderateScale(220),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        ...themeClasses.fullCenterAlign,
        shadowColor: colors.line,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1 ,
        shadowRadius: moderateScale(10),
        backgroundColor: colors.white,
        ...fontStyles.h3Bold,
        color: colors.secondaryBlack,
        marginTop:moderateScale(20),
        paddingLeft: moderateScale(10)
    }
})