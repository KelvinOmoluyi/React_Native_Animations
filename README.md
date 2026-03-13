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

## 📽️ Animation Gallery

Explore the collection of custom animations. Each example is designed to showcase specific React Native techniques.

### 🃏 [Movable Card](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/MovableCard.tsx)
A high-end glassmorphic job card featuring interactive dragging. 
- **What it does**: Users can drag the card anywhere on the screen. Upon release, it uses a spring animation to "snap" back to its original position.
- **Key Techniques**: `PanResponder` for complex gesture tracking, `Animated.spring` for the physics-based return.

### 📚 [Stackable Cards](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/StackableCards.tsx)
An elegant infinite card stack with fluid transitions.
- **What it does**: Swipe the top card left to dismiss it. The card snaps off-screen, and the stack automatically cycles the next card to the top, allowing for endless swiping.
- **Key Techniques**: `useSharedValue`, `useAnimatedStyle`, `interpolation` for background card scaling, and `Gesture Handler Pan`.

### ☁️ [Weather Forecast](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/WeatherForecastCard.tsx)
A detailed, data-driven weather UI with a premium glassmorphic feel.
- **What it does**: Displays current weather, sun cycles, and a weekly forecast using a sophisticated multi-layered glass layout.
- **Key Techniques**: Modular component architecture, composite styling with `BlurView`, and image asset optimization.

### 🔘 [Circular Control](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/CircularControl.tsx)
A rotatable knob/dial for precise value selection.
- **What it does**: A realistic 360° rotatable knob with haptic-like tick marks. The UI updates dynamically based on the rotation angle.
- **Key Techniques**: Math-heavy logic (`atan2`), `react-native-svg` for dynamic tick marks, and `useDerivedValue` for real-time data updates.

### 🃏 [Swipe Cards](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/SwipeCards.tsx)
A classic deck-style swiping interaction (Tinder-style).
- **What it does**: Allows users to swipe through a deck of cards with smooth overlay feedback.
- **Key Techniques**: `reanimated-2` gesture logic and high-performance list rendering.

### 🎮 [Game Loader](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/GameLoader.tsx)
A dynamic, engaging loading sequence for gaming interfaces.
- **What it does**: Uses declarative animations to create a polished, "living" loader that feels responsive.
- **Key Techniques**: `Moti` for simple, powerful entry/exit animations and sequenced transitions.

### 📍 [Tourist Card](file:///c:/Users/USER/Documents/React%20native%20projects/Animation_playground/App/animations/TouristCard.tsx)
A travel-themed UI component with smooth layout transitions.
- **What it does**: Showcases destination details with high-quality imagery and integrated animation states.
- **Key Techniques**: Custom layout animations and shared element-like transitions.

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
