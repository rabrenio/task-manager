import React, { Component } from 'react'
import Card from './Card'

export default class CardContainer extends Component {
    render() {
        const { label } = this.props
        return (
            <div className="col-sm-4">
                <div className="card-container">
                    <div className="card-container__label">
                        {label} <a href="#">add tasks</a>
                    </div>
                    <div className="card-container__content">
                        <Card label="Story #1" />
                    </div>
                </div>
            </div>
        )
    }
}