import * as React from 'react';
import { LineChart } from 'react-native-chart-kit'
import { StyleSheet, Text, Dimensions } from 'react-native';
import { CollapseBody} from 'accordion-collapse-react-native'
import { ScrollView } from 'react-native-gesture-handler';
import LineChartData from '../constants/LineChartData';

const lineChartConfig = {
    backgroundGradientFrom: `#0C2340`,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: `#000000`,
    backgroundGradientToOpacity: 0,
    fillShadowGradient: `rgb(255, 255, 255)`,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 10, 
    barPercentage: 0.9,
  }

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        padding: 10
    }
  });
const screenHeight = Dimensions.get("window").height

export default function LineChartSection({title, data, selector, onDataPointClick, selectedData, metric,...props}) {
return (
    <>
    <Text style={styles.textStyle}>{title}</Text>
    <ScrollView horizontal={true} style={{alignContent: 'center', marginLeft: 10}}>
        <LineChart
        data={LineChartData(data, selector)} width={3000} height={screenHeight / 4} yAxisSuffix="k"
        chartConfig={lineChartConfig} onDataPointClick={(point) => onDataPointClick(point)}
        />
    </ScrollView>
    <Text style={styles.textStyle}>Selected Data Point {metric}: {selectedData.toString()}</Text>   
    </>

);

}