import React, { Component, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native';
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';
import { saveUserData } from '../../redux/actions/userAction';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';

function RegisterScreen (props){
  const [username,setUsername] = useState(null)
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [loading,setLoading] = useState(false)

  const onBtnRegisterPress = () => {
    // get value from input
    
    // check empty input
    if(username && password && email){
      Alert.alert('masyk')
      Axios.post(API_URL + 'auth/register',{username,email,password})
      .then((res) => {
        OneSignal.setExternalUserId( String(res.data[0].id) , (result) => {
          if(result.push && result.push.success){
            props.saveUserData(res.data[0])
          }
        })
        // catet dulu user id ke one signal
        // save data user ke global state
        
      })
      .catch((err) => {
        console.log(err)
      })
      
      // send to server
    }else{
      Alert.alert('Error', 'Form cannot empty')
    }
    // send to backend / server
  }

    return(
        <Container>
        <Header />
        <Content style={{padding : 20}}>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input onChangeText={(text) => setUsername(text)} value={username} />
            </Item>
            <Item last>
              <Label>Email</Label>
              <Input onChangeText={(text) => setEmail(text)} value={email} />
            </Item>
            <Item last>
              <Label>Password</Label>
              <Input onChangeText={(text) => setPassword(text)} value={password}  />
            </Item>
            <Button onPress={onBtnRegisterPress} style={{marginTop:20}} full primary>
                <Text>Register</Text>
            </Button>
            <TouchableOpacity style={{marginTop:20}} onPress={() => props.navigation.navigate('login')}>
                <Text style={{textAlign : "center"}}>Sudah Punya Akun ? Login</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    )
}

export default connect(null,{saveUserData})(RegisterScreen);