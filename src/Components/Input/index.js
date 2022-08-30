import React from "react"
import { View, TextInput, StyleSheet } from "react-native"

const style = StyleSheet.create({
    input : {

    }
})

const Input = ({ text,  }) => {
    return (
        <View>
            <View>
                <Text></Text>
            </View>
            <View>
                <TextInput style={style.input}/>
            </View>
        </View>
    )
}

export default Input