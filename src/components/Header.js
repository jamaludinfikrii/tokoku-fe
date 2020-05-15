import React from 'react'
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base'

const HeaderWithArrowBack = (props) => {
    return (
        <Header>
            <Left>
                <Button transparent>
                <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>{props.title}</Title>
            </Body>
            <Right></Right>
        </Header>
    )
}

export default HeaderWithArrowBack;
