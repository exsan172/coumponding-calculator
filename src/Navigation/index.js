import React, { useEffect } from "react"
import { TouchableNativeFeedback, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from "recoil";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useRecoilState } from "recoil"
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from  "react-native-splash-screen";
import { Theme, Language } from "../Stores"

// screen
import HomeScreen from "../Screens/Home"
import WebScreen from "../Screens/Web"
import SettingScreen from "../Screens/Settings";
import ResultScreen from "../Screens/Result";
import { Color } from "../Config";

const Stack = createNativeStackNavigator();
const Navigation = () => {
    const [theme, setTheme] = useRecoilState(Theme)
    const [lang, setLang]   = useRecoilState(Language)

    useEffect(() => {
        const getThemeAndLang = async () => {
            
            const getTheme = await AsyncStorage.getItem("THEME")
            if(getTheme !== null) {
                setTheme(JSON.parse(getTheme))
            } else {
                await AsyncStorage.setItem("THEME", "false")
            }

            const getLang = await AsyncStorage.getItem("LANG")
            if(getLang !== null) {
                setLang(JSON.parse(getLang))
            } else {
                await AsyncStorage.setItem("LANG", "false")
            }
        }

        getThemeAndLang()
        SplashScreen.hide();
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                contentStyle:{
                    backgroundColor: theme === true ? "#000000" : "#ffffff"
                }
            }}>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title : lang ? "Compounding Interest" : "Bunga majemuk",
                        headerTitleStyle: {
                            fontSize: 18,
                            color: Color.light
                        },
                        headerStyle : {
                            backgroundColor : Color.primary
                        },
                        headerRight : () => (
                            <TouchableNativeFeedback onPress={() => navigation.navigate("Setting")}>
                                <Icon name="cog" size={25} color={Color.light}/>
                            </TouchableNativeFeedback>
                        ),
                        animation : "slide_from_right"
                    })}
                />
                <Stack.Screen 
                    name="Result" 
                    component={ResultScreen}
                    options={({ navigation }) => ({
                        title : lang ? "Result" : "Hasil",
                        headerTintColor : Color.light,
                        headerStyle : {
                            backgroundColor : Color.primary
                        },
                        headerRight : () => (
                            <TouchableNativeFeedback onPress={() => navigation.navigate("Setting")}>
                                <Icon name="cog" size={25} color={Color.light}/>
                            </TouchableNativeFeedback>
                        ),
                        animation : "slide_from_right"
                    })}
                />
                <Stack.Screen 
                    name="About" 
                    component={WebScreen}
                    options={{
                        title : lang ? "About Developer" : "Tentang Pengembang",
                        headerTintColor : Color.light,
                        headerStyle : {
                            backgroundColor : Color.primary
                        },
                        animation : "slide_from_right"
                    }}
                />
                <Stack.Screen 
                    name="Suport" 
                    component={WebScreen}
                    options={{
                        title : lang ? "Donation" : "Donasi",
                        headerTintColor : Color.light,
                        headerStyle : {
                            backgroundColor : Color.primary
                        },
                        animation : "slide_from_right"
                    }}
                />
                <Stack.Screen 
                    name="Setting"
                    component={SettingScreen}
                    options={{
                        title : lang ? "Setting" : "Pengaturan",
                        headerTintColor : Color.light,
                        headerStyle : {
                            backgroundColor : Color.primary
                        },
                        animation : "slide_from_right"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Nav = () => {
    return (
        <RecoilRoot>
            <Navigation/>
        </RecoilRoot>
    )
}

export default Nav