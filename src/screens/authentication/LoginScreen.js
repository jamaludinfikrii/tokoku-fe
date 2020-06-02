import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';

function LoginScreen (){
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
              <Label>Password</Label>
              <Input />
            </Item>
            <Button style={{marginTop:20}} full primary>
                <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
}

export default LoginScreen