import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import axios from "axios";

const CreateNote = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const PostData = () => {
    axios
      .post("https://60acb7be9e2d6b0017457c42.mockapi.io/noteapp/v1/Note", {
        title: title,
        description: description,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack("NewFeed");
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.titleNote}>Note App</Text>
          <TouchableOpacity
            onPress={() => {
              PostData(),
                setTimeout(() => {
                  navigation.replace("NewFeed");
                }, 500);
            }}
            style={styles.addNote}
          >
            <AntDesign name="checkcircleo" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contain}>
        <TextInput
          multiline
          placeholder="Title"
          style={styles.title}
          onChangeText={(title) => setTitle(title)}
        />
        <TextInput
          placeholder="Description"
          style={styles.description}
          multiline
          onChangeText={(description) => setDescription(description)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020002",
    flex: 1,
  },
  titleNote: {
    color: "white",
    fontSize: 30,
  },
  contain: {
    flex: 1,
  },
  title: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#868686",
    borderBottomColor: "#868686",
    color: "white",
    padding: 15,
    fontSize: 25,
    fontWeight: "bold",
    alignItems: 'flex-start'
  },
  description: {
    flex: 9,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#868686",
    borderBottomColor: "#868686",
    color: "white",
    padding: 15,
    alignItems: 'flex-start'

  },
});

export default CreateNote;
