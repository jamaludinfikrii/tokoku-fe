import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';
import { Alert ,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';

function LoginScreen (props){
    // 

    return(
        <Container>
        <Header />
        <Content style={{padding : 20}}>
          <Form>
            <Item floatingLabel>
              <Label>Username {props.user}</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button style={{marginTop:20}} full primary>
                <Text>Login</Text>
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