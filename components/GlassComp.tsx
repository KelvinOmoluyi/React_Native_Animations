import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

type Props = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    gradientColors?: [string, string, ...string[]];
    borderWidth?: number;
    intensity?: number;
}

const GlassComp = ({
    children,
    style,
    gradientColors = ['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99'],
    borderWidth = 1.5,
    intensity = 12
}: Props) => {
    
    // Extract styles
    const flattenedStyle = StyleSheet.flatten(style) || {};
    const borderRadius = (flattenedStyle.borderRadius as number) || 0;
    const justifyContent = flattenedStyle.justifyContent || 'flex-start';
    const alignItems = flattenedStyle.alignItems || 'flex-start';
    const flexDirection = flattenedStyle.flexDirection || 'column';
    const width = flattenedStyle.width;
    const height = flattenedStyle.height;
    const padding = flattenedStyle.padding || 0;
    const rowGap = flattenedStyle.rowGap || 0;
    const columnGap = flattenedStyle.columnGap || 0;

  return (
    <View style={[styles.container, style, { borderRadius }]}>
      {/* Layer 1: The Glass Blur Background */}
      <View style={[StyleSheet.absoluteFill, { borderRadius, overflow: 'hidden' }]}>
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={intensity}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Layer 2: The Gradient Border */}
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <View style={[styles.maskContainer, { borderRadius }]}>
            <View
              style={[
                styles.maskBorder,
                {
                  borderRadius: borderRadius,
                  borderWidth: borderWidth,
                }
              ]}
            />
          </View>
        }
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.1, y: 1 }}
          style={{ flex: 1 }}
        />
      </MaskedView>

      {/* Layer 3: The Content */}
      <View
        style={{
          padding: (padding as number) + borderWidth,
          height: "100%",
          justifyContent,
          alignItems,
          flexDirection,
          rowGap,
          columnGap,
          position: "relative",
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default GlassComp

const styles = StyleSheet.create({
  container: {
    // Base styles
    position: 'relative', // Ensure layers stack correctly
  },
  maskContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskBorder: {
    width: '100%',
    height: '100%',
    borderColor: 'black', // Opaque part of the mask
    backgroundColor: 'transparent', // Transparent center
  },
  innerContentContainer: {
    position: 'absolute',
    overflow: 'hidden',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
})
