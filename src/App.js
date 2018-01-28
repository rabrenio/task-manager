import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTask } from './actions'
import { CardContainer } from './components'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import _ from 'lodash'

class App extends Component {
  render() {
    const { addTask, backlog, inProgress, done } = this.props
    return (
      <div className="container-fluid">
        <h1>Board</h1>
        <div className="row">
          <CardContainer
            columnId="backlog"
            label="Backlog" 
            cards={backlog}
            addTask={addTask}
          />
          <CardContainer
            columnId="inProgress"
            label="In Progress"
            cards={inProgress}
            addTask={addTask}
          />
          <CardContainer 
            columnId="done"
            label="Done"
            cards={done}
            addTask={addTask}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ ...tasks })
export default _.flow(DragDropContext(HTML5Backend), connect(mapStateToProps, { addTask }))(App)