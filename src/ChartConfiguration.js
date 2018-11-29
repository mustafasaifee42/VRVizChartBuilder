import React,{Component} from "react";
import DropDownSelect from "./DropDownSelect";
import './Chartconfiguration.css';
import ColorPicker from "./ColorPicker";
import TextField from '@material-ui/core/TextField';
import chartList from "./chartList";

class ChartChooser extends Component {
  constructor(props){
    super(props);
    this.state = {
      attributeMapping:{
        X_Axis:null,
        Y_Axis:null,
        Z_Axis:null,
        Radius:null,
        Sequence:null,
        Colour:null,
        Height:null
      },
      attributeScale:{
        X_Axis:null,
        Y_Axis:null,
        Z_Axis:null,
        Radius:null,
        Sequence:null,
        Colour:null,
        Height:null
      },
      colours:{
      },
      designFeatures:{},
      charts:chartList,
    }
    this.getMapping = this.getMapping.bind(this);
    this.getScale = this.getScale.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateColour = this.updateColour.bind(this);
  }

  getMapping(dimensions,column){
    console.log(dimensions,column)
    let attrMapping = this.state.attributeMapping;
    attrMapping[dimensions.replace(/\s/g, '_')] = column;
    this.setState({
      attributeMapping:attrMapping,
    })
  }
  getScale(dimensions,scaleType){
    console.log(dimensions,scaleType)
    let attrScale = this.state.attributeScale;
    attrScale[dimensions.replace(/\s/g, '_')] = scaleType;
    this.setState({
      attributeScale:attrScale,
    })
  }
  handleChange(event){
    let designFeatures = this.state.designFeatures;
    designFeatures[event.target.id] = event.target.value;
    this.setState({
      designFeatures: designFeatures,
    })
  }
  updateColour(dimensions,colour,valueType){
    console.log(dimensions,colour,valueType)
    let colours = this.state.colours;
    if(!colours[dimensions.replace(/\s/g, '_')])
      colours[dimensions.replace(/\s/g, '_')] = {}
    colours[dimensions.replace(/\s/g, '_')][valueType] = colour
    this.setState({
      colours:colours,
    })
  }
  render() {
    console.log(this.state)
    if((!this.props.chartType) || (!this.props.dataUploaded))
      return(
        <div>
          <div className="container">
            <div className="title">Configure Chart / Graph</div>
              <div className="main">
                <div className="left">
                  <div className="uploadLabel">
                    Configure the chart
                  </div>
                </div>
                <div className="right">
                  <div className="tableText noPadding">
                    Make sure you have uploaded data and selected a chart type
                  </div>
                </div>
              </div>
          </div>
          <div className="container">
            <div className="title">Design Chart / Graph</div>
              <div className="main">
                <div className="left">
                  <div className="uploadLabel">
                    Stylize the chart
                  </div>
                </div>
                <div className="right">
                  <div className="tableText noPadding">
                    Make sure you have uploaded data and selected a chart type
                  </div>
                </div>
              </div>
          </div>
        </div>
      )
    else {
      let options = [],cards = this.state.charts[this.props.chartType.replace(/\s/g, '_')]['attributeRequired'], designCards = this.state.charts[this.props.chartType.replace(/\s/g, '_')]['designFeatures']
      for(let i = 0; i < Object.keys(this.props.keys[0]).length; i++){
        options.push({
          label: Object.keys(this.props.keys[0])[i],
          value: Object.keys(this.props.keys[0])[i]
        })
      }
      let cardsDiv = cards.map((d,i) => {
        return (
          <div className="configurationCards" key={i}>
            <div className="cardContainer">
              {d.title}
            </div>
            <DropDownSelect 
              options={options}
              changedAttribute={d.title}
              getMapping={this.getMapping}
              getScale={this.getScale}
            />
          </div>
        )
      })
      let designCardDivs = designCards.map((d,i) => {
        let inputType; 
        if(d.type === "TextField")
          inputType = <TextField
                        id={d.title.replace(/\s/g, '_')}
                        defaultValue={d.defaultValue}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        fullWidth
                      />
        if(d.type === "ColourPicker"){
          if(!this.state.attributeMapping[d.relatedTo])
            inputType = <div className="colorPickerMain">
                <ColorPicker 
                  updateColour ={this.updateColour} 
                  title={d.title.replace(/\s/g, '_')}
                  valueType={'Value'}
                />
              </div>
          else {
            if(this.state.attributeScale[d.relatedTo] ===  "Ordinal") {
              let uniqueValues=[];
              for(let  i = 0; i < this.props.keys.length; i++){
                if(uniqueValues.indexOf(this.props.keys[i][this.state.attributeMapping[d.relatedTo]]) < 0)
                  uniqueValues.push(this.props.keys[i][this.state.attributeMapping[d.relatedTo]])
              }
              let allColorPicker = uniqueValues.map((d1,i) => {
                return (
                  <div className="colorPickerDiv" key={`colorPickers${i}`}>
                    <span className="colorPickerTitle">{`${d1}:`} </span>
                    <ColorPicker 
                      updateColour ={this.updateColour} 
                      title={d.title.replace(/\s/g, '_')}
                      valueType={d1}
                    />
                  </div>
                )
              })
              inputType = <div>{allColorPicker}</div>
            }
            else {
              inputType = <div>
                  <div className="colorPickerDiv">
                    <span className="colorPickerTitle">Minimum: </span>
                    <ColorPicker 
                      updateColour ={this.updateColour} 
                      title={d.title.replace(/\s/g, '_')}
                      valueType={'Minimum'}
                    />
                  </div>
                  <div className="colorPickerDiv">
                    <span className="colorPickerTitle">Maximum: </span>
                    <ColorPicker 
                      updateColour ={this.updateColour} 
                      title={d.title.replace(/\s/g, '_')}
                      valueType={'Maximum'}
                    />
                  </div>
                </div>
            }
          }
        }
        return (
          <div className="configurationCards" key={i}>
            <div className="cardContainer">
              {d.title}
              {inputType}
            </div>
          </div>
        )

      })
      return(
        <div>
          <div className="container">
            <div className="title">Configure Chart / Graph</div>
            <div className="main">
              <div className="left">
                <div className="uploadLabel">
                  Configure the chart
                </div>
              </div>
              <div className="right">
                {cardsDiv}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="title">Design Chart / Graph</div>
            <div className="main">
              <div className="left">
                <div className="uploadLabel">
                  Stylize the chart
                </div>
              </div>
              <div className="right">
                {designCardDivs}
              </div>
            </div>
          </div>
        </div>
      )
    }
  };
}

export default ChartChooser;