import React from "react";
import { useCallback, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import ShowData from "./Text";
import Loading from "./Loading";

export default class extends React.Component {
  state = {
    text: "",
    data: [],
    color: "",
  };

  async sendTask(newText) {
    if (this.state["color"]) {
      await axios
        .post("https://got-todo-app.herokuapp.com/post/send", {
          text: newText,
          color: this.state["color"],
        })
        .then(
          (res) => {
            console.log(`POST status code: ${res.status}`);
            this.getData();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      Alert.alert("Oops!", "You have to select a color as well!");
    }
    this.getData();
  }

  async getData() {
    await axios.get("https://got-todo-app.herokuapp.com/post/send").then(
      (res) => {
        console.log(`GET status code: ${res.status}`);
        this.setState({
          data: JSON.parse(JSON.stringify(res["data"]), null, 2),
          color: "",
        });
        console.log(this.state["data"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTask(id) {
    Alert.alert("Are you sure that you want to delete this task?", "", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await axios
            .post("https://got-todo-app.herokuapp.com/post/delete", {
              id: id,
            })
            .then(
              (res) => {
                Alert.alert("Delete Successful!");
                this.getData();
              },
              (error) => {
                console.log(error);
              }
            );
        },
      },
    ]);
  }

  async editTask(task, id, index) {
    this.textInput.current.setNativeProps({ text: task["text"] });
    await axios.post("https://got-todo-app.herokuapp.com/post/delete", {
      id: id,
    });
  }

  componentDidMount() {
    this.textInput = React.createRef();
    this.getData();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topHalfContainer}>
          <View style={styles.textAndSubmitContainer}>
            <TextInput
              style={styles.textStyles}
              placeholder="Whacu gotta do"
              textAlign="center"
              onChangeText={(newText) => this.setState({ text: newText })}
              // ref={(input) => {
              //   this.textInput = input;
              // }}
              ref={this.textInput}
            />
            <TouchableOpacity
              style={styles.bottonStyle}
              onPress={() => {
                this.sendTask(this.state["text"]);
                // this.textInput.clear();
                this.textInput.current.setNativeProps({ text: "" });
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.colorContainer}>
            <LinearGradient
              style={styles.colorButtonStyle}
              colors={["#07CFFF", "#07CFFF"]}
            >
              <TouchableOpacity
                style={styles.colorSelect}
                onPress={() => {
                  this.setState({ color: "blue" });
                  Alert.alert("Blue Selected");
                }}
              />
            </LinearGradient>
            <LinearGradient
              style={styles.colorButtonStyle}
              colors={["#FF07E2", "#FF07E2"]}
            >
              <TouchableOpacity
                style={styles.colorSelect}
                onPress={() => {
                  this.setState({ color: "red" });
                  Alert.alert("Red Selected");
                }}
              />
            </LinearGradient>
            <LinearGradient
              style={styles.colorButtonStyle}
              colors={["#07FF07", "#07FF07"]}
            >
              <TouchableOpacity
                style={styles.colorSelect}
                onPress={() => {
                  this.setState({ color: "green" });
                  Alert.alert("Green Selected");
                }}
              />
            </LinearGradient>
          </View>
        </View>
        <View style={styles.bottomHalfContainer}>
          <ScrollView>
            {this.state["data"].length != 0 ? (
              this.state["data"].map((task, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      Alert.alert("Modify Task", "", [
                        {
                          text: "Cancel",
                        },
                        {
                          text: "Delete",
                          onPress: () => {
                            this.deleteTask(task["id"]);
                          },
                        },
                        {
                          text: "Edit",
                          onPress: () => {
                            this.editTask(task, task["id"], index);
                          },
                        },
                      ]);
                    }}
                  >
                    <ShowData key={index} data={task} />
                  </TouchableOpacity>
                );
              })
            ) : (
              <Loading style={styles.loading} />
            )}
          </ScrollView>
        </View>
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

  topHalfContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textAndSubmitContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    marginVertical: 30,
  },
  textStyles: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    height: 40,
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  bottonStyle: {
    borderRadius: 15,
    borderWidth: 2,
    padding: 8,
    borderColor: "gray",
  },
  colorButtonStyle: {
    borderRadius: 100,
    marginHorizontal: 10,
  },
  colorContainer: { flexDirection: "row" },
  colorSelect: {
    borderRadius: 100,
    width: 14,
    height: 14,
    padding: 14,
  },

  bottomHalfContainer: {
    flex: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
