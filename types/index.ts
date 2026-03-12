import { ImageSourcePropType, ViewStyle } from "react-native";

export type Card = {
    id: number;
    text: string;
    uri: string;
}

export type TouristCardType = {
    id: number;
    text: string;
    uri: ImageSourcePropType;
    linkColor: string;
}

/**
 * Base Props for animation components in the playground
 * Recruiter Tip: Consistent prop interfaces make components predictable and easy to integrate.
 */
export interface AnimationComponentProps {
    style?: ViewStyle;
}