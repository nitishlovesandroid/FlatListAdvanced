import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empdata: [], isLoading: false, fetchingStatus: false, call: true,refresh:false
    };
    this.page = 1;

  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=' + this.page+'&&delay=3')
      // console.warn("pages=>",this.page)

      .then(response => {
        //console.log(response.data);
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

  refreshRequest=()=>{
    axios.get('https://reqres.in/api/users?page=' + this.page+'&&delay=3')
    // console.warn("pages=>",this.page)

    .then(response => {
      //console.log(response.data);
      //console.warn("page no component",this.page)
      var temp = []
      var temp = response.data.data
      var that = this;
      that.page = that.page + 1;
      //console.warn("lengthco",response.data.data.length)
      this.setState({
        empdata: temp,
        refresh:false
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
  handleRefresh=()=>{
      this.setState({
          refresh:true
      },()=>{
        axios.get('https://reqres.in/api/users?page=' + this.page+'&&delay=3')
        .then(response => {
          console.log("response", response)
          if (response.data.data.length > 0) {
            var that = this;
            that.page = that.page + 1;
            var temp = this.state.empdata.concat(response.data.data);
            this.setState({
              empdata: temp,
              fetchingStatus: false,
              call: false,
              refresh:false
            })
          } else {
            this.setState({
              fetchingStatus: false,
              refresh:false
  
            })
          }
  
  
        })
        .catch(error => {
          //console.log(error);
        });
      })

  }

  getDataFromApi() {
      console.warn("called")
    this.setState({
      fetchingStatus: true
    })
    axios.get('https://reqres.in/api/users?page=' + this.page+'&&delay=3')
      .then(response => {
        console.log("response", response)
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

  render() {
    {
      return (<SafeAreaView>
        <View style={{ height: "100%", width: "100%" }}>
          <FlatList
            //contentContainerStyle={{ flex: 1 }}
            data={this.state.empdata}
            renderItem={({ item }) => <Item title={item} />
            }
            onRefresh={this.handleRefresh}
            refreshing={this.state.refresh}
        //     onEndReachedThreshold={0.005}
        //     onEndReached={() => {
        //       if (!this.state.fetchingStatus) {
        //         this.getDataFromApi()
        //       }

        //     }
        //   }
            // ListFooterComponent={this.BottomView}
          />
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
