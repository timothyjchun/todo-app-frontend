import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import axios from "axios";

export default class extends React.Component {
  state = {
    text: "",
  };

  async sendData(newText) {
    await axios
      .post("https://got-todo-app.herokuapp.com/post/send", {
        text: newText,
      })
      .then(
        (res) => {
          console.log(res.status);
        },
        (error) => {
          console.log(error);
        }
      );
    // await axios.get("https://got-todo-app.herokuapp.com/post/send").then(
    //   (res) => {
    //     console.log(res.status);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  componentDidMount() {
    this.textInput = React.createRef();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder="Enter you text!"
          textAlign="center"
          onChangeText={(newText) => this.setState({ text: newText })}
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <Button
          title="Send"
          onPress={() => {
            this.sendData(this.state["text"]);
            this.textInput.clear();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    height: 40,
  },
});
