import { ImageBackground, StatusBar, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Images } from '@/const/images'
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/const/theme'
import GlassComp from '../../components/GlassComp'
// @ts-ignore
import { Ionicons, Feather } from '@expo/vector-icons'

const WIDTH = 340;
const HEIGHT = 390;

/**
 * WeatherForecastCard Component
 * A detailed weather card component utilizing glassmorphism and a rich visual layout.
 * 
 * Key Features:
 * - Dynamic forecast list with highlighted "Today".
 * - Sun cycle progress visualization.
 * - Multi-layered glassmorphic design.
 */
const WeatherForecastCard = () => {
  // Mock data for the forecast section
  const forecastData = [
    { day: 'Today', temp: '10°', low: '1°', image: Images.sunny },
    { day: 'Thu', temp: '10°', low: '1°', image: Images.cloudy },
    { day: 'Fri', temp: '10°', low: '1°', image: Images.stormy },
    { day: 'Sat', temp: '10°', low: '1°', image: Images.sun },
    { day: 'Sun', temp: '10°', low: '1°', image: Images.cloudy },
    { day: 'Mon', temp: '10°', low: '1°', image: Images.rain },
    { day: 'Tue', temp: '10°', low: '1°', image: Images.sunny },
  ]

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground
        source={Images.cloudBackground}
        style={styles.background}
      >
        <GlassComp
          style={styles.mainCard}
          gradientColors={COLORS.glassGradient}
          intensity={20}
          borderWidth={1}
        >
          <View style={styles.contentContainer}>
            {/* Header: Weather Summary */}
            <View style={styles.headerCard}>
              <View style={styles.headerRow}>
                <View style={styles.weatherIconContainer}>
                  <Image source={Images.sunny} style={styles.weatherIcon} />
                </View>

                <View style={styles.headerText}>
                  <Text style={styles.dateText}>Tuesday, 11:56</Text>
                  <Text style={styles.conditionText}>Cloudy 10°C</Text>
                  <Text style={styles.locationText}>Kyiv, Ukraine</Text>
                </View>
              </View>

              {/* Sun Cycle Visualization */}
              <View style={styles.sunCycle}>
                <Feather name="sunrise" size={16} color={COLORS.text} />
                <Text style={styles.sunTime}>4:53 am</Text>
                <View style={styles.separator} />
                <Text style={styles.sunDuration}>15 h 32 m</Text>
                <View style={styles.separator} />
                <Text style={styles.sunTime}>8:13 pm</Text>
                <Feather name="sunset" size={16} color={COLORS.text} />
              </View>
            </View>

            {/* Status: Rain Probabilty */}
            <View style={styles.statusPill}>
              <Ionicons name="rainy" size={18} color="#a8d0e6" />
              <Text style={styles.statusText}>Rain: 90%</Text>
            </View>

            {/* Metrics: Humidity & Wind */}
            <View style={styles.metricsRow}>
              <Metric label="Humidity" value="73%" />
              <Metric label="Wind" value="10 km/h" />
            </View>

            {/* Weekly Forecast List */}
            <View style={styles.forecastRow}>
              {forecastData.map((item, index) => (
                <ForecastPill
                  key={index}
                  item={item}
                  isActive={index === 0}
                />
              ))}
            </View>
          </View>
        </GlassComp>
      </ImageBackground>
    </>
  )
}

/**
 * Sub-component for individual weather metrics
 */
const Metric = ({ label, value }: { label: string, value: string }) => (
  <Text style={styles.metricLabel}>
    {label}: <Text style={styles.metricValue}>{value}</Text>
  </Text>
);

/**
 * Sub-component for daily forecast pills
 */
const ForecastPill = ({ item, isActive }: { item: any, isActive: boolean }) => (
  <View style={[styles.forecastPill, isActive && styles.activePill]}>
    <View style={styles.pillContent}>
      <Text style={styles.pillDay}>{item.day}</Text>
      <Image source={item.image} style={styles.pillIcon} />
      <Text style={styles.pillTemp}>{item.temp}</Text>
      <Text style={styles.pillLow}>{item.low}</Text>
    </View>
  </View>
);

export default WeatherForecastCard

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainCard: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  headerCard: {
    width: "100%",
    gap: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    backgroundColor: "rgba(121, 121, 121, 0.7)"
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  weatherIconContainer: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  weatherIcon: {
    width: 90,
    height: 90
  },
  headerText: {
    justifyContent: 'center',
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  conditionText: {
    ...TYPOGRAPHY.title,
    fontWeight: 'bold',
  },
  locationText: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  sunCycle: {
    width: "100%",
    height: 45,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: "#182929"
  },
  sunTime: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
  },
  sunDuration: {
    ...TYPOGRAPHY.caption,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statusPill: {
    width: "100%",
    height: 45,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#182929"
  },
  statusText: {
    ...TYPOGRAPHY.body,
    marginLeft: SPACING.sm,
    fontWeight: '600'
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    marginVertical: SPACING.lg
  },
  metricLabel: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.7)',
  },
  metricValue: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastPill: {
    width: 40,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  },
  activePill: {
    backgroundColor: "rgba(252, 178, 178, 0.1)"
  },
  pillContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  pillDay: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  pillIcon: {
    width: 30,
    height: 30
  },
  pillTemp: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  pillLow: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  }
})