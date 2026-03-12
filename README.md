# ✨ Animation Playground ✨

A premium React Native collection of high-quality, glassmorphic animations and UI components built with **Expo**, **Reanimated**, **Skia**, and **Moti**.

This repository is designed to be a "learnable" resource for developers looking to master modern React Native animation techniques. It features modular components, a centralized design system, and clean, documented code.

---

## 🚀 Tech Stack

- **Framework**: [Expo SDK 54](https://expo.dev/)
- **Animations**:
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) (Shared Values, Worklets)
  - [React Native Skia](https://shopify.github.io/react-native-skia/) (High-performance 2D Graphics)
  - [Moti](https://moti.fyi/) (Declarative Animations)
- **Gestures**: [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- **Styling**: Vanilla StyleSheet with a centralized **Design System**.

---

## 🎨 Design System

To ensure consistency and ease of maintenance, the project uses a centralized theme:
- [**theme.ts**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/const/theme.ts): Contains global tokens for Colors, Spacing, Typography, and Animation configurations.
- [**images.ts**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/const/images.ts): Centralized asset management.
- [**types/index.ts**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/types/index.ts): Global TypeScript interfaces for better IDE support.

---

## 📽️ Animation Showcase

Explore the different animation examples located in the [`App/animations`](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations) directory:

| Animation | Description | Key Techniques |
| :--- | :--- | :--- |
| 🃏 [**MovableCard**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/MovableCard.tsx) | A glassmorphic job card that can be dragged and snaps back to origin. | PanResponder, Animated.spring, Glassmorphism. |
| 📚 [**StackableCards**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/StackableCards.tsx) | An infinite stack of cards with fling-to-dismiss gestures and rotation interpolation. | useSharedValue, useAnimatedStyle, withTiming, Interpolation. |
| ☁️ [**WeatherForecast**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/WeatherForecastCard.tsx) | A detailed, multi-layered weather card with glassmorphic pills and icons. | Modular Styling, Composite Layouts, Image Assets. |
| 🔘 [**CircularControl**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/CircularControl.tsx) | A rotatable knob/control with haptic-like feel. | Gestures, Math (Atan2), Rotation logic. |
| 📄 [**GlassyBottomSheet**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/GlassyBottomSheet.tsx) | A smooth, translucent bottom sheet for modern UI. | @gorhom/bottom-sheet integration. |
| 🎮 [**GameLoader**](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/GameLoader.tsx) | A dynamic loading screen for gaming apps. | Moti animations, Sequencing. |

---

## 🛠️ Getting Started

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/KelvinOmoluyi/React_Native_Animations.git
    cd Animation_playground
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Project**:
    ```bash
    npx expo start
    ```

---

## 👨‍💻 Recruiter Notes

- **Modularity**: Every animation is self-contained yet follows a global design system.
- **Type Safety**: Fully typed with TypeScript to prevent runtime errors and improve developer experience.
- **Performance**: Leverages the Native Thread for animations (Reanimated, Gesture Handler) to ensure 60fps performance even on lower-end devices.

---

Created with ❤️ by **Kelvin Omoluyi**.
