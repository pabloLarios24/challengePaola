import React, { Component } from 'react'
import { View, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { getUserInfo } from '../../common/userInfo';
import { getFilter, post, patch, functionDelete } from '../../API/Services';
import Spinner from 'react-native-loading-spinner-overlay';

//import components
import Header from '../components/headerBar.component'
import Shadow from '../components/dynamicShadow';

//import styles
var fontStyles = require('../styles').fontStyles;
var colors = require('../styles').colors;
var themeClasses = require('../styles').themeClasses;
var dimensions = require('../styles').dimensions;


export default class ProductDetailsView extends Component {
     constructor(props) {
         super(props)
         this._deltaY = new Animated.Value(0)
         this.state={
            editMode:true,
            up:false,
            name:"",
            email:"",
            password: "",
            phoneNumber: "",
            isLoading: false
         }
    }

    componentDidMount(){
        this.init();
    }

    async init(){
        await this.setState({
            isLoading:true
        })
        let { isNew, id } = this.props;
        if(!isNew){
            const user = await getFilter("","", "users",false, id )
            if(user.email){
                this.setState({
                    email: user.email,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    isLoading:false
                })
            }
        }else{
            await this.setState({
                isLoading:false
            })
        }
    }

    async onSave(){

        let { name, password, email, phoneNumber } = this.state;
        let { isRegister } = this.props;
        if(name && password && email && phoneNumber){
            await this.setState({
                isLoading:true
            })
            let getStatus = await  this.checkUser();
            if(getStatus){
                let data = {
                    name,
                    password,
                    email,
                    phoneNumber,
                    createdAt: new Date()
                }
                let res = await post(data,"users");
                if(res.name){
                    Alert.alert(
                        "Exito.", 
                        "Usuario creado con exito.",
                        [
                            {
                                text: "Continuar",
                                onPress: async () => {
                                    if(isRegister){
                                        Actions.pop();
                                    }else{
                                        Actions.reset("ListUsers");
                                    }
                                    await this.setState({
                                        isLoading:false
                                    })
                                }
                            }
                        ]
                    )
                }else{
                    await this.setState({
                        isLoading:false
                    })
                    Alert.alert("Error.", "Error al crear el usuario.")
                }
            }else{
                await this.setState({
                    isLoading:false
                })
                Alert.alert("Error.", "El correo electrónico ya esta en uso.")
            }
        }else{
            Alert.alert("Error.", "Campo vacío.")
        }
    }

    async onEdit(){
        let { name, password, email, phoneNumber } = this.state;
        const { isNew, id } = this.props;
        if(name && password && email && phoneNumber){
            await this.setState({
                isLoading:true
            })
            let getStatus = await  this.checkNewEmail();
            if(getStatus){
                let data = {
                    name,
                    password,
                    email,
                    phoneNumber,
                    createdAt: new Date()
                }
                let res = await patch("users", id, data);
                if(res.name){
                    Alert.alert(
                        "Exito.", 
                        "Usuario modificado con exito.",
                        [
                            {
                                text: "Continuar",
                                onPress: async () => {
                                    Actions.reset("ListUsers");
                                    await this.setState({
                                        isLoading:true
                                    })
                                }
                            }
                        ]
                    )
                }else{
                    Alert.alert("Error.", "Error al crear el usuario.")
                    await this.setState({
                        isLoading:false
                    })
                }
            }
        }else if( name && email && phoneNumber){
            let getStatus = await  this.checkNewEmail();
            if(getStatus){
                let data = {
                    name,
                    email,
                    phoneNumber,
                    createdAt: new Date()
                }
                let res = await patch("users", id, data);
                if(res.name){
                    Alert.alert(
                        "Exito.", 
                        "Usuario modificado con exito.",
                        [
                            {
                                text: "Continuar",
                                onPress: async () => {
                                    Actions.reset("ListUsers");
                                    await this.setState({
                                        isLoading:true
                                    })
                                }
                            }
                        ]
                    )
                }else{
                    Alert.alert("Error.", "Error al crear el usuario.")
                    await this.setState({
                        isLoading:false
                    })
                }
            }
        }else{
            Alert.alert("Error.", "Campo vacío.")
            await this.setState({
                isLoading:false
            })
        }
    }

    async onDelete(){
        const { id } = this.props;
        const myId = await getUserInfo()
        if(myId === id){
            await this.setState({
                isLoading:true
            })
            Alert.alert(
                "Alerta.", 
                "¿Estás seguro de eliminarte a ti mismo?",
                [
                    {
                        text: "Eliminar",
                        onPress: async () => {
                            await functionDelete("users", id);
                            await this.setState({
                                isLoading:false
                            })
                            Actions.reset("Login");
                        }
                    },
                    {
                        text: "Cancelar",
                        onPress: async () => {
                            await this.setState({
                                isLoading:false
                            })
                        }
                    }
                ]
            )
        }
        else{
            await this.setState({
                isLoading:true
            })
            Alert.alert(
                "Alerta.", 
                "¿Estás seguro de eliminar al usuario?",
                [
                    {
                        text: "Eliminar",
                        onPress: async () => {
                            await functionDelete("users", id);
                            await this.setState({
                                isLoading:false
                            })
                            Actions.reset("ListUsers");
                        }
                    },
                    {
                        text: "Cancelar",
                        onPress: async () => {
                            await this.setState({
                                isLoading:false
                            })
                        }
                    }
                ]
            )
        }

    }

    async checkNewEmail(){
        let res = await getFilter("email",this.state.email, "users")
        console.log(Object.keys(res).length)
        if(Object.keys(res).length > 1){
            return false
        }
        return true
    }

    async checkUser(){
        let res = await getFilter("email",this.state.email, "users")
        if(!Object.keys(res).length){
           return true
        }else{
            return false
        }
    }

    render() {
        let { isNew, isRegister } = this.props;
        return (
            <View style={themeClasses.container}>
                 <Spinner
                    visible={this.state.isLoading}
                    textContent={'Cargando...'}
                />
                <Header isBack title={ isNew ? "Nuevo usuario" : "Editar usuario"}/>  
                <View style={styles.subContain} >
                    <ScrollView
                        contentContainerStyle={{paddingBottom:moderateScale(100)}}
                    >
                        <View style={{flex:1, ...themeClasses.fullCenterAlign}}>
                            <View style={[styles.containerImage, themeClasses.fullCenterAlign]}>
                                <Icon style={[styles.iconImage]} name={"user"} type={"Feather"} />
                            </View>
                            <TextInput 
                                style={[styles.input, { marginTop: moderateScale(40) }]}
                                placeholder={"Nombre"}
                                onChangeText={(name)=>{
                                    this.setState({name})
                                }}
                                value={this.state.name}
                            />
                            <TextInput 
                                style={[styles.input]}
                                placeholder={"Correo electrónico"}
                                onChangeText={(email)=>{
                                    this.setState({email})
                                }}
                                textContentType={"emailAddress"}
                                autoCapitalize={"none"}
                                value={this.state.email}
                            />
                            <TextInput 
                                style={[styles.input]}
                                placeholder={"Teléfono"}
                                onChangeText={(phoneNumber)=>{
                                    this.setState({phoneNumber})
                                }}
                                textContentType={'telephoneNumber'}
                                keyboardType={'phone-pad'}
                                value={this.state.phoneNumber}
                            />
                            <TextInput 
                                style={[styles.input]}
                                placeholder={"Contraseña"}
                                onChangeText={(password)=>{
                                    this.setState({password})
                                }}
                                textContentType={"password"}
                                autoCapitalize={"none"}
                                secureTextEntry={true}
                            />

                            <View style={[themeClasses.horizontalRow, { justifyContent: 'space-around' }]}>
                                <TouchableOpacity
                                    style={{marginTop: moderateScale(80)}}
                                    onPress={()=>{
                                        if(isNew){
                                            Actions.pop()
                                        }else{
                                            this.onDelete()
                                        }
                                    }}
                                >
                                    <Shadow removeTop style={styles.buttonsLogin}>
                                    <Text style={[fontStyles.h3Bold]}>{ isNew ? "Cancelar" : "Eliminar" }</Text>
                                    </Shadow>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{marginTop: moderateScale(80)}}
                                    onPress={()=>{
                                        if(isNew){
                                            this.onSave()
                                        }else{
                                            this.onEdit()
                                        }
                                    }}
                                >
                                    <Shadow removeTop style={{...styles.buttonsLogin, backgroundColor: colors.green}}>
                                        <Text style={[fontStyles.h3Bold]}>{ isRegister ? "Registrarme" : "Guardar" }</Text>
                                    </Shadow>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    subContain:{
        left: 0,
        right: 0,
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderRadius:moderateScale(30),
        paddingHorizontal:moderateScale(20)
    },
    containerImage:{
        width:moderateScale(120),
        alignItems:"center",
        height:moderateScale(120),
        borderRadius:moderateScale(60),
        backgroundColor:colors.green,
        marginTop: moderateScale(40)
    },
    iconImage:{
        fontSize:moderateScale(50),
    },
    input:{
        width: moderateScale(240),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        ...themeClasses.fullCenterAlign,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .2 ,
        shadowRadius: moderateScale(10),
        backgroundColor: colors.white,
        ...fontStyles.h3Bold,
        color: colors.secondaryBlack,
        marginTop:moderateScale(20),
        paddingLeft: moderateScale(10)
    },
    buttonsLogin:{
        width: moderateScale(140),
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
})
