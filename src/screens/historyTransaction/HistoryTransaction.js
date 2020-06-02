import React, { useEffect, useState } from 'react'
import { View,ScrollView } from 'react-native'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { Container, Content, List, ListItem, Left, Body, Right,Text, Button } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Moment from 'moment'
import Loading from '../../components/Loading'

const users_id = 3

const HistoryTransaction = (props) => {
    const [data,setData] = useState(null)
    const [statusSelected,setStatusSelected] = useState(null)

    // useEffect(() => {
    //     getDataTransaction()
    // } ,[])

    useEffect(() => {
        console.log('trigered')
        var status = statusSelected === 'Waiting For Payment' ? 1 : statusSelected === 'Waiting For Approvement' ? 2 : statusSelected === 'On Proccess' ? '345' : statusSelected === 'Success' ? '6' : statusSelected === 'Failed' ? '7' : 'all'
        getDataFiltered(status)
    } , [statusSelected])


    const getDataFiltered = (value) => {
        Axios.get(API_URL + `transaction/statusfiltered?users_id=${users_id}&status=${value}` )
        .then((res) => {
            console.log(res.data)
            if(!res.data.error){
                setData(res.data.data)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getDataTransaction = () => {
        Axios.get(API_URL+'transaction/' + users_id)
        .then((res) => {
            setData(res.data.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }  
    
    const renderDataToJsx = () => {
        return data.map((val) => {
            return(     
                <ListItem key={val.id} avatar onPress={() => props.navigation.navigate('history-detail',{transaction_id : val.id , status : val.status , 
                    onRefresh : () => getDataTransaction()
                })}>
                    <Left>
                        <View style={{backgroundColor : "grey",height :40,width:40,borderRadius:25,justifyContent:'center',alignItems:'center'}} >
                            <Text style={{color : "white"}}>
                                {val.total_item}
                            </Text>
                        </View>
                    </Left>
                    <Body>
                        <Text>Rp. {val.total_transaction}</Text>
                        <Text note>{val.status === 1 ? "Waiting For Payment" : val.status === 2 ? "Waiting For Approvement" : "Others"}</Text>
                    </Body>
                    <Right>
                        <Text note>{Moment(val.date).format('MMM Do YY')}</Text>
                    </Right>
                </ListItem>
                    
            )
        })
    }

    if(data === null){
        return <Loading />
    }

    // const [statusSelected,setStatusSelected] = useState(null)
    const status = ['Waiting For Payment','Waiting For Approvement','On Proccess','Success','Failed']
    return (
        <Container>
            {/* <HeaderWithArrowBack title='History' /> */}
            <Content>
                <ScrollView style={{flexDirection : "row",marginVertical:10,padding:10}} horizontal={true}>
                    {
                        status.map((val) => {
                            if(val === statusSelected){
                                return(
                                    <Button onPress={() => setStatusSelected(null)} style={{marginHorizontal:5}} rounded info>
                                        <Text style={{fontSize:10}}>{val}</Text>
                                    </Button>
                                )
                            }
                            return(
                                <Button onPress={() => setStatusSelected(val)} style={{marginHorizontal:5}} rounded bordered info>
                                    <Text style={{fontSize:10}}>{val}</Text>
                                </Button>
                            )
                        })
                    }
                </ScrollView>
                <List>
                    {renderDataToJsx()}
                </List>
            </Content>
        </Container>
    )
}
export default HistoryTransaction
