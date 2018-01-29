import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { CardContainer, TrashBox, Modal } from './components'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import _ from 'lodash'
class App extends Component {
  handleClick = () => {
    const { 
      trashAllCards,
      backlog,
      inProgress,
      done
    } = this.props

    trashAllCards([...backlog, ...inProgress, ...done])
  }
  render() {
    const { 
      byId,
      addTask, 
      changeCardColumn,
      addCardToColumn, 
      removeCardFromColumn,
      purgeCards,
      backlog, 
      inProgress, 
      done,
      trash,
    } = this.props
    
    return (
      <div className="container-fluid">
        <h1 className="app-title">
          Board&nbsp; 
          <button 
            className="btn bg-red" 
            onClick={this.handleClick}
            disabled={countTasks(byId) === 0 ? true : false}
          >
            DELETE ALL
            </button>
          </h1>
        <div className="row">
          <CardContainer
            columnId="backlog"
            label="Backlog" 
            cards={backlog}
            addTask={addTask}
            changeCardColumn={changeCardColumn}
            addCardToColumn={addCardToColumn}
            removeCardFromColumn={removeCardFromColumn}
          />
          <CardContainer
            columnId="inProgress"
            label="In Progress"
            cards={inProgress}
            addTask={addTask}
            changeCardColumn={changeCardColumn}
            addCardToColumn={addCardToColumn}
            removeCardFromColumn={removeCardFromColumn}
          />
          <CardContainer 
            columnId="done"
            label="Done"
            cards={done}
            addTask={addTask}
            changeCardColumn={changeCardColumn}
            addCardToColumn={addCardToColumn}
            removeCardFromColumn={removeCardFromColumn}
          />
        </div>
        <TrashBox 
          cards={trash}
          purgeCards={purgeCards}
        />
        <Modal />
      </div>
    )
  }
}

function countTasks(tasks) {
  return Object.keys(tasks).length
}

const mapStateToProps = ({ tasks }) => ({ ...tasks })
export default _.flow(
  DragDropContext(HTML5Backend), 
  connect(mapStateToProps, actionCreators)
)(App)