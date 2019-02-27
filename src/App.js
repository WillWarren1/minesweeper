import React, { Component } from 'react'

import axios from 'axios'
import Cell from './components/cell'

class App extends Component {
  state = {
    game: [[], [], [], [], [], [], [], []],
    id: '',
    gameStatus: ''
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
        if (resp.data.state == 'won') {
          this.setState({
            gameStatus: 'Congrats! You survived'
          })
        } else if (resp.data.state == 'playing') {
          this.setState({
            gameStatus: ''
          })
        } else {
          this.setState({
            gameStatus:
              'We regret to inform you that you have died. If your remains are not removed from the premises we will be forced to evict them from this plane of existence using the force of a neverending onslaught of exploding mines for the rest of eternity.'
          })
        }
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
          <h1>{this.state.gameStatus}</h1>
          <figure>
            <header className="head">Minesweeper: Pastelcore Edition</header>
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
