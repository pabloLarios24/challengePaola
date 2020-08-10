//Component shadow by Pablo Larios.

import React, { Component } from 'react'
import { View, ScrollView, Platform} from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { moderateScale } from 'react-native-size-matters';

export class DynamicShadow extends Component {
   constructor(props){
       super(props)
   }
   render() {
       viewStyle = {
           width: this.props.style.width || 0,
           height:  this.props.style.height || 0,
           borderRadius: this.props.style.borderRadius || 0,
           backgroundColor: this.props.style.backgroundColor || 'white' ,
           alignItems: this.props.style.alignItems || "center" ,
           justifyContent: this.props.style.justifyContent || "center" ,
           borderColor: this.props.style.borderColor || "transparent",
           flexDirection: this.props.style.flexDirection || "column",
           marginLeft: this.props.style.marginLeft || 0,
           marginRigth: this.props.style.marginRigth || 0,
           marginHorizontal: this.props.style.marginHorizontal || 0,
           marginBottom: this.props.style.marginBottom || 0,
           flex: this.props.style.flex || 0,
           paddingHorizontal: this.props.style.paddingHorizontal || 0,
           paddingTop: this.props.style.paddingTop || 0,
           overflow: "hidden"
          
       }
       if(this.props.removeTop){
           mainViewStyle = {position: "absolute", alignSelf: "center",top: 0, paddingTop: this.props.style.paddingTop || 0}
           containweViewStyle = {marginRigth: this.props.style.marginRigth || 0, marginTop: this.props.style.marginTop || 0,alignItems: "center", justifyContent: "center", paddingTop: this.props.style.paddingTop || 0}
       }else{
           mainViewStyle = { marginRigth: this.props.style.marginRigth || 0, marginTop: this.props.style.marginTop || 0,position: "absolute", alignSelf: "center",top: Platform.OS == "android" ? moderateScale(15) : 0,}
           containweViewStyle = {alignItems: "center", justifyContent: "center", paddingTop: Platform.OS == "android" ? moderateScale(15) : 0,}
       }
       return (
           <View style={containweViewStyle}>
               <BoxShadow setting={{
                   width: this.props.style.width || 0,
                   height:  this.props.style.height || 0,
                   color: this.props.style.shadowColor || "#000",
                   radius: this.props.style.borderRadius || 0,
                   border: this.props.style.shadowRadius || 0,
                   opacity: this.props.style.shadowOpacity * .5 || 0,
                   x: this.props.style.shadowOffset && this.props.style.shadowOffset.width ? this.props.style.shadowOffset.width : 0,
                   y: this.props.style.shadowOffset && this.props.style.shadowOffset.height ? this.props.style.shadowOffset.height : 0,
                   elevation: this.props.style.elevation || 0,
               }}>
               </BoxShadow>
               <View style={mainViewStyle}>
                   {!this.props.scrollEnabled ?
                       <View style={viewStyle}>
                           {this.props.children}
                       </View>
                   :
                   <ScrollView style={{
                       width: this.props.style.width,
                       height:  this.props.style.height,
                   }}>
                       {this.props.children}
                   </ScrollView>
                   }
               </View>
           </View>
       )
   }
}
export default DynamicShadow