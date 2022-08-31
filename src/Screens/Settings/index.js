import React from "react"
import { View, StyleSheet, Switch, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useRecoilState } from "recoil"
import AsyncStorage from "@react-native-async-storage/async-storage"

import ButtonCustom from "../../Components/Button"
import BannerAds from "../../Components/BannerAds"
import { Color } from "../../Config"
import { Theme, Language } from "../../Stores"

const style = StyleSheet.create({
    settingContainer : {
        marginHorizontal : 10,
        marginTop: 5
    },
    containerRightContent : {
        flexDirection: 'row', 
        alignItems:'center'
    },
    switchMargin : {
        marginHorizontal:5
    }
})

const SettingScreen = ({ navigation }) => {
    const [lang, setLang]   = useRecoilState(Language)
    const [theme, setTheme] = useRecoilState(Theme)

    const setThemes = async (value) => {
        setTheme(value)
        await AsyncStorage.setItem("THEME", JSON.stringify(value))
    }

    const setLanguage = async (value) => {
        setLang(value)
        await AsyncStorage.setItem("LANG", JSON.stringify(value))
    }

    return (
        <View>
            <BannerAds/>
            <View style={style.settingContainer}>
                <ButtonCustom
                    onClick={() => setLanguage(lang ? false : true)}
                    text={ lang ? "Language" : "Bahasa" }
                    icon={
                        <Icon name="earth" size={15} color={Color.light}/>
                    }
                    rightContent={
                        <View style={ style.containerRightContent }>
                            <View>
                                <Text style={{ fontWeight: 'bold', color:Color.light }}>ID</Text>
                            </View>
                            <View style={ style.switchMargin }>
                                <Switch
                                    trackColor={{ false: Color.light, true: Color.light }}
                                    thumbColor={lang ? Color.warning : Color.secondary}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={setLanguage}
                                    value={lang}
                                    style={{ height:5 }}
                                />
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold', color:Color.light }}>EN</Text>
                            </View>
                        </View>
                    }
                />
                <ButtonCustom
                    onClick={() => setThemes(theme ? false : true)}
                    text={ lang ? "Theme" : "Tema" }
                    icon={<Icon name="palette" size={15} color={Color.light}/>}
                    rightContent={
                        <View style={ style.containerRightContent }>
                            <View>
                                <Icon name="weather-sunny" size={18} color={Color.light}/>
                            </View>
                            <View style={ style.switchMargin }>
                                <Switch
                                    trackColor={{ false: Color.light, true: Color.light }}
                                    thumbColor={theme ? Color.warning : Color.secondary}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={setThemes}
                                    value={theme}
                                    style={{ height:5 }}
                                />
                            </View>
                            <View>
                                <Icon name="moon-waning-crescent" size={18} color={Color.light}/>
                            </View>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

export default SettingScreen