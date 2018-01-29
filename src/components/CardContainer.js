import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Card from './Card'
import { CARD } from '../constants/itemType'

class CardContainer extends Component {
    static propTypes = {
        label: PropTypes.string,
        columnId: PropTypes.string.isRequired,
        addTask: PropTypes.func.isRequired,
        cards: PropTypes.array.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
    }

    render() {
        const { label, columnId, addTask, cards, connectDropTarget } = this.props
        
        return connectDropTarget(
            <div className="col-sm-4">
                <div className="card-outer-container">
                    <div className="card-container">
                        <div className="card-container__label">
                            <strong>{label}</strong> 
                        </div>
                        <div className="card-container__content">
                            {cards.map((taskId, index) => <Card key={taskId} index={index} taskId={taskId}/>)}
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
        )
    }
}

const cardTarget = {
    drop(props, monitor, component) {
        const { 
            columnId, 
            changeCardColumn,
            addCardToColumn, 
            removeCardFromColumn 
        } = props
        
        const sourceObj = monitor.getItem()

        if (columnId !== sourceObj.task.columnId) {
            changeCardColumn(
                sourceObj.task.id,
                columnId,
            )
            addCardToColumn(
                sourceObj.task.id, 
                columnId,
            )
            removeCardFromColumn(
                sourceObj.task.id, 
                sourceObj.task.columnId,
            )
        }

        return {
            columnId
        }
    }
}

export default DropTarget(CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(CardContainer)