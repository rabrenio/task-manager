import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import Card from './Card'
import { CARD } from '../constants/itemType'

class CardContainer extends Component {
    render() {
        const { label, columnId, addTask, cards, connectDropTarget } = this.props
        const fakeString = ['foo', 'bar', 'lorem', 'ipsum']
        
        return connectDropTarget(
            <div className="col-sm-4">
                <div className="card-container">
                    <div className="card-container__label">
                        {label} <span className="btn btn-link" onClick={addTask.bind(null, {
                            columnId,
                            label: fakeString[Math.floor(Math.random() * fakeString.length)],
                            backgroundColor: 'white',
                        })}>add tasks</span>
                    </div>
                    <div className="card-container__content">
                        {cards.map((taskId, index) => <Card key={taskId} index={index} taskId={taskId}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

const cardTarget = {
    drop(props, monitor, component) {
        // const { id } = props;
        // const sourceObj = monitor.getItem();
        // if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
        // return {
        //     listId: id
        // };
    }
}

export default DropTarget(CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(CardContainer)