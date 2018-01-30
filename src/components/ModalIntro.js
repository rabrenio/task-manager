import React from 'react'

const ModalIntro = () => {
    return (
        <div>
            <h4>Welcome to Task Manager</h4>
            <p>Instructions on how to use:</p>
            <ul>
                <li>Use <strong>Add card</strong> to add a new card.</li>
                <li>You can trash/edit a card by <strong>hovering</strong> your mouse on selected card.</li>
                <li>You can move all cards to trash by using <strong>Delete All</strong></li>
                <li>To permanently delete cards use <strong>Purge</strong></li>
                <li>Drag and drop a card on selected column to change status</li>
                <li>You can change card order in a column by drag and drop.</li>
                <li>You can recover a card by clicking the recover button. The recovered card goes to backlog.</li>
            </ul>
        </div>
    )
}

export default ModalIntro