import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { set } from 'react-native-reanimated';


export default function Details(props) {
    const {aqi} = props;
    const [color , setColor] = React.useState("green");
    const [message , setMessage] = React.useState("");

    React.useEffect(()=>{
        let data = parseInt(aqi);

        if(data<50){
            setColor("green");
            setMessage("Good");
        }else if(data>50&&data<100){
            setColor("yellow");
            setMessage("Moderate");
        }else if(data>100&&data<150){
            setColor("Orange");
            setMessage("Unhealthy for sensitive groups");
        }else if(data>151&&data<200){
            setColor("red");
            setMessage("Unhealthy");
        }else if(data>201&&data<300){
            setColor("violet");
            setMessage("Very Unhealthy");
        }else{
            setColor("brown");
            setMessage("Hazardous");
        }
    },[aqi])

    return (
        <View style={style.container}>
            <Text>{aqi}</Text>
            <View>
               <Icon name="leaf" size={20} color={color}/>
               <Text>{message}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
    }
})