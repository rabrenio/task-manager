import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import _ from 'lodash'
import { CARD } from '../constants/itemType'
import { 
    changeCardOrder, 
    trashCard, 
    removeCardFromColumn,
    openModal
} from '../actions'

class Card extends Component {
    static propTypes = {
        task: PropTypes.object.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        changeCardOrder: PropTypes.func.isRequired,
        trashCard: PropTypes.func.isRequired,
    }

    handleTrashCard = () => {
        const { task, trashCard, removeCardFromColumn } = this.props
        const { id, columnId } = task

        removeCardFromColumn(id, columnId)
        trashCard(id)
    }

    handleOpenModal = () => {
        this.props.openModal(this.props.task)
    }
 
    render() {
        const { 
            task, 
            isDragging, 
            connectDragSource, 
            connectDropTarget, 
            // trashCard,
        } = this.props

        const { 
            color, 
            label, 
        } = task

        return connectDragSource(connectDropTarget(
            <div className={`card bg-${color} well`} style={{ opacity: isDragging ? 0 : 1}}>
                <div className="row">
                    <div className="card__label">
                        <p>{label || 'Story #1'}</p>
                    </div>
                    <div className="card__options">
                        <i className="glyphicon glyphicon-edit card__options-btn" onClick={this.handleOpenModal}></i>
                        <i className="glyphicon glyphicon-remove trash-btn card__options-btn" onClick={this.handleTrashCard}></i>
                    </div>
                </div>
            </div>
        ))
    }
}

const cardSource = {
    beginDrag(props) {
        return {
            task: props.task,
            index: props.index,
            changeCardOrder: props.changeCardOrder
        }
    },
    // endDrag(props, monitor) {
    //     const { id, columnId } = props
    //     const dropResult = monitor.getDropResult()

    //     if (dropResult && dropResult.columnId !== columnId) {
    //         // props.changeCardColumn(id, dropResult.columnId)
    //     }
    // }
}

const cardTarget = {
    hover(props, monitor, component) {
        const item = monitor.getItem()
        const dragIndex = item.index
        const dropIndex = props.index
        const columnId = item.task.columnId

        if (dragIndex === dropIndex) {
            return
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
            return
        }
        if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
            return
        }

        if (props.task.columnId === columnId) {
            item.changeCardOrder(dragIndex, dropIndex, columnId)
            monitor.getItem().index = dropIndex
        }
    }
}

const mapStateToProps = ({ tasks }, { taskId }) => ({
    task: tasks.byId[taskId]
})

export default _.flow(
    DropTarget(CARD, cardTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource(CARD, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })),
    connect(
        mapStateToProps, 
        {
            changeCardOrder, 
            trashCard, 
            removeCardFromColumn,
            openModal,
        }
    )
)(Card)