import React,{Component} from "react";
import './graphChooser.css';
import "react-table/react-table.css";


class ChartChooser extends Component {
  constructor(props){
    super(props);
    this.state = {
      graphList:["Bar Graph","Lollipop Chart","Rectangle Chart","Scatter Plot","Bubble Chart","Connected Scatter Plot","Mesh Plot","Waterfall Plot","Contour Plot","Time Series"]
    }
    this.addActiveClass= this.addActiveClass.bind(this);
  }
  addActiveClass(d) {
    this.setState({
      activeState: d.replace(/\s/g, '_'),
    });
    this.props.onchartSelect(d)
  }
  render() {
    let graphSelection = this.state.graphList.map((d) =>{
      return(
        <div
          className={this.state.activeState === d.replace(/\s/g, '_')? "graphChooser active" : "graphChooser inactive"}
          onClick={() => this.addActiveClass(d)}
          key = {d.replace(/\s/g, '_')}
        >
          {d}
        </div>
      )
    })
    return(
      <div className="container">
      <div className="title">Choose A chart</div>
        <div className="main">
          <div className="left">
            <div className="uploadLabel">
              Choose a 3D chart from the list below
            </div>
          </div>
          <div className="right">
            {graphSelection}
          </div>
        </div>
      </div>
    )
  };
}

export default ChartChooser;