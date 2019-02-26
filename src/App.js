import React, { Component } from 'react'

import axios from 'axios'
import Cell from './components/cell'

// return (
//   <>
//    <table>
//      <tbody>
//        {this.state.game.map(row => {
//           return (
//               <tr>
//                  {row.map(col => {
//                    return <td>{col}</td>
//                  })}
//               </tr>
//              )
//            })}
//       <tbody>
//    <table>
//   </>

class App extends Component {
  state = {
    game: [[], [], [], [], [], [], [], []],
    id: ''
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0
      })
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board,
          id: resp.data.id
        })
      })
  }
  checkTile = (x, y) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
        {
          id: this.state.id,
          row: x,
          col: y
        }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board
        })
      })
  }

  flagTile = (event, x, y) => {
    event.preventDefault()
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        {
          id: this.state.id,
          row: x,
          col: y
        }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board
        })
      })
  }

  render() {
    return (
      <>
        <main>
          <figure>
            <header className="head">this is a header</header>
            <table>
              <tbody>
                {this.state.game.map((row, x) => {
                  return (
                    <tr key={x}>
                      {row.map((content, y) => {
                        return (
                          <Cell
                            key={y}
                            content={content}
                            rowIndex={x}
                            columnIndex={y}
                            flagTile={this.flagTile}
                            checkTile={this.checkTile}
                          />
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </figure>
        </main>
      </>
    )
  }
}

export default App
