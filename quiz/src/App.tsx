import React, { useState } from "react";
import login from "./components/login";
import subject from "./components/subject";
import quiz from "./components/quiz";
import results from "./components/results";
import answers from "./components/answers";


export default function app() {
	// Aliases:
	const Login = login
	const Quiz = quiz
	const Subject = subject
	const Results = results
	const Answers = answers

	const [stage, setStage] = useState<string>("login");
	const [uname, setUname] = useState<string>("");
	const [institute, setInst] = useState<string>("");
	const [sub, setSub] = useState<string>("")

	return (
		<div>
			<title>Quiz app lol</title>
			<div>
				{stage === "login" && <Login
					uname={uname}
					setUname={setUname}
					institute={institute}
					setInst={setInst}
					setStage={setStage}
				/>}

				{stage === "subject" && <Subject
					subject={sub}
					setSub={setSub}
					setStage={setStage}
				/>}

				{stage === "quiz" && <Quiz />}
				{stage === "results" && <Results />}
				{stage === "answers" && <Answers />}
			</div>
			<div>
				<p>{uname}</p>
				<p>{institute}</p>
				<p>{sub}</p>
			</div>
		</div>
	);
}
