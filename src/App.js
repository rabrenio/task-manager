import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import { CardContainer, TrashBox, Modal } from './components'
import { DragDropContext } from 'react-beautiful-dnd'

class App extends Component {

  static propTypes = {
    addTask: PropTypes.func.isRequired,
    purgeCards: PropTypes.func.isRequired,
    changeCardColumn: PropTypes.func.isRequired,
    addCardToColumn: PropTypes.func.isRequired,
    removeCardFromColumn: PropTypes.func.isRequired,
    changeCardOrder: PropTypes.func.isRequired,
    byId: PropTypes.object.isRequired,
    backlog: PropTypes.array.isRequired,
    inProgress: PropTypes.array.isRequired,
    done: PropTypes.array.isRequired,
    trash: PropTypes.array.isRequired,
  }

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
        result.destination.index,
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
            disabled={
              backlog.length === 0 
              && inProgress.length === 0 
              && done.length ===0 ? true : false
            }
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

const mapStateToProps = ({ tasks }) => ({ ...tasks })
export default connect(mapStateToProps, actionCreators)(App)