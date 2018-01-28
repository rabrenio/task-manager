import React, { Component } from 'react'
import { CardContainer } from './components'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>Board</h1>
        <div className="row">
          <CardContainer
            columnId="backlog"
            label="Backlog" 
          />
          <CardContainer
            columnId="backlog"
            label="In Progress"
          />
          <CardContainer 
            columnId="backlog"
            label="Done"
          />
        </div>
      </div>
    )
  }
}

export default App
