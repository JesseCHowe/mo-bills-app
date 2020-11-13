import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Card } from "react-native-paper";
import BillCard from "../BillCard/BillCard";

const data = [
  {
    status: "filed",
    bill: "HB1256",
    date: "05/06/20",
    author: "Sara Walsh",
    desc:
      "Modifies provisions relating to personal property tax obligations and motor vehicle, trailer, and boat registration.",
    votes: null,
  },
  {
    status: "in commitee",
    bill: "HB1257",
    date: "05/06/20",
    author: "Sara Walsh",
    desc:
      "Modifies provisions relating to personal property tax obligations and motor vehicle, trailer, and boat registration.",
    votes: {
      ayes: 120,
      noes: 32,
    },
  },
  {
    status: "floor action",
    bill: "HB1258",
    date: "05/06/20",
    author: "Sara Walsh",
    desc:
      "Modifies provisions relating to personal property tax obligations and motor vehicle, trailer, and boat registration.",
    votes: {
      ayes: 120,
      noes: 32,
    },
  },
  {
    status: "sent to senate",
    bill: "HB1259",
    date: "05/06/20",
    author: "Sara Walsh",
    desc:
      "Modifies provisions relating to personal property tax obligations and motor vehicle, trailer, and boat registration.",
    votes: {
      ayes: 120,
      noes: 32,
    },
  },
  {
    status: "truly agreed",
    bill: "HB1260",
    date: "05/06/20",
    author: "Sara Walsh",
    desc:
      "Modifies provisions relating to personal property tax obligations and motor vehicle, trailer, and boat registration.",
    votes: {
      ayes: 120,
      noes: 32,
    },
  },
  {
    status: "sent to governer",
    bill: "HB1261",
    date: "05/06/20",
    author: "Sara Walsh",
    desc:
      "Modifies provisions relating to personal property tax obligations and motor vehicle, trailer, and boat registration.",
    votes: {
      ayes: 120,
      noes: 32,
    },
  },
];

const BillList = ({ navigation }) => {
  return (
    <ScrollView>
      {data.map((d) => {
        return (
          <View key={d.bill}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile", { bill: d })}
            >
              <Card style={styles.card}>
                <BillCard info={d} />
              </Card>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
  },
  card: {
    borderRadius: 0,
    shadowOpacity: 0,
    marginBottom: 10,
  },
});

export default BillList;
