import React from "react";

interface args {
	setStage: (name: string) => void;
	score: number;
}

export default function results({ setStage, score }: args) {
	return (
		<div>
			<h2>Results:</h2>
			<h2>{score} / 10</h2>
			<button onClick={() => { setStage("quiz") }}>Attempt again</button>
			<br />
			<br />
			<button onClick={() => { setStage("subject") }}>Select subject</button>
		</div>
	);
}
