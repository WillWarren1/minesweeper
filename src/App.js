import React, { Component } from 'react'

import axios from 'axios'

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
  checkTile(x, y) {
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
      })
  }

  render() {
    return (
      <>
        <main>
          <figure>
            <section className="head">this is a header</section>
            <table>
              <tbody>
                {this.state.game.map((row, x) => {
                  return (
                    <tr key={x}>
                      {row.map((col, y) => {
                        return (
                          <td key={y} onClick={() => this.checkTile(x, y)}>
                            {col}
                            {x},{y}
                          </td>
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
