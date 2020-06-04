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

      OneSignal.push(function() {
        OneSignal.on('subscriptionChange', function(isSubscribed) {
          if (isSubscribed) {
            // The user is subscribed
            //   Either the user subscribed for the first time
            //   Or the user was subscribed -> unsubscribed -> subscribed
            OneSignal.getUserId( function(userId) {
              // Make a POST call to your server with the user ID
              Axios.post(API_URL + 'auth/register',{username,email,password,one_signal_id :userId})
              .then((res) => {
                // save data user ke global state
                props.saveUserData(res.data[0])
              })
              .catch((err) => {
                console.log(err)
              })
            });
          }
        });
      });
      
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
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(text) => setUsername(text)} value={username} />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input onChangeText={(text) => setEmail(text)} value={email} />
            </Item>
            <Item floatingLabel last>
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