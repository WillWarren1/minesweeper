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
    game: [[], [], [], [], [], [], [], []]
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: 0
      })
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
          <section className="head">this is a header</section>
          <table>
            <tbody>
              {this.state.game.map(row => {
                return (
                  <tr>
                    {row.map(col => {
                      return <td>{col}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </>
    )
  }
}

export default App
