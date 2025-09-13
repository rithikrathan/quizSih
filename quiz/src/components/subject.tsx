import React, { useState } from "react";

interface args {
	subject: string;
	setSub: (name: string) => void;
	setStage: (name: string) => void;
}

export default function subject({ subject, setSub, setStage }: args) {

	const [input1, setInput1] = useState<string>(subject)
	const [notify, setNotify] = useState<string>("")

	const handleButtonInput = () => {
		if (input1 == "") {
			setNotify("Select a subject to continue")
			setTimeout(() => {
				setNotify("")
			}, 1500);
			return
		}
		setSub(input1);
		setStage("quiz");
	}

	return (
		<div>
			<h2>Select Subject: </h2>
			<hr />
			<select name="subSel" id="subSel" onChange={(e) => { setInput1(e.target.value) }}>
				<option value="">none</option>
				<option value="dsa">Data Structures and Algorithms</option>
				<option value="mpmc">Microprocessors and Microcontrollers</option>
			</select>
			<button onClick={handleButtonInput}>Continue</button>
			{notify && <p>{notify}</p>}
		</div>
	);
}
