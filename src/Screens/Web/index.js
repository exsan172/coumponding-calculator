import React, { useState } from "react"
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native"
import { WebView } from "react-native-webview"
import { Config } from "../../Config"
import BannerAds from "../../Components/BannerAds"

const height = Dimensions.get('window').height
const style = StyleSheet.create({
    webview : {
        width : "100%",
        height : "100%"
    },

    loading : {
        position: 'absolute',
        top : height/2-50,
        left : 0,
        right : 0,
        bottom : 0
    }
})

const WebScreen = ({ route }) => {
    const [loading, setLoading] = useState(false)
    const { pages } = route.params

    return (
        <View>
            <BannerAds/>
            <View style={style.webview}>
                <WebView
                    onLoad={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    source={{ uri : pages === "about" ? Config.ABOUT_LINK : Config.SUPORT_LINK }}
                    scalesPageToFit={true}
                />

                {
                    loading &&
                    <ActivityIndicator 
                        size="large"
                        style={style.loading}
                    />
                }
            </View>
        </View>
    )
}

export default WebScreen