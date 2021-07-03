import React from 'react'

const About = () => {
    return (
        <div className="container">
            <h1>Getting started</h1>
            <p>erp.Chat was built to be pretty simple. So heres how you start a conversation</p>
            <ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                <div class="fw-bold"><i class="fas fa-key"></i> Encryption Key</div>
                Decide on an encryption key, this has to be the same between both parties. But you can change it whenever (to encrypt new messages, but messages can only be decrypted with the same key that they are encrypted with)
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                <div class="fw-bold">Your username</div>
                This can be anything, and is visible on the blockchain. Once you choose one, communicate it through whatever means to the individual you wish to chat with.
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                <div class="fw-bold">Target username</div>
                Whoever you want to have a chat with will select this value. Also visible on the blockchain.
                </div>
            </li>
            </ol>
           
        </div>
    )
}

export default About
