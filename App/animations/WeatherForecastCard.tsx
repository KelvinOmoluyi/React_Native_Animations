import { ImageBackground, StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { Images } from '@/const/images'
import GlassComp from '../../components/GlassComp'
// @ts-ignore
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons'

const WIDTH = 340;
const HEIGHT = 390;
const BORDER_RADIUS = 35;

const WeatherForecastCard = () => {
  // Dummy data for forecast
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
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <GlassComp
            style={styles.mainCard}
            gradientColors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            intensity={20}
            borderWidth={1}
        >
            <View style={styles.contentContainer}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                  <View style={styles.headerSection}>
                      {/* Placeholder for Big Sun/Cloud Image */}
                      <View style={styles.weatherIconPlaceholder}>
                          <Image source={Images.sunny} style={{width: 90, height: 90}} />
                      </View>
                      
                      <View style={styles.headerText}>
                          <Text style={styles.dateText}>Tuesday, 11:56</Text>
                          <Text style={styles.conditionText}>Cloudy 10°C</Text>
                          <Text style={styles.locationText}>Kyiv, Ukraine</Text>
                      </View>
                  </View>

                  {/* Sun Cycle Section */}
                    <View style={styles.sunCycleContent}>
                        <Feather name="sunrise" size={16} color="white" />
                        <Text style={styles.sunTimeText}>4:53 am</Text>
                        <View style={styles.sunProgressLine} />
                        <Text style={styles.sunDurationText}>15 h 32 m</Text>
                        <View style={styles.sunProgressLine} />
                        <Text style={styles.sunTimeText}>8:13 pm</Text>
                        <Feather name="sunset" size={16} color="white" />
                    </View>
                </View>

                {/* Rain Warning Section */}
                  <View style={styles.rainContent}>
                      <Ionicons name="rainy" size={18} color="#a8d0e6" />
                      <Text style={styles.rainText}>Rain: 90%</Text>
                  </View>

                {/* Metrics Row */}
                <View style={styles.metricsRow}>
                    <Text style={styles.metricText}>Humidity: <Text style={styles.metricValue}>73%</Text></Text>
                    <Text style={styles.metricText}>Wind: <Text style={styles.metricValue}>10 km/h</Text></Text>
                </View>

                {/* Forecast Row */}
                <View style={styles.forecastRow}>
                    {forecastData.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.forecastPill, 
                                index === 0 && styles.activeForecastPill // Highlight 'Today'
                            ]}
                        >
                            <View style={styles.forecastContent}>
                                <Text style={styles.forecastDay}>{item.day}</Text>
                                <Image 
                                    source={item.image} 
                                    style={{width: 30, height: 30}} 
                                />
                                <Text style={styles.forecastTemp}>{item.temp}</Text>
                                <Text style={styles.forecastLow}>{item.low}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </GlassComp>
      </ImageBackground>
    </>
  )
}

export default WeatherForecastCard

const styles = StyleSheet.create({
  mainCard: {
    width: WIDTH,
    height: HEIGHT, // Approximate height based on image
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    width: WIDTH,
    height: HEIGHT,
  },
  headerContainer: {
    width: "100%",
    gap: 10,
    borderRadius: BORDER_RADIUS - 10,
    padding: 10,
    backgroundColor: "#797979bb"
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIconPlaceholder: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerText: {
    justifyContent: 'center',
  },
  dateText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 2,
  },
  conditionText: {
    color: 'white',
    fontSize: 22, // Large
    fontWeight: 'bold',
  },
  locationText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  sunCycleContainer: {
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
  },
  sunCycleContent: {
    width: "100%",
    height: 45,
    borderRadius: BORDER_RADIUS - 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: "#182929ff"
  },
  sunTimeText: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 4,
  },
  sunDurationText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  sunProgressLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 5,
    borderStyle: 'dashed', // Dashed line logic would need extra work in RN, using solid for now or dotted border
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  rainContent: {
    width: "100%",
    height: 45,
    marginTop: 18,
    borderRadius: BORDER_RADIUS - 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#182929ff"
  },
  rainText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 18
  },
  metricText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  metricValue: {
    color: 'white',
    fontWeight: 'bold',
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastPill: {
    width: 38,
    height: 100,
    borderRadius: 19,
    overflow: 'hidden',
    backgroundColor: "#ffffff15"
  },
  activeForecastPill: {
    backgroundColor: "#fcb2b215"
     // Specific styling handled by gradient colors in logic
  },
  forecastContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  forecastDay: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    marginBottom: 2,
  },
  forecastTemp: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  forecastLow: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  }
})