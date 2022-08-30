import React, { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import BannerAds from "../../Components/BannerAds"
import { Color } from "../../Config"
import { useRecoilState } from "recoil"
import { formatCurrency } from "react-native-format-currency"
import { Theme, Language } from "../../Stores"

const ResultScreen = ({ route, navigation }) => {
    const { dataCoumponding } = route.params
    const [lang, setLang]     = useRecoilState(Language)
    const [thems, setTheme]   = useRecoilState(Theme)

    return (
        <View>
            <BannerAds/>
            <View style={{ marginHorizontal:10 }}>
                <View style={{ marginVertical:10 }}>
                    <View style={{ alignItems:'center', marginTop: 5 }}>
                        {
                            dataCoumponding.length > 0 &&
                            <Text style={[{ fontSize:15, fontWeight: 'bold' }, thems ? { color: Color.light } : { color: Color.dark } ]}>
                                { formatCurrency({ amount : dataCoumponding[dataCoumponding.length-1].invest, code: "IDR" })[0] } - { dataCoumponding[dataCoumponding.length-1].month } { lang ? "Month" : "Bulan"}
                            </Text>
                        }
                    </View>
                </View>
                <View style={{ borderTopColor: Color.primary, borderTopWidth: 1, marginTop:10 }}>
                    <View>
                        <View style={{ flexDirection: "row", paddingVertical:8, backgroundColor: Color.primary, marginBottom:2 }}>
                            <View style={{ flex:1, alignItems: 'center', borderRightWidth:1, borderRightColor: Color.light }}>
                                <Text style={{ fontWeight:"bold", color:"#fff" }}>
                                    { lang ? "Month" : "Bulan" }
                                </Text>
                            </View>
                            <View style={{ flex:1, alignItems: 'center' }}>
                                <Text style={{ fontWeight:"bold", color:"#fff" }}>
                                    { lang ? "Invest" : "Investasi" }
                                </Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ marginBottom:450 }}>
                                {
                                    dataCoumponding.length > 0 &&
                                    dataCoumponding.map((data, i) => {
                                        return (
                                            <View style={[{ padding:5, flexDirection:'row', borderWidth:1, borderColor: Color.secondary, marginVertical:2 }, i === (dataCoumponding.length-1) && { backgroundColor: Color.primary }]} key={i}>
                                                <View style={{ flex:1, justifyContent:'center', alignItems:'center', borderRightColor: Color.secondary, borderRightWidth:1 }}>
                                                    <Text style={[i === (dataCoumponding.length-1) && { color: Color.light, fontWeight: 'bold' }]}>
                                                        {data.month}
                                                    </Text>
                                                </View>
                                                <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                                                    <Text style={[i === (dataCoumponding.length-1) && { color: Color.light, fontWeight: 'bold' }]}>
                                                        { formatCurrency({ amount : data.invest, code: "IDR" })[0] }
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ResultScreen