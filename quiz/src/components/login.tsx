import React, { useState } from "react";

interface args {
	uname: string;
	setUname: (name: string) => void;
	institute: string;
	setInst: (name: string) => void;
	setStage: (name: string) => void;
}


export default function login({ uname, setUname, institute, setInst, setStage }: args) {
	const [input1, setInput1] = useState(uname)
	const [input2, setInput2] = useState(institute)

	const handleButtonInput = () => {
		setUname(input1);
		setInst(input2);
		setStage("subject")
	}

	return (
		<div>
			<h2>Login:</h2>
			<label htmlFor="uname">Username: </label>
			<input type="text"
				id="uname"
				value={input1}
				onChange={(e) => setInput1(e.target.value)}
				placeholder="exampleUname"
			/>
			<br />
			<br />
			<label htmlFor="institute">Institute: </label>
			<input type="text"
				id="institute"
				value={input2}
				onChange={(e) => setInput2(e.target.value)}
				placeholder="exampleInstitute"
			/>
			<br />
			<br />
			<button onClick={handleButtonInput}>Confirm</button>
		</div>
	);
}
