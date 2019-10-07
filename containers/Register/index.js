import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      gender: null,
      birthdate: null,
      isLoading: false
    }
  }

  registerAccount() {
    this.setState({
      isLoading: true
    });

    const {
      username,
      password,
      gender,
      birthdate
    } = this.state;

    const body = {
      "username": username,
      "password": password,
      "gender": gender,
      "birthdate": birthdate
    }

    const url = 'https://ngc-todo.herokuapp.com/api/users/register'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ isLoading: false });
      if (data.success) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {this.state.isLoading ? (
          <ActivityIndicator
            size="large"
          />
        ) : (
            <View>
              <TextInput style={styles.formInput}
                onChangeText={text => this.setState({
                  username: text
                })}
                placeholder="username" />
              <TextInput style={styles.formInput}
                onChangeText={text => this.setState({
                  password: text
                })}
                placeholder="password" secureTextEntry={true} />
              <TextInput style={styles.formInput}
                onChangeText={text => this.setState({
                  gender: text
                })}
                placeholder="gender" />
              <TextInput style={styles.formInput}
                onChangeText={text => this.setState({
                  birthdate: text
                })}
                placeholder="birthdate" />
              <Button
                title="Submit"
                onPress={() => {
                  this.registerAccount();
                }}
              />
            </View>)
        }
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
