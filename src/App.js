import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { CardContainer, TrashBox, Modal } from './components'
import { DragDropContext } from 'react-beautiful-dnd'

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

  onDragEnd = (result) => {
    const { 
      changeCardColumn, 
      addCardToColumn, 
      removeCardFromColumn,
      changeCardOrder,
    } = this.props

    if (!result.destination) {
      return;
    }
    
    if (result.source.droppableId === result.destination.droppableId) {
      changeCardOrder(result.source.index, result.destination.index, result.destination.droppableId)
    } else {
      changeCardColumn(
          result.draggableId,
          result.destination.droppableId,
      )
      addCardToColumn(
          result.draggableId,
          result.destination.droppableId,
      )
      removeCardFromColumn(
          result.draggableId, 
          result.source.droppableId,
      )
    }
  }

  render() {
    const { 
      byId,
      addTask, 
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
          <DragDropContext onDragEnd={this.onDragEnd}>
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
            <TrashBox 
              cards={trash}
              purgeCards={purgeCards}
            />
          </DragDropContext>
        <Modal />
      </div>
    )
  }
}

function countTasks(tasks) {
  return Object.keys(tasks).length
}

const mapStateToProps = ({ tasks }) => ({ ...tasks })
export default connect(mapStateToProps, actionCreators)(App)