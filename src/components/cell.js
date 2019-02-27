import React, { Component } from 'react'

class Cell extends Component {
  render() {
    let classStyle = 'hidden'
    let picture = this.props.content
    switch (picture) {
      case ' ':
        classStyle = 'hidden'
        break
      case '*':
        picture = '💣'
        classStyle = 'revealed-class'
        break
      case 'F':
        picture = '🚩'
        classStyle = 'hidden'
        break
      case '_':
        picture = ''
        classStyle = 'revealed-class'
        break
      case '@':
        picture = '🎉'
        classStyle = 'revealed-class'
        break
      default:
        picture = this.props.content
        classStyle = 'revealed-class'
    }
    if (this.props.content !== 'F') {
      return (
        <td
          className={classStyle}
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
          {picture}
        </td>
      )
    } else {
      return (
        <td
          className={classStyle}
          onContextMenu={event =>
            this.props.flagTile(
              event,
              this.props.rowIndex,
              this.props.columnIndex
            )
          }>
          {picture}
        </td>
      )
    }
  }
}

export default Cell
