import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import dataFetch from './DataWeather_CONVERTED.json';
import schemaFetch from './DataWeather_SCHEMA.json';

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataSource = {
  chart: {},
  caption: {
    text: "Weather API Data"
  },
  subcaption: {
    text: "Data collected from Weather API Requests"
  },
  yaxis: [
    // {
    //   plot: [
    //     {
    //       value: "Pressure",
    //       connectnulldata: true
    //     }
    //   ],
    //   min: "0",
    //   max: "1500",
    //   title: "Hectopascals"
    // },
    // {
    //   plot: [
    //     {
    //       value: "Precipitation Intensity",
    //       connectnulldata: true
    //     }
    //   ],
    //   min: "0",
    //   max: "500",
    //   title: "mm per hour"
    // },
    // {
    //   plot: [
    //     {
    //       value: "Precipitation Probability",
    //       connectnulldata: true
    //     }
    //   ],
    //   min: "0",
    //   max: "500",
    //   title: "mm per hour"
    // },
    // {
    //   plot: [
    //     {
    //       value: "Wind Speed",
    //       connectnulldata: true
    //     }
    //   ],
    //   min: "0",
    //   max: "500",
    //   title: "m/s"
    // },
    // {
    //   plot: [
    //     {
    //       value: "Wind Gust",
    //       connectnulldata: true
    //     }
    //   ],
    //   min: "0",
    //   max: "500",
    //   title: "m/s"
    // }
  ]
};

class WeatherChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "1200",
        height: "1200",
        dataSource
      }
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
      const data = dataFetch;
      const schema = schemaFetch;
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
  }

  render() {
    return (
      <div>
      <div>{schemaFetch[0].name}</div>
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "loading"
        )}
      </div>
      </div>
    );
  }
}

export default WeatherChartViewer;
