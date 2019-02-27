import React, { Component } from 'react'

import axios from 'axios'

import Row from './components/row'

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
  resetGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0
      })
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data.board,
          id: resp.data.id,
          gameStatus: ''
        })
      })
  }
  checkTile = (x, y) => {
    console.log({ x, y })
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
        if (resp.data.state === 'won') {
          this.setState({
            gameStatus: 'Congrats! You survived'
          })
        } else if (resp.data.state === 'playing') {
          this.setState({
            gameStatus: ''
          })
        } else {
          this.setState({
            gameStatus: 'Be better.'
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
            <header className="head">
              <p>Minesweeper: Pastel Edition</p>
              <button onClick={() => this.resetGame()}>Reset Game</button>
            </header>
            <table>
              <tbody>
                {this.state.game.map((row, x) => {
                  return (
                    <Row
                      key={x}
                      row={row}
                      colIndex={x}
                      flagTile={this.flagTile}
                      checkTile={this.checkTile}
                    />
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
