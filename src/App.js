import React, { Component } from 'react';
import DataUpload from './DataUpload';
import ChartChooser from './ChartChooser';
import ChartConfiguration from './ChartConfiguration';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploaded: false
    }
    this.getData= this.getData.bind(this);
    this.chartSelect = this.chartSelect.bind(this);
  }
  getData(data){
    this.setState({
      uploaded: true,
      data: data,
    })
  }
  chartSelect(chart){
    this.setState({
      chartSelected: chart,
    })
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <span className="bold">VRViz</span>ChartBuilder
          </div>
          <div className="menu">
            About
          </div>
        </div>
        <DataUpload 
          onDataUpload={this.getData}
        />
        <ChartChooser 
          dataUploaded={this.state.uploaded}
          onchartSelect={this.chartSelect}
        />
        <ChartConfiguration
          chartType={this.state.chartSelected}
          dataUploaded={this.state.uploaded}
          keys={this.state.data}
        />
        
      </div>
    );
  }
}

export default App;
