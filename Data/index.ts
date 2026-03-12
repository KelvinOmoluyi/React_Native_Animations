import { Card, TouristCardType } from "../types";
import { MaterialIcons, Entypo, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

export const SWIPE_CARDS_DATA: Card[] = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://images.unsplash.com/photo-1515405295579-ba7f9f92f4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',

  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

export const TOURIST_CARDS_DATA: TouristCardType[] = [
  {
    id: 1,
    text: 'SINDALA ISLAND',
    uri: require('../assets/images/touristCard/nature-image1.png'),
    linkColor: '#00ccffff',
  },
  {
    id: 2,
    text: 'MARGINAL Park',
    uri: require('../assets/images/touristCard/nature-image2.png'),
    linkColor: '#00ff00',
  },
  {
    id: 3,
    text: 'SAHARA DESERT',
    uri: require('../assets/images/touristCard/nature-image3.png'),
    linkColor: '#ffbb00ff',
  },
  {
    id: 4,
    text: 'TROJENA MOUNTAIN',
    uri: require('../assets/images/touristCard/nature-image4.png'),
    linkColor: '#ffffffff',
  },
];

export const TOURIST_CARDS_BG_COLORS = [
  'hsla(192, 100%, 40%, 1.00)',
  'hsla(145, 97%, 30%, 1.00)',
  'hsla(44, 99%, 30%, 1.00)',
  '#cececeff',
];




