import React, { Component } from 'react'
import { Text, View, ListItem } from 'native-base'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { Image, SafeAreaView } from 'react-native'
import Shoping from './../../supports/icons/shopping.png'
import HeaderWithArrowBack from '../../components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

class ProductPage extends Component {

    state = {
        data : null
    }

    componentDidMount(){
        this.getData()

    }

    getData = () => {
        Axios.get(API_URL + 'product')
        .then((res)=>{
            this.setState({data : res.data.data})
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderData = () => {
        return this.state.data.map((val)=>{
            return(
                <View style={{flexDirection:'row', justifyContent:'space-around'}} key={val.id}>
                    <View style={{height:250, width:175, backgroundColor:'white', borderRadius:10, borderWidth:0.5, borderColor:'black'}}>
                        <Image source={{uri:API_URL + val.url_image}} style={{height:125, width:'100%', borderTopLeftRadius:10, borderTopRightRadius:10}}/>
                        <View style={{padding:10}}>
                            <Text style={{fontSize:14}}>{val.name}</Text>
                            <Text style={{fontSize:14, fontWeight:'bold'}}>Rp {val.price}</Text>
                            <Text style={{fontSize:12, fontWeight:'bold', marginTop:10}} onPress={()=> this.props.navigation.navigate('productdetail', {id : val.id})}>DETAIL</Text>
                        </View>
                    </View>
                </View>
                    
            )
        })
        
    }

    render() {
        if (this.state.data === null){
            return(
                <Text>Loading ...</Text>
            )
        }
        return (
        <View>
            {/* <HeaderWithArrowBack title='Product' /> */}
                <View style={{padding:20}}>
                    <Text> Selamat Datang {this.props.data.username}</Text>
                    {this.renderData()}
                </View>
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.user
    }
}

export default connect(mapStateToProps)(ProductPage);
