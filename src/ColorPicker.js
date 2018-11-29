'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: '#121212',
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = (color) => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
    this.props.updateColour(this.props.title,this.state.color,this.props.valueType)
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          height: '2rem',
          width: '7rem',
          borderRadius: '2px',
          background: this.state.color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <ChromePicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default SketchExample