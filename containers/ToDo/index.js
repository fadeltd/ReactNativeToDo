import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      data: []
    }
  }

  addNewTask() {
    const data = this.state.data;
    data.push({
      checked: false,
      task: this.state.text
    });
    this.setState({
      data: data,
      text: null
    });
    this.saveData(data);
  }

  // data = [{
  //   chcecked: true,
  //   task: 'Task 1'
  // },{
  //   chcecked: false,
  //   task: 'Task 2'
  // }]

  // item = {
  //   chcecked: false,
  //   task: 'Task 2'
  // };

  async saveData(data) {
    try {
      await AsyncStorage.setItem('ToDo', JSON.stringify(data));
    } catch (error) {
      alert(error);
    }
  }

  updateChecked(item, checked) {
    const data = this.state.data;
    const index = data.indexOf(item);
    data[index].checked = checked;
    this.setState({
      data: data
    });
    this.saveData(data);
  }

  deleteTask(item) {
    const data = this.state.data;
    const index = data.indexOf(item);
    data.splice(index, 1);
    this.setState({
      data: data
    });
    this.saveData(data);
  }

  async componentWillMount() {
    try {
      const data = await AsyncStorage.getItem('ToDo');
      if (data !== null) {
        this.setState({
          data: JSON.parse(data),
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { data, text } = this.state;
    // <ScrollView>
    //   {
    //     data.map(item => {
    //       return (
    //         <TaskItem
    //           onDelete={(item) => this.deleteTask(item)}
    //           item={item}
    //         />);
    //     })
    //   }
    // </ScrollView>
    
    const loginData = this.props.navigation.state.params.data;
    console.log(loginData);
    return (
      <View style={styles.container}>
        <Text>Welcome, {loginData.username}</Text>
        <TextInput
          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={() => this.addNewTask()}
          style={{ margin: 10 }}
          placeholder="Input new task"
          value={text}
        />
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <TaskItem
              onDelete={(item) => this.deleteTask(item)}
              onChecked={(item, checked) => this.updateChecked(item, checked)}
              navigation={this.props.navigation}
              item={item}
            />}
          extraData={this.state}
        />
      </View>
    );
  }
}

class TaskItem extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   checked: false
    // }
  }
  check() {
    // this.setState({
    //   checked: !this.state.checked
    // });
    const {
      onChecked,
      item
    } = this.props;
    onChecked(item, !item.checked);
  }
  render() {
    // const { checked } = this.state;
    const { navigation, item, onDelete } = this.props;
    //navigation.navigate();
    return (
      <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
        <TouchableOpacity style={{ flex: 0.1 }} onPress={() => this.check()}>
          <Image source={item.checked ? require('../../assets/images/checkbox-marked-outline.png') : require('../../assets/images/checkbox-blank-outline.png')} />
        </TouchableOpacity>
        <Text style={{ flex: 1, paddingTop: 5, textDecorationLine: item.checked ? 'line-through' : 'none' }}>
          {item.task}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <Image source={require('../../assets/images/delete.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#ecf0f1',
  }
});