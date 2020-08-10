import React from 'react'
import {View,Text,TouchableOpacity, StyleSheet} from 'react-native'
import {moderateScale} from 'react-native-size-matters'
import { Icon } from 'native-base';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

//import componentes
import Shadow from './dynamicShadow'

//import styles
var fontStyles = require('../styles').fontStyles;
var colors = require('../styles').colors;
var themeClasses = require('../styles').themeClasses;
var dimensions = require('../styles').dimensions;

const ProductDetails = ({ name, email, createdAt, id }) =>{
    return(
        <View style={{margin:moderateScale(10)}}>
            <Shadow removeTop 
                style={{
                    ...styles.container,
                    height: moderateScale(100),
                    backgroundColor: colors.white 
                }}> 
                    <View style={styles.subContainer}>
                        <View style={[styles.containerImage, themeClasses.fullCenterAlign]}>
                            <Icon style={[styles.iconImage]} name={"user"} type={"Feather"} />
                        </View>

                        <View style={styles.containerText}>
                            <Text numberOfLines={1} style={[fontStyles.h1Bold, {color: "black"}]} >{name ? name : "N/A"}</Text>
                            <Text style={fontStyles.h3} >{createdAt ? moment(createdAt).format("DD/MM/YYYY").toString() : "N/A"}</Text>
                            <Text style={[fontStyles.h2, {color: "black", marginTop: moderateScale(10)}]}>{email ? email : "N/A"}</Text>
                        </View>

                        <View style={styles.containerIcons}>
                            <TouchableOpacity 
                                style={styles.containerIcon} 
                                onPress={()=>{
                                    Actions.EditUser({
                                        id: id,
                                        isNew: false
                                    })
                                }}
                            >
                                <Icon style={styles.icon} name={"edit-2"} type={"Feather"} />
                            </TouchableOpacity>
                        </View>
                    </View>
            </Shadow>
        </View>
    )
}

export default ProductDetails;


let styles = StyleSheet.create({
    container:{
        shadowColor: colors.line,
        shadowOffset: {
            width: moderateScale(5),
            height: moderateScale(10),
        },
        shadowOpacity: 1 ,
        shadowRadius: moderateScale(10),
        width:dimensions.width * .95, 
        height:moderateScale(100), 
        borderRadius:moderateScale(10),
    },
    subContainer:{
        height:"100%", 
        width:"100%", 
        flexDirection:"row", 
        paddingVertical:moderateScale(10)
    },
    containerSubTitle:{
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        padding: moderateScale(5)
    },
    containerImage:{
        width:moderateScale(80),
        alignItems:"center",
        height:moderateScale(80),
        borderRadius:moderateScale(10),
        backgroundColor:colors.green,
        marginLeft:moderateScale(10)
    }, 
    containerText:{
        width:moderateScale(180),
        height:moderateScale(80),
        justifyContent:"center",
        marginLeft:moderateScale(10)
    },
    containerIcons:{
        width:moderateScale(70),
        height:moderateScale(80),
        alignItems:"center"
    },
    containerIcon:{
        width:moderateScale(25),
        height:moderateScale(25),
        borderRadius:moderateScale(12.5),
        backgroundColor: colors.yellow,
        marginBottom:moderateScale(10),
        ...themeClasses.fullCenterAlign
    },
    icon:{
        fontSize:moderateScale(14),
        color: colors.white
    },
    iconImage:{
        fontSize:moderateScale(50),
    }

})