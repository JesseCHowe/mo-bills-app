import React from "react";
import { Text, View, StyleSheet } from "react-native";
import globalStyles from "../../../GlobalStyles";

const BillCard = ({ info }) => {
  let voteView;
  if (info.votes) {
    const totalVotes = info.votes.ayes + info.votes.noes;
    voteView = (
      <View style={styles.voteContainer}>
        <Text style={styles.votes}>Vote: </Text>
        <Text style={styles.votes}>Ayes </Text>
        <Text style={[styles.votes, styles.ayes]}>
          {((info.votes.ayes / totalVotes) * 100).toFixed(0)}%{" "}
        </Text>
        <Text style={styles.votes}>Noes </Text>
        <Text style={(styles.votes, styles.noes)}>
          {((info.votes.noes / totalVotes) * 100).toFixed(0)}%
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.status, globalStyles[info.status.split(" ").join("")]]}
      >
        <Text
          style={[
            styles.statusText,
            globalStyles[`${info.status.split(" ").join("")}Text`],
          ]}
        >
          {info.status}
        </Text>
      </View>

      <View style={styles.meta}>
        <Text>{info.bill}</Text>
        <Text>{info.date}</Text>
      </View>

      <View style={styles.desc}>
        <Text style={styles.author}>{info.author}</Text>
        <Text style={styles.paragraph}>{info.desc}</Text>
      </View>

      {voteView}
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    fontWeight: "bold",
    paddingVertical: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  status: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    width: "100%",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  meta: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paragraph: {
    marginTop: 0,
    fontSize: 14,
    paddingVertical: 5,
  },
  desc: {
    paddingHorizontal: 10,
    width: "100%",
  },
  voteContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  ayes: {
    color: "green",
    fontWeight: "bold",
  },
  noes: {
    color: "red",
    fontWeight: "bold",
  },
});

export default BillCard;
