import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Drawer } from "react-native-paper";
import Constants from "expo-constants";

const data = {
  text:
    "**proposed**This is a set of proposed code text**proposed** Save to get a shareable url. Change code in the editor and watch it change on your phone! **omitted**This text will be omitted code from the bill**omitted**",
};

const testWords = ["code", "phone"];

function structureBillDiagram(bill) {
  let diagram = [];
  //Find Proposed Sections
  let proposedArr = bill.split("**proposed**").map((d, i) => {
    return i % 2
      ? { text: d, feature: "proposed" }
      : { text: d, feature: null };
  });
  //Find Omitted Sections
  proposedArr.map((d) => {
    if (!d.feature) {
      d = d.text.split("**omitted**").map((t, i) => {
        return i % 2
          ? diagram.push({ text: t, feature: "omitted" })
          : diagram.push({ text: t, feature: null });
      });
    }
    diagram.push(d);
  });
  diagram = diagram.filter((d) => d.text);
  //Find Terminology
  testWords.map((wrd) => {
    let newArr = [];
    diagram.map((d, i) => {
      if (d.text.includes(wrd)) {
        const test = d.text.split(wrd);
        test.map((t, j) => {
          if (j % 2 === 0) {
            newArr = [
              ...newArr,
              { text: t, feature: d.feature },
              { text: wrd, feature: d.feature ? `${d.feature}Wrd` : "wrd" },
            ];
          } else {
            newArr.push({ text: t, feature: d.feature });
          }
        });
        return;
      } else {
        newArr.push(d);
        return;
      }
    });
    diagram = newArr;
  });
  //Return Diagram
  return diagram;
}

const billDiagram = structureBillDiagram(data.text);

const BillFull = ({ route }) => {
  const { bill } = route.params;
  const [proposed, setProposed] = useState(false);
  const [omitted, setOmitted] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sessionHeader}>SECOND REGULAR SESSION</Text>
      <Text style={styles.title}>HOUSE BILL NO. {bill.bill}</Text>
      <Text style={styles.assemblyHeader}>100TH GENERAL ASSEMBLY</Text>
      <View style={styles.repHeader}>
        <Text>INTRODUCED BY </Text>
        <Text>REPRESENTATIVE WALSH</Text>
        <View style={styles.line} />
        <Text>AN ACT</Text>
        <Text style={styles.actSummary}>
          To repeal sections 301.025, 301.147, and 306.030, RSMo, and to enact
          in lieu thereof three new sections relating to personal property
          taxes, with penalty provisions.
        </Text>
        <View style={styles.line} />
      </View>

      <Text style={styles.textContainer}>
        {billDiagram.map((d, i) => {
          let styleFeature = d.feature;
          if (proposed && d.feature === "proposed") {
            styleFeature = `${d.feature}Active`;
          }
          if (omitted && d.feature === "omitted") {
            styleFeature = `${d.feature}Active`;
          }
          let theText;
          if (d.feature === "proposedWrd") {
            theText = (
              <TouchableWithoutFeedback
                onPress={() => {
                  alert("You tapped the button!");
                }}
                style={styles[styleFeature]}
              >
                <Text key={`line${i}`} style={styles[styleFeature]}>
                  'TEST'
                </Text>
              </TouchableWithoutFeedback>
            );
          } else {
            theText = (
              <Text key={`line${i}`} style={styles[styleFeature]}>
                {d.text}
              </Text>
            );
          }
          return <React.Fragment>{theText}</React.Fragment>;
        })}
      </Text>

      {/* <View style={filterDrawer.container}>
        <Text style={filterDrawer.header}>Filter By Amendatory Material</Text>
        <Text>A section of a bill that ammends a current law</Text>
        <View style={filterDrawer.filterOption}>
          <Button
            style={[
              filterDrawer.filterBtn,
              proposed ? filterDrawer.proposedBtnActive : null,
            ]}
            mode="contained"
            onPress={() => setProposed(!proposed)}
          >
            Proposed
          </Button>
          <Text>
            Material proposed to be added. Shown as underlined (e.g. the
            performing art).
          </Text>
        </View>
        <View style={filterDrawer.filterOption}>
          <Button
            style={[
              filterDrawer.filterBtn,
              omitted ? filterDrawer.omittedBtnActive : null,
            ]}
            mode="contained"
            onPress={() => setOmitted(!omitted)}
          >
            Omitted
          </Button>
          <Text>
            Material proposed to be removed. Shown as stricken through (e.g.
            music, theatre, dance).
          </Text>
        </View>
      </View> */}
    </View>
  );
};

const filterDrawer = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#F8F7F7",
    top: 0,
    right: 0,
    width: "80%",
    position: "absolute",
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
  filterOption: {
    marginVertical: 10,
  },
  filterBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 0,
    borderColor: "#000",
    borderWidth: 1,
    width: 120,
    shadowOpacity: 0,
  },
  proposedBtnActive: {
    backgroundColor: "#B6EBEB",
  },
  omittedBtnActive: {
    backgroundColor: "#FFB066",
  },
});

const styles = StyleSheet.create({
  actSummary: {
    padding: 10,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#000",
    width: "95%",
  },
  repHeader: {
    alignItems: "center",
    fontFamily: "Georgia",
  },
  sessionHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Georgia",
    marginVertical: 10,
  },
  assemblyHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Georgia",
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Georgia",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
  },
  mainTextContainer: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  textContainer: {
    fontSize: 17,
    lineHeight: 30,
    padding: 10,
  },
  proposed: {
    fontWeight: "bold",
  },
  proposedActive: {
    fontWeight: "bold",
    backgroundColor: "#B6EBEB",
  },
  proposedWrd: {
    fontWeight: "bold",
    // backgroundColor: "#000",
    color: "red",
  },
  omitted: {
    textDecorationLine: "line-through",
  },
  omittedActive: {
    backgroundColor: "#FFB066",
    textDecorationLine: "line-through",
  },
  omittedWrd: {
    textDecorationLine: "line-through",
    backgroundColor: "#000",
    color: "#fff",
  },
  wrd: {
    backgroundColor: "#000",
    color: "#fff",
  },
});

export default BillFull;
