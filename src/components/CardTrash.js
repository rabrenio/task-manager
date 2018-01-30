import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { recoverCard, addTask } from '../actions'
import { connect } from 'react-redux'

class CardTrash extends Component {
    static propTypes = {
        task: PropTypes.object.isRequired,
        recoverCard: PropTypes.func.isRequired,
    }

    handleClick = () => {
        const { taskId, recoverCard, addTask } = this.props
        recoverCard(taskId)
        addTask({ 
            id: taskId, 
            columnId: 'backlog',
            isTrashed: true,
        })
    }

    render() {
        return (
            <div className="col-sm-3 col-md-3 col-lg-2 card-trash">    
                <div className="well">
                    <div className="card-trash__label">
                        <span>{this.props.task.label || 'Story #1'}</span>
                        <div className="card__options">
                            <i 
                                className="glyphicon glyphicon-repeat card__options-btn" 
                                onClick={this.handleClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




const mapStateToProps = ({ tasks }, { taskId }) => ({
    task: tasks.byId[taskId]
})

export default connect(mapStateToProps, { recoverCard, addTask })(CardTrash)