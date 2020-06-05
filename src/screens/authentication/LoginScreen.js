import React, { Component, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert ,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';
import { saveUserData } from '../../redux/actions/userAction';

function LoginScreen (props){
  // const [state_name, state_action] = useState(initial_state)
  const [username,setUsername] = useState(null)
  const [password,setpassword] = useState(null)
  const [loading,setLoading] = useState(false)

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('data_user', jsonValue)
      console.log('success async storage')
      // setiap refresh, ambil data di async storage, trus simpen lagi di global state
      // global_state / state lainnya / variabel = temporary
      // async storage = Persistent
    } catch (e) {
      console.log(e)
    }
  }
  const onLoginButtonClick = () => {
    setLoading(true)
    if(username && password){
      console.log(username)
      console.log(password)
      Axios.post(API_URL + 'auth/login', {username : username , password : password})
      .then((res) => {
        console.log(res)
        if(res.data.length > 0){
          props.saveUserData(res.data[0])
          storeData(res.data[0])

          // {username : "" , password : "" , email : "" ,id : }
          // user ada => simpan ke global state
          // simpen di asyncstorage
        }else{
          Alert.alert('Error' , "Username or Password Invalid")
          // user gak ada
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    }else{
      Alert.alert('Error','Form Must be filled')
      setLoading(false)
    }
  }
    // kirim username dan password ke backend
    // check di db username dan password valid atau enggak
    // kalau valid => kita taruh di global state , di async storage
    // kalau gak => munculin error

    return(
        <Container>
        <Header />
        <Content style={{padding : 20}}>
          <Form>
            <Item>
              <Label>Username {props.user}</Label>
              <Input value={username} onChangeText={(inputText) => setUsername(inputText)}/>
            </Item>
            <Item last>
              <Label>Password</Label>
              <Input value={password} secureTextEntry={true} onChangeText={(inputText) => setpassword(inputText)} />
            </Item>
            <Button onPress={onLoginButtonClick} style={{marginTop:20}} full primary>
                {
                  loading ? 
                  <Text>loading ...</Text>
                  :
                  <Text>Login</Text>
                }
            </Button>
            <TouchableOpacity style={{marginTop:20}} onPress={() => props.navigation.navigate('register')}>
                <Text style={{textAlign : "center"}}>Belum Punya Akun ? Daftar</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}

export default connect(mapStateToProps,{saveUserData})(LoginScreen);


// Local Push Notification
// Server Push Notification