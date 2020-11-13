import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Bills from "./Bills";

const BillsRoute = () => <Bills />;

const HomeRoute = () => <Text>Welcome</Text>;


const Main = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home" },
    { key: "bills", title: "Bills"},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    bills: BillsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;
