
  export default function LineChartData(data, selector) {
    const dataObject = {
        labels: data.map(datapoint => datapoint.date),
        datasets: [
            {
                data: data.map(datapoint => datapoint[selector] || 0),
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
            }
        ]
    }
    return dataObject;
  }