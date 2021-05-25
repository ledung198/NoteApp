import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from "react-native";

const initialState = {
  loading: true,
  err: "",
  post: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        post: action.payload,
        err: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        post: {},
        err: "Something went wrong!",
      };
    default:
      return state;
  }
};
const FetchData = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get("https://60acb7be9e2d6b0017457c42.mockapi.io/noteapp/v1/Note")
      .then((res) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: res.data.reverse(),
        });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_ERROR",
        });
      });
  }, []);

  const DeleteData = (id) => {
    axios
      .delete(
        `https://60acb7be9e2d6b0017457c42.mockapi.io/noteapp/v1/Note/${id}`
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Loading = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", flex: 1 }}>Loading ...</Text>
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.titleNote}>Note App</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddNote")}
                style={styles.addNote}
              >
                <AntDesign name="pluscircleo" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <Text>
              {state.loading
                ? Loading()
                : state.post.map((item) => {
                    return (
                      <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                          navigation.navigate("Content", {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                          });
                        }}
                        key={item.id}
                      >
                        <View style={styles.contain}>
                          <View style={styles.viewNew}>
                            <View>
                              <Text
                                style={[styles.newFeed, styles.title]}
                                numberOfLines={1}
                              >
                                {item.title}
                              </Text>
                              <Text
                                style={[styles.newFeed, styles.description]}
                                numberOfLines={1}
                              >
                                {item.description}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                DeleteData(item.id);
                                setTimeout(() => {
                                  navigation.replace("NewFeed");
                                }, 500);
                              }}
                            >
                              <AntDesign
                                name="delete"
                                size={24}
                                color="white"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              {state.err ? " ERROR" : null}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const widthScreen = Dimensions.get("window").width;

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
    width: widthScreen,
  },
  viewNew: {
    backgroundColor: "#141414",
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#868686",
    borderBottomColor: "#868686",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  newFeed: {
    marginLeft: 10,
    color: "white",
    // flexWrap: 'wrap'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    width: (widthScreen * 80) / 100,
  },
  image: {
    height: 100,
    width: 100,
  },
  btnView: {
    width: widthScreen / 3,
    alignItems: "center",
    paddingVertical: 5,
    ...Platform.select({
      ios: {
        backgroundColor: "red",
      },
      android: {
        backgroundColor: "yellow",
      },
      default: {
        backgroundColor: "blue",
      },
    }),
  },
});

export default FetchData;
