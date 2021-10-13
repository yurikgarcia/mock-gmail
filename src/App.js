import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [emails,setEmails] = useState([])
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [pageView, setpageView] = useState("HOME");
	const [sort, setSort] = useState(false);
	const [url,setUrl] = useState("http://localhost:3001/emails")

	useEffect(()=>{fetch(url).then(res=>res.json()).then(
		(result)=>{
			setIsLoaded(true);
			console.log(result)
			setEmails(result)
		},(error)=>{
			setIsLoaded(true);
			setError(error);
		}
	)
	},[url])
	

	
	var displayContent = () => {switch (pageView) {
		case "HOME":{
			return (
			<>
				<div className="row">
				<div className="col-2 header">
					Sender
				</div>
				<div className="col-3 header">
					Subject
				</div>
				<div className="col-5 header">
					Message
				</div>
	
				</div>
		
				{emails.sort((email1,email2)=>(sort)?Date.parse(email1.date)>Date.parse(email2.date):false).map((email,id)=>
					(<>
					
				<div className="row mt-0 mb-0 pt-0 pb-0 link">
				<div className="col-2 text-nowrap">
					{email.sender}
					</div>
				<div className="col-3 text-nowrap">
					{email.subject}
					</div>
				<div className="col-5 text-nowrap">
					{email.message}
					</div>
					</div>
					</>)
				)}
			</>
			)
		}

		}
	}
	
	  if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else if (emails.length === 0) {
		return <div>No data</div>;
	  } else {


		
	  return (
	  <>
		<div className="container-fluid">
		<div className="row mt-1"></div>
		
		<hr/>
		<div className="row">

		<hr/>

		<div className="col-md-10">
			{displayContent()}
		</div>
		
		</div>
		</div>
	   </>
	  );
	}
}

export default App;