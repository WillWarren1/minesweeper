import React, { Component } from 'react'
import Cell from './cell'

class Row extends Component {
  render() {
    return (
      <tr>
        {this.props.row.map((content, y) => {
          return (
            <Cell
              key={y}
              content={content}
              rowIndex={this.props.colIndex}
              columnIndex={y}
              flagTile={this.props.flagTile}
              checkTile={this.props.checkTile}
            />
          )
        })}
      </tr>
    )
  }
}

export default Row
