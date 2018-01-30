import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Card from './Card'

export default class CardContainer extends Component {
    static propTypes = {
        label: PropTypes.string,
        columnId: PropTypes.string.isRequired,
        addTask: PropTypes.func.isRequired,
        cards: PropTypes.array.isRequired,
    }

    render() {
        const { label, columnId, addTask, cards } = this.props
        
        return (
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                <div ref={provided.innerRef} className="col-sm-4">
                    <div className="card-outer-container">
                        <div className="card-container">
                            <div className="card-container__label">
                                <strong>{label}</strong> 
                            </div>
                            <div className="card-container__content">
                                {cards.map((taskId, index) => (
                                    <Draggable key={taskId} draggableId={taskId} index={index}>
                                        {(provided, snapshot) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(provided.draggableProps.style)}
                                            >
                                                <Card taskId={taskId} />
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                        <footer className="card-container-options">
                            <span className="btn btn-link" onClick={addTask.bind(null, {
                                columnId,
                                label: 'Story #1',
                                color: 'white',
                            })}>Add card...</span>
                        </footer>
                    </div>
                </div>
                )}
            </Droppable>
        )
    }
}

const getItemStyle = (draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  margin: '0 0 10px 0',

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});