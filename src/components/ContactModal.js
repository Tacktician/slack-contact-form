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
    const [agreeToTerms, setAgreeToTerms] = useState(false); // added state variable
    const [nameError, setNameError] = useState(''); // added name input validation
    const [emailError, setEmailError] = useState(''); //added email input validation

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        setNameError(validateName(value));
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(validateEmail(value));
    };
    const handleCheckboxChange = (event) => setAgreeToTerms(event.target.checked); // added checkbox handler

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        if (!nameError && !emailError && agreeToTerms) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/send-invite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({real_name: name, email}),
                });
                if (response.ok) {
                    console.log('message sent');
                } else {
                    console.log('error sending request');
                }
            } catch (error) {
                console.log(error);
                alert('An error occurred while sending the request. Please try again later.');
            }
        } else {
            alert('Please fix the errors in the form and agree to the terms of the code of conduct');
        }
    };

    const validateName = (value) => {
        if (!value) {
            return 'Name is required';
        }

        const regex = /^[a-zA-Z\s\-]*$/;

        if (!regex.test(value)) {
            return 'Name can only contain letters, spaces, and hyphens';
        }

        return '';
    };

    const validateEmail = (value) => {
        if (!value) {
            return 'Email is required';
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {
            return 'Email is not valid';
        }

        return '';
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
                <div className="modal-text">
                    <h1>Community Code of Conduct</h1>
                    <h2>Our Pledge</h2>
                    <p>In the interest of fostering an open and welcoming environment, we as contributors and community managers pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.</p>
                    <h2>Our Standards</h2>
                    <p>Examples of behavior that contributes to creating a positive environment include:</p>
                    <ul>
                        <li>Using welcoming and inclusive language</li>
                        <li>Being respectful of differing viewpoints and experiences</li>
                        <li>Gracefully accepting genuine feedback</li>
                        <li>Focusing on what is best for the community</li>
                        <li>Showing empathy towards other community members</li>
                    </ul>
                    <p>Examples of unacceptable behavior by participants include:</p>
                    <ul>
                        <li>The use of sexualized language or imagery and unwelcome sexual attention or advances</li>
                        <li>Trolling, insulting/derogatory comments, and personal or political attacks</li>
                        <li>Public or private harassment</li>
                        <li>Publishing others&#39; private information, such as a physical or electronic address, without explicit permission</li>
                        <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
                    </ul>
                    <h2>Our Responsibilities</h2>
                    <p>Sauce Labs Community Team are the main organizers responsible for mediating challenging situations. We will always prioritize the ones who felt hurt to straighten the sense of safety and belonging, pursuing the well-being of individuals and communities. We acknowledge many of the issues every community deals with may rise from systemic issues and we will do our best seeking to create a more just and equitable society.</p>
                    <p>Project maintainers have the right and responsibility to remove, edit, or reject posts, replies, code, links, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.</p>
                    <p>The Sauce Labs Community Team may also appoint Community Moderators, empowered with some to all of these rights and responsibilities.</p>
                    <h2>Scope</h2>
                    <p>This Code of Conduct applies within all community spaces, and it also applies when an individual is representing the community in public spaces or attending community events. Examples of representing a project or community include using an official project email address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of the community may be further defined and clarified by the Sauce Labs Community Team.</p>
                    <h2>When Problems Arise</h2>
                    <p>Instances of abusive, harassing, or otherwise unacceptable behavior by community members should be reported by contacting the Sauce Labs Community Team at <a className="link" href="mailto:community-hub@saucelabs.com">community-hub@saucelabs.com</a>, or by sending a message in the Sauce Squad Slack using the `/report` command. If your report concerns a Sauce Labs staff member, <i>including</i> members of the Community Team, you may instead contact Sauce Labs HR at <a className="link" href="mailto:hr@saucelabs.com">hr@saucelabs.com</a>.</p>
                    <p>We are committed to investigating any reported violations of our code of conduct and taking appropriate steps to address the concerns of those affected, with a focus on prioritizing the needs of individuals who have experienced harm. If a member violates our code of conduct, we may consider a range of actions to address the situation, with a focus on supporting those who were harmed and repairing any damage done. Depending on the severity of the situation, we may need to take corrective actions, such as providing training, mediation, or in some cases, penalties such as temporary suspension or permanent expulsion from the community may be necessary to ensure the safety and well-being of all members.</p>
                    <p></p>
                    <h2>Attribution</h2>
                    <p>This Code of Conduct is adapted from the
                        <a className="link" href="https://www.google.com/url?q=https://www.contributor-covenant.org/&amp;sa=D&amp;source=editors&amp;ust=1682531362995161&amp;usg=AOvVaw0SH3hmwNqhComtTzosaOlh">Contributor Covenant</a>, version 1.4, available at
                        <a className="link" href="https://www.google.com/url?q=https://www.contributor-covenant.org/version/1/4/code-of-conduct.html&amp;sa=D&amp;source=editors&amp;ust=1682531362995459&amp;usg=AOvVaw1QhnIUBGVWd2uF53NbU8Gv">https://www.contributor-covenant.org/version/1/4/code-of-conduct.html</a>
                    </p>
                    <p>For answers to common questions about this code of conduct, see
                        <a className="link" href="https://www.google.com/url?q=https://www.contributor-covenant.org/faq&amp;sa=D&amp;source=editors&amp;ust=1682531362995802&amp;usg=AOvVaw2nSl_K1ZY7BV_1nUJFNd6g">https://www.contributor-covenant.org/faq</a>&nbsp;or contact the Sauce Labs Community at
                        <a className="link" href="mailto:community-hub@saucelabs.com">community-hub@saucelabs.com</a>
                    </p>
                </div>
                <div className="modal-form">
                <h2>Contact Form</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={handleNameChange} required /><br />
                        {nameError && <span className="name-error">{nameError}</span>}<br /><br />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} required /><br />
                        {emailError && <span className="email-error">{emailError}</span>}<br /><br />
                        <div className="submit-row">
                            <input type="checkbox" id="agree-to-terms" checked={agreeToTerms} onChange={handleCheckboxChange} required />
                            <label htmlFor="agree-to-terms">I agree to the terms of the code of conduct</label><br /><br />
                            <input type="submit" value="Submit" onClick={handleSubmit} />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default ContactModal;