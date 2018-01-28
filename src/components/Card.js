import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import _ from 'lodash'
import { CARD } from '../constants/itemType'
import { changeCardOrder } from '../actions'

class Card extends Component {
    render() {
        const { task, isDragging, connectDragSource, connectDropTarget } = this.props
        const { label } = task
        const opacity = isDragging ? 0 : 1
        return connectDragSource(connectDropTarget(
            <div className="card well" style={{opacity}}>{label || 'Story #1'}</div>
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
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult && dropResult.status !== item.status) {
            // props.removeCard(item.index)
        }
    }
}

const cardTarget = {
    hover(props, monitor, component) {
        const item = monitor.getItem()
        const draggedItemIndex = item.index
        const hoveredItemIndex = props.index
        const columnId = item.task.columnId

        // Don't replace items with themselves
        if (draggedItemIndex === hoveredItemIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (draggedItemIndex < hoveredItemIndex && hoverClientY < hoverMiddleY) {
            return
        }
        // Dragging upwards
        if (draggedItemIndex > hoveredItemIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        if (props.task.columnId === columnId) {
            item.changeCardOrder(draggedItemIndex, hoveredItemIndex, columnId)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoveredItemIndex
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
    connect(mapStateToProps, { changeCardOrder })
)(Card)