import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from 'react-native-chart-kit'
import { Ionicons } from '@expo/vector-icons';
import { Image, Platform, StyleSheet, Text, ListItem, TouchableOpacity, View, Dimensions } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    pageTitle:{
        textAlign: 'center'
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        padding: 10
    },
    container: {
      flex: 1,
      backgroundColor: '#0C2340',
    },
    contentContainer: {
      paddingTop: 15,
      backgroundColor: '#0C2340'
    },
    optionIconContainer: {
      marginRight: 12,
    },
    option: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#0C2340',
      flexDirection: 'row'
    },
    lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
    },
  });
function OptionButton({ icon, label }) {
    return (
        <View style={styles.option}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={icon} size={22} color="rgba(0,0,0, 1)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </View>
    );
  }
export default function statsOverTime() {
    const [data, setData] = React.useState([])
    const [selectedTestDate, setSelectedTestDate] = React.useState(0)
    const [selectedPositiveDate, setSelectedPositiveDate] = React.useState(0)
    const [selectedHospitDate, setSelectedHospitDate] = React.useState(0)
    const [hospitChange, setHospitChange] = React.useState(0)
    const [death, setDeath] = React.useState(0)
    const [deathChange, setDeathChange] = React.useState(0)
    React.useEffect( () => {
        async function fetchData() {
            const res = await fetch("https://covidtracking.com/api/us/daily")
            res.json().then(res => {
              let dataArray = []
            res.forEach(info => {
               let data = {
                 date: `${info.date.toString().slice(5, 6)}/${info.date.toString().slice(6, info.date.length)}`,
                 deathIncrease: info.deathIncrease / 1000,
                 death: info.death / 1000,
                 hospitalized: info.hospitalized / 1000,
                 positive: info.positive / 1000,
                 positiveIncrease: info.positiveIncrease / 1000,
                 hospitalizedIncrease: info.hospitalizedIncrease / 1000
               }
               dataArray.push(data)
            }) 
            setData(dataArray.reverse())
        })
        .catch(err => console.log(err))
        }
    fetchData();  
    }, []) 
    const lineChartConfig = {
        backgroundGradientFrom: `#0C2340`,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: `#000000`,
        backgroundGradientToOpacity: 0,
        fillShadowGradient: `rgb(255, 255, 255)`,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 10, // optional, default 3
        barPercentage: 0.9,
    }
    const testLineChartData = {
      labels: data.map(point => point.date || 0),
      datasets: [
        {
          data: data.map(point => point.positive || 0),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }
      ]
    }
    const testChangeLineChartData = {
      labels: data.map(point => point.date),
      datasets: [
        {
          data: data.map(point => point.positiveIncrease),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }
      ]
    }
    const hospitLineChartData = {
      labels: data.map(point => point.date),
      datasets: [
        {
          data: data.map(point => point.hospitalized || 0),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }
      ]
    }
    const hospitChangeLineChartData = {
      labels: data.map(point => point.date),
      datasets: [
        {
          data: data.map(point => point.hospitalizedIncrease),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }
      ]
    }
    const deathLineChartData = {
      labels: data.map(point => point.date),
      datasets: [
        {
          data: data.map(point => point.death || 0),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }
      ]
    }
    const deathChangeLineChartData = {
      labels: data.map(point => point.date),
      datasets: [
        {
          data: data.map(point => point.deathIncrease || 0),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }
      ]
    }

    return (
        <ScrollView style={styles.container}>
          <View>
            <Image source={require('../assets/images/dc.jpg')}/>
            </View>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-sad" label="Positive Test Results" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>Coronavirus Cases in the US Over Time</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
                        <LineChart
                        data={testLineChartData} width={3000} height={screenHeight / 4} yAxisSuffix="k"
                        chartConfig={lineChartConfig} onDataPointClick={(point) => point.value ? setSelectedTestDate(point.value * 1000) : setSelectedTestDate(0)}
                        />
                    </ScrollView>
                    <Text style={styles.textStyle}>Selected Data Point Cases: {selectedTestDate.toString()}</Text>   
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-sad" label="Positive Test Results Daily Change" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>Change in US Recorded Coronavirus Cases Over Time</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
                        <LineChart
                        data={testChangeLineChartData} width={3000} height={screenHeight / 4} yAxisSuffix="k"
                        chartConfig={lineChartConfig} onDataPointClick={(point) => point.value ? setSelectedPositiveDate(point.value * 1000) : setSelectedPositiveDate(0)}
                        />
                    </ScrollView>
                    <Text style={styles.textStyle}>Selected Data Point Cases: {selectedPositiveDate.toString()}</Text>   
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-medkit" label="Hospitalizations" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>US Cumulative Coronavirus Hospitalizations over Time</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
                        <LineChart
                        data={hospitLineChartData} width={3000} height={screenHeight / 4} yAxisSuffix="k"
                        chartConfig={lineChartConfig} onDataPointClick={(point) => point.value ? setSelectedHospitDate(point.value * 1000) : setSelectedHospitDate(0)}
                        />
                    </ScrollView>
                    <Text style={styles.textStyle}>Selected Data Point Hospitalizations: {selectedHospitDate.toString()}</Text>   
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-medkit" label="Hospitalizations Daily Change" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>US Coronavirus Hospitalizations Daily Change over Time</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
                        <LineChart
                        data={hospitChangeLineChartData} width={3000} height={screenHeight / 4} yAxisSuffix="k"
                        chartConfig={lineChartConfig} onDataPointClick={(point) => point.value ? setHospitChange(point.value * 1000) : setHospitChange(0)}
                        />
                    </ScrollView>
                    <Text style={styles.textStyle}>Selected Data Point Hospitalizations: {hospitChange.toString()}</Text>   
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-warning" label="Deaths" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>US Cumulative Coronavirus Deaths over Time</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
                        <LineChart
                        data={deathLineChartData} width={3000} height={screenHeight / 4} yAxisSuffix="k"
                        chartConfig={lineChartConfig} onDataPointClick={(point) => point.value ? setDeath(point.value * 1000) : setDeath(0)}
                        />
                    </ScrollView>
                    <Text style={styles.textStyle}>Selected Data Point Deaths: {death.toString()}</Text>   
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-warning" label="Deaths Daily Change" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>US Coronavirus Deaths Daily Change over Time</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
                        <LineChart
                        data={deathChangeLineChartData} width={3000} height={screenHeight / 4} yAxisSuffix="k"
                        chartConfig={lineChartConfig} onDataPointClick={(point) => point.value ? setDeathChange(point.value * 1000) : setDeathChange(0)}
                        />
                    </ScrollView>
                    <Text style={styles.textStyle}>Selected Data Point Death Daily Change: {deathChange.toString()}</Text>   
                </CollapseBody>
            </Collapse>
        </ScrollView>
    )
}