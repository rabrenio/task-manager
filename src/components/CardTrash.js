import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CardTrash extends Component {
    static propTypes = {
        task: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div className="col-sm-3 col-md-3 col-lg-2 card-trash">    
                <div className="well">
                    <div className="card-trash__label">{this.props.task.label || 'Story #1'}</div>
                </div>
            </div>
        )
    }
}




const mapStateToProps = ({ tasks }, { taskId }) => ({
    task: tasks.byId[taskId]
})

export default connect(mapStateToProps)(CardTrash)