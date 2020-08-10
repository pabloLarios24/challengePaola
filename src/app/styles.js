import { moderateScale } from 'react-native-size-matters'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';

//Colors
var principal = '#FB244B';
var secondaryBlue = 'rgb(83,141,255)';
var secondaryBlack = 'rgb(0,0,0)';
var secondaryGray = 'rgb(99,95,96)';
var secondaryGray2 = 'rgba(149,149,149,0.13)';
var secondaryGray3 = "#8B8B8B"
var secondaryGrayTitle = "#9D9D9D"
var white = 'rgb(255,255,255)';
var grisHex = '#9FA7B7';
var line = '#e8e8e8';
var green = "#1CCD7A";
var backgroundColor = "#FAFAFA";
var purple = "#582F8A";
var yellow = "#FFCA00";
var rose = "#FF7E7E";

module.exports = {
    colors:{
        principal,
        secondaryBlue,
        secondaryBlack,
        secondaryGray,
        secondaryGray2,
        secondaryGray3,
        white,
        grisHex,
        line,
        green,
        backgroundColor,
        purple,
        secondaryGrayTitle,
        yellow,
        rose
    },
    fontStyles:{
        title:{
            fontSize:moderateScale(25),
            fontWeight:"bold",
            color:secondaryBlack,
        },
        h1Bold:{
            fontSize:moderateScale(18),
            fontWeight:"bold",
            color:secondaryGray,
        },
        h1BoldWhite:{
            fontSize:moderateScale(18),
            fontWeight:"bold",
            color:white,
        },
        h1:{
            fontSize:moderateScale(18),
            color:secondaryBlack,
        },
        h2Bold:{
            fontSize:moderateScale(16),
            fontWeight:"bold",
            color:secondaryGray,
        },
        h2:{
            fontSize:moderateScale(16),
            color:secondaryGray,
        },
        h3Bold:{
            fontSize:moderateScale(14),
            fontWeight:"bold",
            color:secondaryGray,
        },
        h3:{
            fontSize:moderateScale(14),
            color:secondaryGray,
        },
        textBold:{
            fontSize:moderateScale(12),
            color:secondaryGray,
            fontWeight:"bold",
        },
        text:{
            fontSize:moderateScale(12),
            color:secondaryGray,
        },
        captionBold:{
            fontSize:moderateScale(8),
            color:secondaryGray,
            fontWeight:"bold",
        },
        caption:{
            fontSize:moderateScale(8),
            color:secondaryGray,
        },
    },
    themeClasses:{
        container:{
            flex:1,
            backgroundColor:backgroundColor,
        },
        horizontalRow:{
            width:"100%",
            flexDirection: "row",
        },
        paddingTop:{paddingTop:getStatusBarHeight(true) ? getStatusBarHeight(true) + moderateScale(10) : moderateScale(5)},
        paddingBottom:{paddingBottom:getBottomSpace()},
        fullCenterAlign: {alignItems: 'center', justifyContent: 'center'},
        marginHorizontal:{paddingHorizontal:moderateScale(20)},
    },
    dimensions:{
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
    }
}
