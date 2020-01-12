import React, { Component } from 'react';
import './App.css';
import city from './city.jpeg';
import norm from './data_normalised.png';
import ACF_PM25 from './ACF_PM25.png';
import ACF_PM10 from './ACF_PM10.png';
import ACF_PI from './ACF_PI.png';
import ACF_PP from './ACF_PP.png';
import ACF_WS from './ACF_WS.png';
import ACF_WG from './ACF_WG.png';
import { Container, Row, Col } from 'react-grid-system';
import scrollToComponent from 'react-scroll-to-component';
import PM25ChartViewer from './airqualityChart.js';
import WeatherChartViewer from './weatherChart.js';

class App extends React.Component {

  componentDidMount() {
    scrollToComponent(this.Timeline);
    scrollToComponent(this.Analysis);
    scrollToComponent(this.Suggestions);
  }

  render() {
    return (
      <div className="App">
        <Container>

            <header className="Info-header">
              <p>
                aura - an air quality and weather experiment
              </p>
            </header>

          <Row justify="center">
              <Col>
                <img src={city} alt="city" />
              </Col>

              <Col>
              <p>
                This project attempts to examine the relationship between air quality collected by a sensor and weather patterns within urban areas.
                This relationship has the potential to create urban environments that adapt and respond dynamically to weather, resulting in better living conditions.
              </p>
              <p>
                A week-long experiment was setup, with recorded data, data analysis, and potential improvements shown below.
              </p>
              <a
                className="App-link"
                href="https://darksky.net/dev/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by Dark Sky
              </a>
              <p> DE4 SIOT Coursework - Keith Li </p>
              </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <div onClick={() => scrollToComponent(this.Timeline)}>  <p className='Content-clicker'>Timeline </p></div>
            </Col>
            <Col>
              <div onClick={() => scrollToComponent(this.Analysis)}> <p className='Content-clicker'>Analysis</p> </div>
            </Col>
            <Col>
              <div onClick={() => scrollToComponent(this.Improvements)}> <p className='Content-clicker'>Improvements</p> </div>
            </Col>
          </Row>

          <br />

          <div>
          <section className='Timeline' ref={(section) => {this.Timeline = section; }}>
          <header className="Section-title">
            Timeline
          </header>
          <p> Data was collected from two sources - a PM-particle sensor powered by a Raspberry Pi, and location-specific weather data, provided using the Dark Sky API. </p>
          </section>
            <Row justify="center">
              <PM25ChartViewer />
            </Row>
            <Row justify="center">
              <WeatherChartViewer />
            </Row>

          </div>

          <div>
          <section className='Analysis' ref={(section) => {this.Analysis = section; }}>
          <header className="Section-title">
            Analysis
          </header>
          <p> The datasets were normalised and scaled by a factor of 10. The datasets are visualised together here. </p>
          <Row justify="center">
            <img src={norm} alt="norm" />
          </Row>
          <p> Autocorrelation was performed on six data sources that were deemed significant in their fluctuations over the data collection period, with the potential for patterns. </p>
          <p> PM2.5 Autocorrelation </p>
          <Row justify="center">
            <img src={ACF_PM25} alt="ACF_PM25" />
          </Row>
          <p> PM10 Autocorrelation </p>
          <Row justify="center">
          <img src={ACF_PM10} alt="ACF_PM10" />
          </Row>
          <p> PrecipIntensity Autocorrelation </p>
          <Row justify="center">
            <img src={ACF_PI} alt="ACF_PI" />
          </Row>
          <p> PrecipProbability Autocorrelation </p>
          <Row justify="center">
          <img src={ACF_PP} alt="ACF_PP" />
          </Row>
          <p> WindSpeed Autocorrelation </p>
          <Row justify="center">
            <img src={ACF_WS} alt="ACF_WS" />
          </Row>
          <p> WindGust Autocorrelation </p>
          <Row justify="center">
          <img src={ACF_WG} alt="ACF_WG" />
          </Row>

          </section>
          </div>


          <div>
          <section className='Improvements' ref={(section) => {this.Improvements = section; }}>
          <header className="Section-title">
            Improvements
          </header>
          <p>- Data collection from the sensor took place only at one location, which was within the boundary of interior and exterior spaces of an urban apartment. For future experiments,
          more robust data collection could arise from placing multiple sensors around the observation space (e.g. bedroom, living room, garage), in order to derive more information.</p>
          <p>- Correlation and causation in such experiments cannot be confused, and data collected for this experiment is emperically seen to be limited. More work / data collection is
          required to derive more concrete and confident results.</p>
          <p>- Data collection reliability may also be improved by setting up multiple case studies, such as identical set-ups in different locations / cities. This will benefit the search
          for whether true correlation between the data sources concerned exist.</p>
          </section>
          </div>

          <br />

          <p> © Keith Li 2020 </p>


        </Container>
      </div>
    );
  }
}

export default App;
