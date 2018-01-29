import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CardTrash from './CardTrash'

class TrashBox extends Component {
    static propTypes = {
        cards: PropTypes.array,
        purgeCards: PropTypes.func.isRequired,
    }

    handleClick = () => {
        const { purgeCards, cards } = this.props
        purgeCards(cards)
    }

    render() {
        const { cards } = this.props
 
        return (
            <Fragment>
                <h2>
                    Trash Box&nbsp;
                    <button 
                        className="btn bg-red" 
                        onClick={this.handleClick}
                        disabled={cards.length === 0 ? true : false}
                    >
                        PURGE
                    </button>
                </h2>
                <div className="container-fluid trashbox">
                    <div className="row">
                         {cards.map((taskId) => <CardTrash key={taskId} taskId={taskId} />)} 
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default TrashBox