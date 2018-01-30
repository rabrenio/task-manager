import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    trashCard, 
    openModal,
    removeCardFromColumn
} from '../actions'

class Card extends Component {
    static propTypes = {
        task: PropTypes.object.isRequired,
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
        const { task } = this.props

        const { 
            color, 
            label, 
        } = task

        return (
            <div className={`card bg-${color} well`}>
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
        )
    }
}

const mapStateToProps = ({ tasks }, { taskId }) => ({
    task: tasks.byId[taskId]
})

export default connect(
    mapStateToProps, 
    {
        trashCard, 
        openModal,
        removeCardFromColumn,
    }
)(Card)