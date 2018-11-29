import React,{Component} from "react";
import CSVReader from "react-csv-reader";
import DataTable from './DataTable';
import './DataUpload.css';

class DataUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.handleForce= this.handleForce.bind(this);
  }
  handleForce(data){
    console.log(data);
    this.setState ({
      data: data,
      error: undefined,
    });
    this.props.onDataUpload(data)
  };
  handleError(error){
    console.log(error)
    this.setState ({
      error: error.message,
      data: undefined,
    });
  };
  render() {
    return (
      <div className="container">
        <div className="title">Load Your Data</div>
        <div className="main">
          <div className="left">
            <div className="uploadLabel">
              Upload a csv from your computer
            </div>
            <CSVReader
              cssClass="react-csv-input"
              label="Upload file"
              inputId="uploadButton"
              onFileLoaded={this.handleForce}
              onError={this.handleError}
              parserOptions={
                {
                  delimiter: "",	// auto-detect
                  newline: "",	// auto-detect
                  quoteChar: '"',
                  escapeChar: '"',
                  header: true,
                  trimHeaders: false,
                  dynamicTyping: true,
                  preview: 0,
                  encoding: "",
                  worker: false,
                  comments: false,
                  step: undefined,
                  complete: undefined,
                  error: undefined,
                  download: false,
                  skipEmptyLines: false,
                  chunk: undefined,
                  fastMode: undefined,
                  beforeFirstChunk: undefined,
                  withCredentials: undefined,
                  transform: undefined
                }
              }
            />
          </div>
          <div className="right">
            <DataTable 
              data = {this.state.data} 
              error = {this.state.error} 
            />
          </div>
        </div>
      </div>
    );
  };
}

export default DataUpload;