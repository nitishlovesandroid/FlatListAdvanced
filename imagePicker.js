import React, { PureComponent } from 'react';
import {  View, Text,SafeAreaView ,TouchableOpacity,Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class imagePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      source:""
    };
  }
hendleImage=()=>{
  ImagePicker.openPicker({
    width: 200,
    height: 200,
    cropping:true
  }).then(image => {
  
    console.warn("gallery",image.path)
    this.setState({
      source:image.path
    
    })
  })
}
RemovePic=()=>{
this.setState({
  source:''
})
}
  render() {
    return (
      <SafeAreaView style={{justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
     <TouchableOpacity style={{height:200,width:200,backgroundColor:'red',borderRadius:20}} onPress={this.hendleImage}>
         <Image source={{uri:this.state.source}} resizeMethod style={{flex:1}} />
     </TouchableOpacity>
     <TouchableOpacity onPress={this.RemovePic}>
       <Text>remove</Text>
     </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
