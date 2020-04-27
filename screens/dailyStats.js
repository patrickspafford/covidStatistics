import * as React from 'react';
import { BarChart, PieChart, StackedBarChart } from 'react-native-chart-kit'
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import { ScrollView } from 'react-native-gesture-handler';

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

export default function dailyStats() {
    const [states, setStates] = React.useState([])
    const [cases, setCases] = React.useState([])
    const [tested, setTested] = React.useState([])
    const [deaths, setDeaths] = React.useState([])
    const [hospitalized, setHospitalized] = React.useState([])
    React.useEffect( () => {
        async function fetchData() {
            const res = await fetch("https://covidtracking.com/api/states")
            res.json().then(res => {
            let statesArray = []
            let casesArray = []
            let testedArray = []
            let deathsArray = []
            let hospitalizedArray = []
            res.forEach(info => {
                statesArray.push(info.state)
                casesArray.push(info.positive / 1000 || 0)
                testedArray.push(info.totalTestResults / 1000 || 0)
                deathsArray.push(info.death / 1000 || 0)
                hospitalizedArray.push(info.hospitalizedCumulative / 1000 || 0)
            })
            setStates(statesArray)
            setCases(casesArray)
            setTested(testedArray)
            setDeaths(deathsArray)
            setHospitalized(hospitalizedArray)
        })
        .catch(err => console.log(err))
        }
    fetchData();  
    }, []) 
    const barChartConfig = {
        backgroundGradientFrom: `#0C2340`,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: `#0C2340`,
        backgroundGradientToOpacity: 1,
        fillShadowGradient: `rgb(255, 255, 255)`,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 10, // optional, default 3
        barPercentage: 0.9,
    }
    const colors = ["FFFFFF", "000001", "333333", "666666", "999999", "CCCCCC", "CCCC99", "9999CC", "666699", "660000", "663300", "996633", "003300", "003333", "003399", "000066", "330066", "660066", "990000", "993300", "CC9900", "006600", "336666", "0033FF", "000099", "660099", "990066", "CC0000", "CC3300", "FFCC00", "009900", "006666", "0066FF", "0000FF", "9900CC", "FF0099", "CC3333", "FF6600", "FFFF33", "00FF00", "00CCCC", "00CCFF", "3366FF", "9933FF", "FF00FF", "FF6666", "FF6633", "FFFF66", "66FF66", "66CCCC", "00FFFF", "3399FF", "9966FF", "FF66FF", "FF9999", "FF9966", "FFFF99", "99FF99", "66FFCC", "99FFFF", "66CCFF", "9999FF", "FF99FF"]
    let testedChartData = []
    let casesChartData = []
    let deathsChartData = []
    let stackedBarChartData = []
    for (let i = 0; i < states.length; i++) {
        testedChartData.push({
                name: states[i],
                data: tested[i],
                color: `#${colors[i + 5]}`,
                legendFontColor: `#ffffff`,
                legendFontSize: 10
            })
        casesChartData.push({
                name: states[i],
                data: cases[i],
                color: `#${colors[i + 2]}`,
                legendFontColor: `#ffffff`,
                legendFontSize: 10
            })
        deathsChartData.push({
                name: states[i],
                data: deaths[i],
                color: `#${colors[i + 3]}`,
                legendFontColor: `#ffffff`,
                legendFontSize: 10
            })
        let row = [states[i], deaths[i], hospitalized[i], cases[i]]
        stackedBarChartData.push(row)
    }
    
    const compare = (a,b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
    }
    const compareObject = (a, b) => {
        if (a.data < b.data) return 1;
        if (a.data > b.data) return -1;
        return 0;
    }
    stackedBarChartData = stackedBarChartData.sort(compare).slice(0,10);
    testedChartData = testedChartData.sort(compareObject).slice(0, 10)
    casesChartData = casesChartData.sort(compareObject).slice(0, 10);
    deathsChartData = deathsChartData.sort(compareObject).slice(0, 10);
    return (
        <ScrollView style={styles.container}>
            <View>
            <Image source={require('../assets/images/sanfran.jpeg')}/>
            </View>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-medkit" label="Tests by State and Territory" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>Coronavirus Tests by US State and Territory</Text>
                    <ScrollView horizontal={true} style={{alignContent: 'center'}}>
                        <BarChart data={{labels: states, datasets: [{ data: tested }]}} width={1900} height={screenHeight / 4} yAxisSuffix="k" chartConfig={barChartConfig} decimalPlaces={0} fromZero={true} />
                    </ScrollView>
                    <Text style={styles.textStyle}>The 10 States and Territories with the Most Tests</Text>
                    <PieChart width={screenWidth} height={300} data={testedChartData} chartConfig={barChartConfig} accessor="data" paddingLeft="25" hasLegend={true} />
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-sad" label="Cases by State and Territory" />
                </CollapseHeader>
                <CollapseBody>
                <Text style={styles.textStyle}>Coronavirus Cases by US State and Territory</Text>
                    <ScrollView horizontal={true}>
                        <BarChart data={{ labels: states, datasets: [{ data: cases }] }} width={1900} height={screenHeight / 4} yAxisSuffix="k" chartConfig={barChartConfig} decimalPlaces={0} fromZero={true} />
                    </ScrollView>
                    <Text style={styles.textStyle}>The 10 States and Territories with the Most Cases</Text>
                    <PieChart width={screenWidth} height={300} data={casesChartData} chartConfig={barChartConfig} accessor="data" paddingLeft="50" hasLegend={true} /> 
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="md-warning" label="Deaths by State and Territory" />
                </CollapseHeader>
                <CollapseBody>
                    <Text style={styles.textStyle}>Coronavirus Deaths by US State and Territory</Text>
                    <ScrollView horizontal={true}>
                        <BarChart data={{ labels: states, datasets: [{ data: deaths }]}} width={1900} height={screenHeight / 4} yAxisSuffix="k" decimalPlaces={0} chartConfig={barChartConfig} />
                    </ScrollView>
                    <Text style={styles.textStyle}>The 10 States and Territories with the Most Deaths</Text>
                    <PieChart width={screenWidth} height={300} data={deathsChartData} chartConfig={barChartConfig} accessor="data" paddingLeft="25" hasLegend={true} />
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    <OptionButton style={styles.option} icon="ios-podium" label="Combined Stats by State and Territory" />
                </CollapseHeader>
                <CollapseBody>
                    <Text style={styles.textStyle}>The Top 10 States and Territories: Deaths, Hospitalizations, and Cases</Text>
                    <ScrollView horizontal={true} style={{paddingLeft: 15}}>
                        <StackedBarChart data={{ labels: stackedBarChartData.map(data => data[0]), legend: ["Deaths", "Hospitalized", "Cases"],
                        data: stackedBarChartData.map(data => data.slice(1, 4)),barColors: ["#AA0000", "#AAAA00", "#009900"] }} width={800} yAxisSuffix="k"
                        height={screenHeight / 2} decimalPlaces={0} chartConfig={barChartConfig} />
                    </ScrollView>
                </CollapseBody>
            </Collapse>
        </ScrollView>
    )
}