import React, { Component } from 'react'
import { connect } from 'react-redux'
import RBModal from 'react-bootstrap-modal'
import 'react-bootstrap-modal/lib/css/rbm-patch.css'
import ModalCardFrm from './ModalCardFrm'
import ModalIntro from './ModalIntro'
import { closeModal, updateTask } from '../actions'

class Modal extends Component {
    render() {
        const { show, closeModal, updateTask, task } = this.props
    
        return (
            <RBModal
                show={show}
                onHide={closeModal}
                aria-labelledby="ModalHeader"
            >
                <RBModal.Header closeButton />
                <RBModal.Body>
                    {task && task.id ? 
                    <ModalCardFrm 
                        closeModal={closeModal} 
                        updateTask={updateTask} 
                        task={task}
                    /> : <ModalIntro />}
                </RBModal.Body>
            </RBModal>
        )
    }
}

const mapStateToProps = ({modal}) => ({...modal})
export default connect(mapStateToProps, { closeModal, updateTask })(Modal)