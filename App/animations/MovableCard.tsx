import { Image, ImageBackground, PanResponder, StatusBar, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Images } from '@/const/images'
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/const/theme'
import GlassComp from '../../components/GlassComp'
// @ts-ignore
import { FontAwesome } from '@expo/vector-icons'

/**
 * MovableCard Component
 * Demonstrates a glassmorphic card that can be dragged and snaps back to its origin.
 * 
 * Key Techniques:
 * - React Native PanResponder for gesture handling.
 * - Animated.ValueXY for tracking position.
 * - Spring animations for "bouncy" snap-back effect.
 */
const MovableCard = () => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy })
    },
    onPanResponderRelease: () => {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        mass: 1,
        stiffness: 100,
        damping: 10,
        useNativeDriver: true,
      }).start();
    },
  })

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground
        source={Images.LeafBackground1}
        style={styles.background}
      >
        <Animated.View style={position.getTranslateTransform()} {...panResponder.panHandlers}>
          <GlassComp
            style={styles.cardContainer}
            gradientColors={COLORS.darkGlass}
          >
            <View style={styles.cardContent}>
              {/* Header: Company Logo & Saved Status */}
              <View style={styles.header}>
                <GlassComp
                  style={styles.logoContainer}
                  borderWidth={1}
                  intensity={25}
                  gradientColors={COLORS.darkGlass}
                >
                  <Image
                    source={Images.googleLogo}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </GlassComp>

                <ActionButton label="Saved" icon="bookmark" />
              </View>

              {/* Body: Job Details */}
              <View style={styles.body}>
                <View style={styles.row}>
                  <Text style={styles.companyName}>Google </Text>
                  <Text style={styles.postDate}>20 Days</Text>
                </View>

                <View style={styles.titleRow}>
                  <Text style={TYPOGRAPHY.h1}>Mobile Developer</Text>
                </View>

                <View style={[styles.row, { marginTop: SPACING.sm, columnGap: SPACING.sm }]}>
                  <Badge label="Full-Time" />
                  <Badge label="Flexible Schedule" />
                </View>
              </View>

              {/* Footer: Salary & Location */}
              <View style={styles.footer}>
                <View style={styles.footerInfo}>
                  <Text style={TYPOGRAPHY.title}>$150 - $220K</Text>
                  <Text style={styles.locationText}>Mountain View, CA</Text>
                </View>

                <GlassComp
                  style={styles.applyButton}
                  borderWidth={0.5}
                  intensity={10}
                  gradientColors={COLORS.darkGlass}
                >
                  <Text style={styles.applyText}>Apply Now</Text>
                </GlassComp>
              </View>
            </View>
          </GlassComp>
        </Animated.View>
      </ImageBackground>
    </>
  )
}

/**
 * Sub-component for Job Tags/Badges
 */
const Badge = ({ label }: { label: string }) => (
  <GlassComp
    style={styles.badge}
    borderWidth={0.5}
    intensity={25}
    gradientColors={COLORS.darkGlass}
  >
    <Text style={styles.badgeText}>{label}</Text>
  </GlassComp>
);

/**
 * Sub-component for Action buttons (e.g., Saved)
 */
const ActionButton = ({ label, icon }: { label: string, icon: string }) => (
  <GlassComp
    style={styles.actionButton}
    borderWidth={0.5}
    intensity={25}
    gradientColors={COLORS.darkGlass}
  >
    <Text style={styles.actionButtonText}>{label}</Text>
    <FontAwesome name={icon as any} size={20} color={COLORS.text} />
  </GlassComp>
);

export default MovableCard

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    height: 450,
    width: 320,
    borderRadius: BORDER_RADIUS.xl,
  },
  cardContent: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 30,
    width: 30,
  },
  body: {
    marginTop: SPACING.xl,
    flex: 1,
    position: "relative"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  titleRow: {
    flexDirection: "row",
    marginTop: SPACING.sm
  },
  companyName: {
    ...TYPOGRAPHY.title,
    color: COLORS.text
  },
  postDate: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary
  },
  badge: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md
  },
  badgeText: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    fontWeight: "600"
  },
  actionButton: {
    height: 35,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md
  },
  actionButtonText: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    fontWeight: "600"
  },
  footer: {
    position: "relative",
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInfo: {
    flex: 1
  },
  locationText: {
    ...TYPOGRAPHY.caption,
    fontSize: 14,
    marginTop: SPACING.xs
  },
  applyButton: {
    height: 45,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md
  },
  applyText: {
    ...TYPOGRAPHY.body,
    fontWeight: "600"
  }
})
