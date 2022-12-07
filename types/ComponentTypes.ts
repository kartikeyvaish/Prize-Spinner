// Packages imports
import { SharedValue } from "react-native-reanimated";

// interface for Compartment component
export interface CompartmentProps {
    rotateAngle?: number;
    name?: string;
    color?: string;
}

// interface for Needle component
export interface NeedleProps {
    rotateAngle?: SharedValue<number>;
}