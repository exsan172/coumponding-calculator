import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Color } from "../../Config"

const style = StyleSheet.create({
    ContainerBanner : {
        height:70,
        width:"100%",
        padding:3,
        display: 'none'
    },
    banner : {
        backgroundColor: Color.secondary,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

const BannerAds = () => {
    return (
        <View style={style.ContainerBanner}>
            <View style={style.banner}>
                <Text>Ads Banner</Text>
            </View>
        </View>
    )
}

export default BannerAds