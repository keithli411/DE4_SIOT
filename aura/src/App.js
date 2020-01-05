import React, { Component } from 'react';
import './App.css';
import city from './city.jpeg';
import rain from './rain.jpg';
import { Container, Row, Col } from 'react-grid-system';
import scrollToComponent from 'react-scroll-to-component';
import PM25ChartViewer from './Chart.js'


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
                A week-long experiment was setup, with recorded data, data analysis, and an interactive 'suggestions' program shown below.
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
              <div onClick={() => scrollToComponent(this.Suggestions)}> <p className='Content-clicker'>Suggestions</p> </div>
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

          </div>

          <div>
          <section className='Analysis' ref={(section) => {this.Analysis = section; }}>
          <header className="Section-title">
            Analysis
          </header>
          </section>
          </div>


          <div>
          <section className='Suggestions' ref={(section) => {this.Suggestions = section; }}>
          <header className="Section-title">
            Suggestions
          </header>
          </section>
          </div>


        </Container>
      </div>
    );
  }
}

export default App;
