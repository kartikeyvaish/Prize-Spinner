// Packages imports
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, ToastAndroid } from "react-native";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

// Component imports
import Compartments from "./components/Compartments";
import Needle from "./components/Needle";
import PrizeList from "./constants/PrizeList";

export default function App() {
  // Needle rotation value
  const rotateAngle = useSharedValue(0);

  // function to rotate the needle at a random angle between 360 and 1080
  const rotateNeedle = () => {
    resetNeedle();

    // generate random angle
    const randomAngle = Math.floor(Math.random() * 720) + 360;

    // animate
    rotateAngle.value = withTiming(randomAngle, { duration: 3000 }, () => {
      // check at which compartment the needle is pointing
      const winCompartment =
        PrizeList[Math.round((randomAngle - Math.floor(randomAngle / 360) * 360) / (360 / PrizeList.length))];

      runOnJS(ToastAndroid.show)(`You won ${winCompartment.name}`, ToastAndroid.SHORT);
    });
  };

  // reset needle
  const resetNeedle = () => (rotateAngle.value = 0);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.roundBox}>
        {PrizeList.map((prize, index) => {
          return <Compartments key={index} rotateAngle={(360 / PrizeList.length) * (index + 1)} name={prize.name} />;
        })}

        <Needle rotateAngle={rotateAngle} />
      </View>

      <View style={{ marginTop: 50 }}>
        <Button title="Play" onPress={rotateNeedle} color="green" />

        <View style={{ margin: 20 }} />

        <Button title="Reset" onPress={resetNeedle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  roundBox: {
    width: 300,
    height: 300,
    backgroundColor: "dodgerblue",
    borderRadius: 300,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
});
