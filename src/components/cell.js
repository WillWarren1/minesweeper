import React, { Component } from 'react'

class Cell extends Component {
  render() {
    if (this.props.content !== 'F') {
      return (
        <td
          onClick={() =>
            this.props.checkTile(this.props.rowIndex, this.props.columnIndex)
          }
          onContextMenu={event =>
            this.props.flagTile(
              event,
              this.props.rowIndex,
              this.props.columnIndex
            )
          }>
          {this.props.content}
        </td>
      )
    } else {
      return (
        <td
          onContextMenu={event =>
            this.props.flagTile(
              event,
              this.props.rowIndex,
              this.props.columnIndex
            )
          }>
          {this.props.content}
        </td>
      )
    }
  }
}

export default Cell
