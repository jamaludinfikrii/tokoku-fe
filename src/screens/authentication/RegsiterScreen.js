import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text } from 'native-base';

function RegisterScreen (){
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
          </Form>
        </Content>
      </Container>
    )
}

export default RegisterScreen