export default () => {
  return {
    name: "Animation_playground",
    slug: "Animation_playground",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.kelvinomoluyi.Animation_playground",
    },
    web: {
      favicon: "./assets/images/icon.png",
    },
    extra: {
      eas: {
        projectId: "452a3346-38ab-4afd-9cbb-8b103fab5374",
      },
    },
    plugins: [
      "expo-video"
    ]
  };
};
