import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Cariaco Basin Sampling"
  },
  subcaption: {
    text: "Analysis of O₂ Concentration and Surface Temperature"
  },
  yaxis: [
    {
      plot: [
        {
          value: "O2 concentration",
          connectnulldata: true
        }
      ],
      min: "3",
      max: "6",
      title: "O₂ Concentration (mg/L)"
    },
    {
      plot: [
        {
          value: "Surface Temperature",
          connectnulldata: true
        }
      ],
      min: "18",
      max: "30",
      title: "Surface Temperature (°C)"
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
        height: "800",
        dataSource
      }
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "loading"
        )}
      </div>
    );
  }
}

export default PM25ChartViewer;
