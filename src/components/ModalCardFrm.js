import React, { Component } from 'react'
import { COLORS } from '../constants'

class ModalCardFrm extends Component {
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.updateTask({
            id: this.props.task.id,
            color: this.colorInput.value,
            label: this.labelInput.value,
        })
        this.props.closeModal()
    }

    render() {
        const { task } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="sr">Title</label>
                    <textarea
                        className="form-control"
                        defaultValue={task.label}
                        ref={input => this.labelInput = input}
                    />
                </div>
                <div className="form-group">
                    <label className="sr">Card Color</label>
                    <div className="form-group">
                        <select className="form-control" defaultValue={task.color} ref={input => this.colorInput = input}>
                            {COLORS.map((color, i) => <option key={i} value={color}>{color}</option>)}
                        </select>
                    </div>
                    {/* <div className="color-selector-btn-group">
                                {COLORS.map((color, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className={`color-selector-btn bg-${color}`}
                                            onClick={this.handlePickCardColor.bind(this, color)} 
                                        />
                                    )
                                })}
                            </div> 
                            <input type="hidden" value={this.state.color}/> */}
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-primary bg-blue'>Save</button>
                </div>
            </form>
        )
    }
}

export default ModalCardFrm