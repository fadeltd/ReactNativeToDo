import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      Password: null,
    }
  }
  login() {
    const {
      username,
      password
    } = this.state;

    const body = {
      "username": username,
      "password": password,
    }

    const url = 'https://ngc-todo.herokuapp.com/api/users/login'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.success) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home', params: { data: data.data } })],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        alert(data.message);
      }
    }).catch(error => {
      alert(error)
    });
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <TextInput style={styles.formInput}
          onChangeText={text => this.setState({
            username: text
          })}
          value={this.state.username}
          placeholder="username" />
        <TextInput
          onChangeText={text => this.setState({
            password: text
          })}
          value={this.state.password}
          secureTextEntry={true}
          style={styles.formInput} placeholder="Password" />
        <Button title="Login" onPress={() => {
          this.login();
        }} />
        <Button title="Register" onPress={() => {
          this.props.navigation.navigate({ routeName: 'Register' });
          // this.props.navigation.navigate('Home', { task: '1234' })
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    marginBottom: 10
  }
})
