import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BillList from "./Bills/BillsList/BillList";
import BillFull from "./Bills/BillFull/BillFull";

const HomeScreen = ({ navigation }) => <BillList navigation={navigation} />;
const ProfileScreen = ({ route }) => <BillFull route={route}/>

const Stack = createStackNavigator();

const Bills = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Bills" }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Bills;
