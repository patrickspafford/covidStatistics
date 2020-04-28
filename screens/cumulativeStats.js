import * as React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import { ScrollView } from 'react-native-gesture-handler';
import OptionButton from '../components/OptionButton';
import LineChartSection from '../components/LineChartSection';

const styles = StyleSheet.create({
    pageTitle:{
        textAlign: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: '#0C2340',
    },
    contentContainer: {
      paddingTop: 15,
      backgroundColor: '#0C2340'
    }
  });

export default function cumulativeStats() {
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

    const graphs = [
      {
        icon: "md-sad",
        label: "Positive Test Results",
        title: "Coronavirus Cases in the US Over Time",
        selector: "positive",
        onDataPointClick: (point) => point.value ? setSelectedTestDate(point.value * 1000) : setSelectedTestDate(0),
        selectedData: selectedTestDate,
        metric: "Cases"
      },
      {
        icon: "md-sad",
        label: "Positive Test Results Daily Change",
        title: "Change in US Recorded Coronavirus Cases Over Time",
        selector: "positiveIncrease",
        onDataPointClick: (point) => point.value ? setSelectedPositiveDate(point.value * 1000) : setSelectedPositiveDate(0),
        selectedData: selectedPositiveDate,
        metric: "Cases Increase"
      },
      {
        icon: "md-medkit",
        label: "Hospitalizations",
        title: "US Cumulative Coronavirus Hospitalizations over Time",
        selector: "hospitalized",
        onDataPointClick: (point) => point.value ? setSelectedHospitDate(point.value * 1000) : setSelectedHospitDate(0),
        selectedData: selectedHospitDate,
        metric: "Hospitalizations"
      },
      {
        icon: "md-medkit",
        label: "Hospitalizations Daily Change",
        title: "US Coronavirus Hospitalizations Daily Change over Time",
        selector: "hospitalizedIncrease",
        onDataPointClick: (point) => point.value ? setHospitChange(point.value * 1000) : setHospitChange(0),
        selectedData: hospitChange,
        metric: "Hospit. Change"
      },
      {
        icon: "md-warning",
        label: "Deaths",
        title: "US Cumulative Coronavirus Deaths over Time",
        selector: "death",
        onDataPointClick: (point) => point.value ? setDeath(point.value * 1000) : setDeath(0),
        selectedData: death,
        metric: "Deaths"
      },
      {
        icon: "md-warning",
        label: "Deaths Daily Change",
        title: "US Coronavirus Deaths Daily Change over Time",
        selector: "deathIncrease",
        onDataPointClick: (point) => point.value ? setDeath(point.value * 1000) : setDeath(0),
        selectedData: deathChange,
        metric: "Deaths Increase"
      },
    ]
    return (
        <ScrollView style={styles.container}>
          <View>
            <Image source={require('../assets/images/dc.jpg')}/>
          </View>
          {graphs.map((graph, i) => {
            return (<Collapse key={i}>
              <CollapseHeader>
                  <OptionButton icon={graph.icon} label={graph.label} />
              </CollapseHeader>
              <CollapseBody>
                <LineChartSection title={graph.title} data={data}
                selector={graph.selector} onDataPointClick={graph.onDataPointClick}
                selectedData={graph.selectedData} metric={graph.metric} />
              </CollapseBody>
            </Collapse>)
          })}
        </ScrollView>
    )
}