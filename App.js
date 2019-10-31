import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet,TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import axios from 'axios'
import Icon from 'react-native-vector-icons/AntDesign'
import MyIcon from './ImageComponent'
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empdata: [], isLoading: false, fetchingStatus: false, call: true,index:0
    };
    this.page = 1;

  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=' + this.page+'&&delay=3')
      // console.warn("pages=>",this.page)

      .then(response => {
        console.log(response.data);
        //console.warn("page no component",this.page)
        var temp = []
        var temp = response.data.data
        var that = this;
        that.page = that.page + 1;
        //console.warn("lengthco",response.data.data.length)
        this.setState({
          empdata: temp,
        })

      })
      .catch(error => {
        //console.log(error);
      });
  }

  BottomView = () => {
    return (

      <View>
        {
          (this.state.fetchingStatus)
            ?
            <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 6 }} />
            :
            null
        }

      </View>


    )
  }

  getDataFromApi() {
    this.setState({
      fetchingStatus: true
    })
    axios.get('https://reqres.in/api/users?page=' + this.page+'&&delay=3')
      .then(response => {
       
        if (response.data.data.length > 0) {
          var that = this;
          that.page = that.page + 1;
          var temp = this.state.empdata.concat(response.data.data);
          this.setState({
            empdata: temp,
            fetchingStatus: false,
            call: false
          })
        } else {
          this.setState({
            fetchingStatus: false,

          })
        }


      })
      .catch(error => {
        //console.log(error);
      });

  }
  setToTopPosition=()=>{
    this.flatlistref.scrollToOffset(true,0);
  }

  render() {
    {
      return (<SafeAreaView>
        <View style={{ height: "100%", width: "100%" }}>
          <FlatList onscroll={(e)=>{
                let offset = e.nativeEvent.contentOffset.y;
                let index = parseInt(offset / height);   // your cell height
                console.warn("==> " + index)
          }}

            
            data={this.state.empdata}
            renderItem={({ item }) => <MyIcon email={item} />
            }
            ref={(ref)=>{
              this.flatlistref=ref
            }}
            onEndReachedThreshold={0.0005}
            onEndReached={() => {
              if (!this.state.fetchingStatus) {
               
                this.getDataFromApi()
               
              }

            }
          }
            ListFooterComponent={this.BottomView}
          />
          <TouchableOpacity style={{paddingLeft:'10%',height:40,width:'100%',position:'absolute',bottom:0,alignItems:'flex-end',justifyContent:'flex-end',marginBottom:'10%',marginRight:'20%'}} onPress={this.setToTopPosition}>
{/* <View style={{height:40,width:40,backgroundColor:'red',position:'absolute',bottom:0,alignItems:'flex-end',justifyContent:'flex-end',borderRadius:20}}/> */}
<Icon name="upcircle" size={35} style={{color:'yellow',marginRight:1,marginBottom:20}} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      )

    }
  }
}
settimeinterval=()=>{
  setTimeout(() => {
    
  }, 3000);
}

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title.id}</Text>
      <View style={{flex:0.2}}>
        <Image source={{uri:title.avatar}} style={{height:50,width:'100%',resizeMode:'stretch',borderRadius:15}}/>
        </View> 
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.title}>{title.first_name} {title.last_name}</Text>
      <Text style={styles.title}>{title.email}</Text>
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
