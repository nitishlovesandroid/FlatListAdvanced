import React, { Component,useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput, Button,
    Alert, FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'


export default ImageComponent = (props) => {
    const[get,set]=useState(false)

    handleImage=()=>{
        console.warn("method called")
       
        set(true)
        console.warn(get)
    }
    return (
        <View style={styles.item}>
      <Text style={styles.title}>{props.email.id}</Text>
      <View style={{flex:0.2}}>
          {/* {
        get?<Image style={{height:50,width:'100%',resizeMode:'stretch',borderRadius:15}} source={{uri:props.email.avatar}} onLoad={handleImage}/>:
        <View  style={{height:50,width:'100%',resizeMode:'stretch',borderRadius:15,justifyContent:'center',alignItems:'center',backgroundColor:'#ddd'}}   >
<Image  style={{height:1,width:1}} source={{uri:props.email.avatar}} onLoad={handleImage}/>
<Icon name="image" size={40} color='#000'/>
<Image style={{height:50,width:'100%',resizeMode:'stretch',borderRadius:15}} source={ get?{uri:props.email.avatar}: null} onLoad={handleImage}/>
         </View>
          } */}
      <Image style={{height:50,width:'100%',resizeMode:'stretch',borderRadius:15}} source={ get?{uri:props.email.avatar}: require('./placeholder.png')}  onLoad={handleImage}/>
        </View> 
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.title}>{props.email.first_name} {props.email.last_name}</Text>
      <Text style={styles.title}>{props.email.email}</Text>
        </View> 


    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      margin:5,
      backgroundColor: '#f9c2ff',
      padding: 20,
      flexDirection:'row'
    },
    title: {
      fontSize: 20,
      flex:0.1
    },
  });