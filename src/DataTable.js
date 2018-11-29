import React,{Component} from "react";
import './dataTable.css';
import ReactTable from "react-table";
import "react-table/react-table.css";


class DataTable extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    let text = "Upload data"
    if(this.props.error)
      text = this.props.error
    if(!this.props.data)
      return (
        <div className="table">
          <div className="tableText">
            {text}
          </div>
        </div>
      );
    else {
      let keys = Object.keys(this.props.data[0]);
      console.log(this.props.data.length)
      let columns = [];
      for(let i = 0;i < keys.length;i++){
        columns.push({
          Header: keys[i],
          accessor: keys[i],
        })
      }
      return (
        <div className="table">
          <ReactTable
            data={this.props.data}
            columns={columns}
            style={{
              height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
            className="-striped -highlight"
            showPagination= {false}
            pageSize={this.props.data.length}
            sortable={false}
            resizable={false}
          />
        </div>
      )
    }
  };
}

export default DataTable;