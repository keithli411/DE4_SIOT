import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import dataFetch from './DataAirQuality_CONVERTED.json';
import schemaFetch from './DataAirQuality_SCHEMA.json';

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataSource = {
  chart: {},
  caption: {
    text: "PM Particle Concentration"
  },
  subcaption: {
    text: "Data collected from Air Quality Sensor"
  },
  yaxis: [
    {
      plot: [
        {
          value: "PM 2.5",
          connectnulldata: true
        }
      ],
      min: "0",
      max: "500",
      title: "Concentration (μg/m³)"
    },
    {
      plot: [
        {
          value: "PM 10",
          connectnulldata: true
        }
      ],
      min: "0",
      max: "500",
      title: "Concentration (μg/m³)"
    }
  ]
};

class PM25ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "1200",
        height: "900",
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

export default PM25ChartViewer;
