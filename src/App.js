import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextComponent } from 'react-native'
import { notifications, messages } from 'react-native-firebase-push-notifications'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            hasPermission: false
        }
    }

    componentDidMount() {
        this.onNotificationListener()
        this.onNotificationOpenedListener()
        this.getInitialNotification()
    }
    componentWillUnmount() {
        if (this.removeOnNotificationOpened) {
            this.removeOnNotificationOpened()
        }
        if (this.removeOnNotification) {
            this.removeOnNotification()
        }

        if (this.removeonTokenRefresh) {
            this.removeonTokenRefresh()
        }
    }

    onTokenButtonPress = async () => {
        const token = await this.getToken()
        console.log("token : ", token)
        this.setState({ token: token })
    }

    // onTestHasPermission = async () => {
    //     const has = await this.hasPermission()
    //     console.log("Has", has)
    //     this.setState({ hasPermission: has })
    // // }
    // runThis = () =>{
    //     // this.onTokenRefreshListener()
    //     // this.onNotificationListener()
    //     // this.onNotificationOpenedListener()
    //     // this.getInitialNotification()

    // }

    getToken = async () => {
        const token = await notifications.getToken()
        // this.runThis()
        return token
    }

    getInitialNotification = async () => {
        const notification = await notifications.getInitialNotification()
        console.log('getInitialNotification', notification)
        return notification
    }
    onNotificationOpenedListener = () => {
        this.removeOnNotificationOpened = notifications.onNotificationOpened(
            notification => {
                console.log("onNotificationOpened", notification)
                //do something with the notification
            })
    }
    onNotificationListener = () => {
        this.removeOnNotification = notifications.onNotification(notification => {
            //do something with the notification
            console.log("onNotification", notification)
        })
    }

    onTokenRefreshListener = () => {
        console.log('inside onTokenRefreshListener')
        this.removeonTokenRefresh = messages.onTokenRefresh(token => {
            //do something with the new token        
        })
    }

    requestPermission = async () => {
        //only works on iOS
        return await notifications.requestPermission()
      }


    render() {
        const { token, hasPermission } = this.state
        return (
            <View style={styles.main}>
                <View style={styles.view}>
                    <TouchableOpacity onPress={()=>this.onTokenButtonPress()}>
                        <Text style={styles.font}>Get Token</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.view}>
                    <Text>Token:{token}</Text>
                </View>
                {/* <View style={styles.view}>
                    <Text style={styles.font}>
                        hasPermission:{hasPermission? 'YES':'NO'}
                    </Text>
                    <TouchableOpacity onPress={()=>this.onTestHasPermission()}>
                        <Text style={styles.font}>Has Permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.requestPermission()}>
                        <Text style={styles.font}>Get Permission</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    view:{
        paddingHorizontal:30,
        paddingVertical:15,
        borderWidth:1,
        borderRadius:8,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        marginHorizontal:30,
        marginVertical:40
    },
    font:{
        fontSize:30,
        fontWeight:'bold'
    }

})