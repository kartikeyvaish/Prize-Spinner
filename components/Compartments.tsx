// Packages Imports
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Text } from "react-native";
import { withAnchorPoint } from "react-native-anchor-point";

// Local Imports
import { CARD_COUNT, ROUND_RADIUS } from "../constants/Constants";
import { CompartmentProps } from "../types/ComponentTypes";

// Constants
const CARD_WIDTH = (2 * Math.PI * ROUND_RADIUS) / CARD_COUNT;
const CARD_HEIGHT = ROUND_RADIUS;

// function component for Compartments
function Compartments(props: CompartmentProps) {
  // Destructuring props
  const { rotateAngle = 0, name } = props;

  const getTransform = () => {
    let transform = {
      transform: [{ perspective: 400 }, { rotateZ: `${rotateAngle}deg` }],
    };

    // This ensures that blocks are rotated at an anchor that is bottom middle of the block
    return withAnchorPoint(transform, { x: 0.5, y: 1 }, { width: CARD_WIDTH, height: CARD_HEIGHT });
  };

  // container styles
  const containerStyles: StyleProp<ViewStyle> = [styles.container, getTransform()];

  // render
  return (
    <View style={containerStyles}>
      <Text style={styles.prizeName} adjustsFontSizeToFit={true}>
        {name}
      </Text>
    </View>
  );
}

// exports
export default Compartments;

// styles
const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "absolute",
    bottom: ROUND_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  prizeName: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
});
