import React, { Component, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';
import { Alert ,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';

function LoginScreen (props){
  // const [state_name, state_action] = useState(initial_state)
  const [username,setUsername] = useState(null)
  const [password,setpassword] = useState(null)
  const [loading,setLoading] = useState(false)

  const onLoginButtonClick = () => {
    setLoading(true)
    if(username && password){
      console.log(username)
      console.log(password)
      Axios.post(API_URL + 'auth/login', {username : username , password : password})
      .then((res) => {
        console.log(res.data)
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
    // kalau valid => kita taruh di global state
    // kalau gak => munculin error

    return(
        <Container>
        <Header />
        <Content style={{padding : 20}}>
          <Form>
            <Item floatingLabel>
              <Label>Username {props.user}</Label>
              <Input value={username} onChangeText={(inputText) => setUsername(inputText)}/>
            </Item>
            <Item floatingLabel last>
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

export default connect(mapStateToProps)(LoginScreen);