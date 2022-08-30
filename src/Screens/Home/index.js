import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import BannerAds from "../../Components/BannerAds"
import ButtonCustom from "../../Components/Button"
import { Color } from "../../Config"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useRecoilState } from "recoil"
import { Theme, Language } from "../../Stores"

const style = StyleSheet.create({
    containerHome : {
        margin : 10
    },
    textInput : {
        margin: 10
    },
    textFiled : {
        borderWidth:1, 
        borderColor: Color.secondary, 
        paddingHorizontal:15, 
        marginVertical: 4,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    containerText : {
        flexDirection:'row', 
        alignItems: 'center'
    },
    symbolCurency : { 
        fontSize:13,
        fontWeight:'bold'
    },
    containerSymbol : {
        width: 35,
        justifyContent: "center",
        alignItems : "center",
        backgroundColor: Color.secondary,
        paddingVertical:17,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    textInputIn : { 
        flex:1
    }
})

const HomeScreen = ({ navigation }) => {
    const [principal, setPrincipal]   = useState("")
    const [invest, setInvestment]     = useState("")
    const [time, setTime]             = useState("")
    const [rate, setRate]             = useState("")
    const [lang, setLang]             = useRecoilState(Language)
    const [thems, setTheme]           = useRecoilState(Theme)

    const count = () => {
        if(principal != "" && time != "" && rate != "" && invest != "") {
            let data = []
            let futureValue = parseInt(principal)
            let investment  = parseInt(invest)
            let months      = parseInt(time)*12
            let monthlyRate = (parseInt(rate)/100)/12

            for ( let i = 1; i <= months; i++ ) {
                futureValue = (futureValue + investment) * (1 + monthlyRate);
                
                setPrincipal(futureValue)
                data.push({
                    month  : i,
                    invest : Math.floor(futureValue)
                })
            }
            
            setPrincipal("")
            setInvestment("")
            setTime("")
            setRate("")
            navigation.navigate("Result", { dataCoumponding : data })
        }
    }

    return (
        <View>
            <BannerAds/>
            <View style={ style.containerHome }>
                <View style={ style.textInput }>
                    <View style={ style.containerText }>
                        <View style={ style.textInputIn }>
                            <TextInput 
                                style={ [style.textFiled, thems ? { color: Color.light } : { color: Color.dark }] } 
                                placeholder={lang ? "Initial Deposit" : "Setoran awal"}
                                placeholderTextColor={Color.secondary}
                                value={principal}
                                onChangeText={(value) => setPrincipal(value)}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={ style.containerSymbol }>
                            <Text style={ [style.symbolCurency, thems ? { color: Color.light } : { color: Color.dark }] }>
                                Rp
                            </Text>
                        </View>
                    </View>
                    <View style={ style.containerText }>
                        <View style={ style.textInputIn }>
                            <TextInput 
                                style={ [style.textFiled, thems ? { color: Color.light } : { color: Color.dark }] } 
                                placeholder={lang ? "Monthly Deposit" : "Setoran Bulanan"}
                                placeholderTextColor={Color.secondary}
                                value={invest}
                                onChangeText={(value) => setInvestment(value)}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={ style.containerSymbol }>
                            <Text style={ [style.symbolCurency, thems ? { color: Color.light } : { color: Color.dark }] }>
                                Rp
                            </Text>
                        </View>
                    </View>
                    <View style={ style.containerText }>
                        <View style={ style.textInputIn }>
                            <TextInput 
                                style={ [style.textFiled, thems ? { color: Color.light } : { color: Color.dark }] } 
                                placeholder={lang ? "Rate Yearly" : "Bunga pertahun"}
                                placeholderTextColor={Color.secondary}
                                defaultValue={rate} 
                                onChangeText={(value) => setRate(value)}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={ style.containerSymbol }>
                            <Text style={ [style.symbolCurency, thems ? { color: Color.light } : { color: Color.dark }] }>
                                %
                            </Text>
                        </View>
                    </View>
                    <View style={ style.containerText }>
                        <View style={ style.textInputIn }>
                            <TextInput 
                                style={ [style.textFiled, thems ? { color: Color.light } : { color: Color.dark }] } 
                                placeholder={lang ? "Time Saving" : "Lama Menabung"}
                                placeholderTextColor={Color.secondary}
                                defaultValue={time} 
                                onChangeText={(value) => setTime(value)}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={ style.containerSymbol }>
                            <Text style={ [ style.symbolCurency, thems ? { color: Color.light } : { color: Color.dark } ] }>
                                { lang ? "Year" : "Thn" }
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <ButtonCustom 
                        text={ lang ? "Compound Proccess" : "Proses Hitung" } 
                        onClick={() => count()}
                        icon={<Icon name="arrow-right" size={15} color={Color.light}/>}
                    />
                    <ButtonCustom 
                        onClick={() => navigation.navigate("Suport", { pages : "suport" })}
                        text={ lang ? "Donation" : "Donasi" }
                        icon={<Icon name="gift-outline" size={15} color={Color.light}/>}
                    />
                </View>
            </View>
        </View>
    )
}

export default HomeScreen