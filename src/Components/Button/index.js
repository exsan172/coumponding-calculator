import React from "react"
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native"
import { Color } from "../../Config"

const style = StyleSheet.create({
    button : {
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:10,
        marginHorizontal:8,
        marginVertical : 3,
        backgroundColor: Color.primary,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text : {
        color : Color.light,
        fontWeight: "600",
        textTransform : 'capitalize'
    }
})

const ButtonCustom = ({ text, onClick=null, variant="primary", icon=null, rightContent=null }) => {
    return (
        <TouchableNativeFeedback onPress={() => {onClick !== null && onClick()}}>
            <View style={[ 
                style.button, 
                variant === "primary" ? 
                    { backgroundColor: Color.primary } 
                : variant === "secondary" ?
                    { backgroundColor : Color.secondary }
                : variant === "success" ?
                    { backgroundColor : Color.success }
                : variant === "danger" ?
                    { backgroundColor : Color.danger }
                : variant === "warning" &&
                    { backgroundColor : Color.warning }
            ]}>
                {
                    icon !== null &&
                    <View>
                        {icon}
                    </View>
                }

                <View style={{ flex:1, marginLeft:20 }}>
                    <Text style={style.text}>
                        {text}
                    </Text>
                </View>

                {
                    rightContent !== null &&
                    <View>
                        {rightContent}
                    </View>
                }
            </View>
        </TouchableNativeFeedback>
    )
}

export default ButtonCustom