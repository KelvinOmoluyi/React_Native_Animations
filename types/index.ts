import { ImageSourcePropType } from "react-native";

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