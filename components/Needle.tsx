// Packages Imports
import { useState } from "react";
import { View, StyleSheet, LayoutChangeEvent, Animated } from "react-native";
import { withAnchorPoint } from "react-native-anchor-point";
import { runOnJS, SharedValue, useAnimatedReaction } from "react-native-reanimated";

// interface for Needle component
export interface NeedleProps {
  rotateAngle?: SharedValue<number>;
}

// function component for Needle
function Needle(props: NeedleProps) {
  // Destructuring props
  const { rotateAngle } = props;

  // Local States
  const [Dimensions, SetDimensions] = useState({ width: 0, height: 0 });
  const [RotateAngle, SetRotateAngle] = useState(0);

  useAnimatedReaction(
    () => runOnJS(SetRotateAngle)(rotateAngle.value),
    (result, previous) => {},
    [rotateAngle]
  );

  // get transforms
  const getTransform = () => {
    let transform: any = {
      transform: [{ perspective: 400 }, { rotateZ: `${RotateAngle}deg` }],
    };

    // This ensures that blocks are rotated at an anchor that is bottom middle of the block
    return withAnchorPoint(transform, { x: 0.5, y: 1 }, Dimensions);
  };

  // onlayout of the outer container set the dimensions of the needle
  const onLayout = (e: LayoutChangeEvent) =>
    SetDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height });

  // render
  return (
    <Animated.View onLayout={onLayout} style={[styles.needleContainer, getTransform()]}>
      <View style={[styles.container]}></View>
    </Animated.View>
  );
}

// exports
export default Needle;

// styles
const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 6,
    borderBottomWidth: 90,
    borderLeftWidth: 6,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "orange",
    borderLeftColor: "transparent",
  },
  needleContainer: {
    position: "absolute",
    bottom: 150,
    zIndex: 15,
  },
});

// width: 0,
//      height: 0,
//      backgroundColor: 'transparent',
//      borderStyle: 'solid',
//      borderTopWidth: 0,
//      borderRightWidth: 45,
//      borderBottomWidth: 90,
//      borderLeftWidth: 45,
//      borderTopColor: 'transparent',
//      borderRightColor: 'transparent',
//      borderBottomColor: 'red',
//      borderLeftColor: 'transparent',
