import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ birthDate, setBirthDate ] = useState('');
	const [ emailConsent, setEmailConsent ] = useState(false);
	const [ message, setMessage ] = useState('');

	const enableSubmit = name.length > 0 && email.length > 0 && emailConsent === true;

	const newParticipant = {
		id: uuidv4(),
		name,
		email,
		birthDate,
		emailConsent
	};

	const clearForm = () => {
		successMessage();
		setTimeout(clearMessage, 7000);
		clearFields();
	};

	const clearFields = () => {
		setName('');
		setEmail('');
		setBirthDate('');
		setEmailConsent(false);
	};

		const successMessage = () => {
		setMessage(`Thank you ${name}! You will now be contacted via email.`);
	};

	const clearMessage = () => {
		setMessage('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch(`https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(newParticipant)
		});
		return clearForm();
	};

	const checkBirthDate = (date) => {
		let today = new Date();
		let y = today.getFullYear();
		let m = today.getMonth() + 1;
		let d = today.getDate();
		if (d < 10) d = '0' + d;
		if (m < 10) m = '0' + m;
		today = y + '-' + m + '-' + d;
		if (date < today) setBirthDate(date);
		else alert('Please select a valid date');
	};

	return (
		<div>
			<form className="form" name="newParticpantForm" onSubmit={handleSubmit}>
				<h1 className="header">New Particpant Form</h1>
				<div className="prompt">
					<p>{enableSubmit ? '' : `Please enter name, email, address, and agree to terms to continue.`}</p>
				</div>
				<div className="inputs">
					<label className="label" htmlFor="name">
						Name
					</label>
					<input
						required
						id="name"
						className="text-input"
						type="text"
						autoFocus
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label className="label" htmlFor="email">Email</label>
					<input
						required
						id="email"
						className="text-input"
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className="label" htmlFor="birth-date">Birth date</label>
					<input
						id="birth-date"
						className="text-input"
						type="date"
						name="birthDate"
						value={birthDate}
						onChange={(e) => checkBirthDate(e.target.value)}
					/>
				</div>
				<div className="agree-box">
					<input
						required
						id="consent"
						type="checkbox"
						name="consent"
						checked={emailConsent}
						onChange={() => setEmailConsent(!emailConsent)}
					/>
					<p>I agree to be contacted via email.</p>
				</div>
				<div className="buttons">
					<button type="submit" disabled={!enableSubmit} className="btn btn-submit">
						Submit
					</button>
					<button type="reset" className="btn btn-clear" onClick={clearForm}>
						Clear
					</button>
				</div>
				<div className="message">
					<p>{message}</p>
				</div>
			</form>
		</div>
	);
};

export default Form;
