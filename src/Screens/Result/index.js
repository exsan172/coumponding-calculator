import React, { useState } from "react"
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native"
import BannerAds from "../../Components/BannerAds"
import { Color } from "../../Config"
import { useRecoilState } from "recoil"
import { formatCurrency } from "react-native-format-currency"
import { Theme, Language } from "../../Stores"
import RNFS from "react-native-fs"
import XLSX from "xlsx"

const ResultScreen = ({ route, navigation }) => {
    const { dataCoumponding } = route.params
    const [lang, setLang]     = useRecoilState(Language)
    const [thems, setTheme]   = useRecoilState(Theme)

    const exportDataToExcel = () => {

        // Created Sample data
        let sample_data_to_export = [{id: '1', name: 'First User'},{ id: '2', name: 'Second User'}];
    
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
        XLSX.utils.book_append_sheet(wb,ws,"Users")
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
        
        console.log("path => ", RNFS.DocumentDirectoryPath);
        // Write generated excel to Storage
        RNFS.writeFile(RNFS.DocumentDirectoryPath + '/my_exported_file.xlsx', wbout, 'ascii').then((r)=>{
            console.log('Success');
        }).catch((e)=>{
            console.log('Error', e);
        });

    }

    return (
        <View>
            <BannerAds/>
            <ScrollView>
                <View style={{ marginHorizontal:10 }}>
                    <View style={{ marginVertical:10 }}>
                        <View style={{ alignItems:'center', marginTop: 20 }}>
                            <View>
                                <View style={{ alignItems:'center', marginBottom:5 }}>
                                    <Text>Total</Text>
                                </View>
                                <View>
                                    {
                                        dataCoumponding.length > 0 &&
                                        <Text style={[{ fontSize:25, fontWeight: 'bold' }, thems ? { color: Color.light } : { color: Color.dark } ]}>
                                            { formatCurrency({ amount : dataCoumponding[dataCoumponding.length-1].invest, code: "IDR" })[0] }
                                        </Text>
                                    }
                                </View>
                            </View>
                            <View style={{ marginTop:20 }}>
                                <View>
                                    <Text style={[{ fontWeight: "bold" }, thems ? { color: Color.light } : { color: Color.dark }]}>{ lang ? "Note :" : "Catatan :" }</Text>
                                </View>
                                <View>
                                    <Text style={thems ? { color: Color.light } : { color: Color.dark }}>
                                        {
                                            lang ? 
                                                "The results above are estimates or estimates of the results to be obtained. value can be more or less than the result."
                                            :
                                                "Hasil di atas adalah estimasi atau perkiraan hasil yang akan di dapatkan. nilai bisa lebih atau kurang dari hasil tersebut."
                                        }
                                    </Text>
                                </View>
                                {/* <View style={{ marginTop:20 }}>
                                    <Text style={[{ fontWeight: "bold" }, thems ? { color: Color.light } : { color: Color.dark }]}>Export :</Text>
                                </View>
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:10 }}>
                                    <TouchableNativeFeedback>
                                        <View style={{ borderRadius:7, paddingHorizontal:20, paddingVertical:7, margin:5, backgroundColor: Color.primary }}>
                                            <Text style={{color:Color.light}}>PDF</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                    <TouchableNativeFeedback onPress={() => exportDataToExcel()}>
                                        <View style={{ borderRadius:7, paddingHorizontal:20, paddingVertical:7, margin:5, backgroundColor: Color.primary }}>
                                            <Text style={{color:Color.light}}>XLS</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                    <TouchableNativeFeedback>
                                        <View style={{ borderRadius:7, paddingHorizontal:20, paddingVertical:7, margin:5, backgroundColor: Color.primary }}>
                                            <Text style={{color:Color.light}}>DOC</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View> */}
                            </View>
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
                            <View style={{ marginBottom:10 }}>
                                {
                                    dataCoumponding.length > 0 &&
                                    dataCoumponding.map((data, i) => {
                                        return (
                                            <View style={[{ padding:5, flexDirection:'row', borderWidth:1, borderColor: Color.secondary, marginVertical:2 }, i === (dataCoumponding.length-1) && { backgroundColor: Color.primary }]} key={i}>
                                                <View style={{ flex:1, justifyContent:'center', alignItems:'center', borderRightColor: Color.secondary, borderRightWidth:1 }}>
                                                    <Text style={[i === (dataCoumponding.length-1) ? { color: Color.light, fontWeight: 'bold' } : thems ? { color: Color.light } : { color: Color.dark }]}>
                                                        {data.month}
                                                    </Text>
                                                </View>
                                                <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                                                    <Text style={[i === (dataCoumponding.length-1) ? { color: Color.light, fontWeight: 'bold' } : thems ? { color: Color.light } : { color: Color.dark }]}>
                                                        { formatCurrency({ amount : data.invest, code: "IDR" })[0] }
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ResultScreen