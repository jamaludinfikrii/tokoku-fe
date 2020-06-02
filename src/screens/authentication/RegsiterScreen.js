import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

function RegisterScreen (props){
    return(
        <Container>
        <Header />
        <Content style={{padding : 20}}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input />
            </Item>
            <Button style={{marginTop:20}} full primary>
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

export default RegisterScreen