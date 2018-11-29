import React,{Component} from "react";
import Select from 'react-select';
import { RadioGroup, RadioButton } from 'react-radio-buttons';


class ChartChooser extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: null,
    }
    this.handleChange= this.handleChange.bind(this);
    this.onChange= this.onChange.bind(this);
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.getMapping(this.props.changedAttribute,selectedOption.value)
    console.log(`Option selected:`, selectedOption);
  }
  onChange = (d) => {
    console.log(d)
    this.props.getScale(this.props.changedAttribute,d)
  }
  render() {
    return(
      <div>
        <div className="cardContainerDropDown">
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.props.options}
          />
        </div>
        <div className={this.state.selectedOption === null? "cardContainerDropDown invisible" : "cardContainerDropDown"}>
          <RadioGroup onChange={ this.onChange } horizontal>
            <RadioButton value="Linear">
              Linear
            </RadioButton>
            <RadioButton value="Ordinal">
              Ordinal
            </RadioButton>
          </RadioGroup>
        </div>
      </div>
    )
  };
}

export default ChartChooser;