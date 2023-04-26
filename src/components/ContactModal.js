import React, { useState } from 'react';
import Modal from 'react-modal';
import './ContactModal.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const ContactModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://<YOUR_PLACEHOLDER_URL>/send-invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ real_name: name, email }),
        });
        if (response.ok) {
            // handle success
            console.log('message sent');
        } else {
            // handle error
            console.log('error sending request');
        }
    };

    return (
        <>
            <button onClick={handleOpenModal}>
                <img src="../../public/images/slack-logo.svg" alt="Slack logo" className="slack-logo" />
                Join Our Slack Community
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                riaHideApp={false}
                contentLabel="Join Our Slack!"
            >
                <h2>Contact Form</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} required /><br /><br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required /><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </Modal>
        </>
    );
};

export default ContactModal;