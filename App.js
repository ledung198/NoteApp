import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Content from "./components/Content";
import FetchData from "./components/fetchData";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CreateNote from "./components/CreateNote";

export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="NewFeed"
          component={FetchData}
          options={{ title: "NewFeed" }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          options={{ title: "Content" }}
        />
        <Stack.Screen
          name="AddNote"
          component={CreateNote}
          options={{ title: "AddNote" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
  },
  textBar: {
    paddingHorizontal: 20,
    marginBottom: 50,
    backgroundColor: "#fff",
  },
});
