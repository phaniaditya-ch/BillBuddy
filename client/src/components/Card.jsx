import { Axios } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/MyContext'

function Card(props) {

	const data = props.data
	const { globalState, setGlobalState } = useContext(MyContext)

	// const fetchRes = () => {
	// 	let temp = globalState.history.array.forEach(element => {
	// 		if(element._id === props.data._id) {
	// 			return element['resolved']
	// 		}
	// 	});
	// }

	// const [res, setRes] = useState(fetchRes())

	const handleDelete = () => {
		fetch(`http://localhost:6969/delete-expense/${props.data._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json', // Set your desired content type
				// Add any additional headers if needed
			},
		})
			.then(async (response) => {
				if (response.ok) {
					console.log('Delete successful');
					let currHistory = await globalState.history.filter(obj => {
						return obj._id != props.data._id
					})
					setGlobalState({ ...globalState, history: currHistory })
				} else {
					console.error('Delete failed');
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	// const handleApprove = async () => {
	// 	const localChange = async () => {
	// 		try {
	// 			// let apprHistory = await globalState.history.filter(obj => obj._id == props.data._id)
	// 			let apprHistory = await globalState.history.array.forEach(element => {
	// 				if(element._id === props.data._id) {
	// 					element['resolved'] =!props.data.resolved
	// 				}
	// 			})
	// 			console.log('apprHistory: ', apprHistory)
	// 			await setGlobalState({ ...globalState, history: apprHistory })
	// 			return true
	// 		} catch {
	// 			return false
	// 		}
	// 	}
	// 	fetch(`http://localhost:6969/addResolved`, {
	// 		method: 'PATCH',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			_id: props.data._id
	// 		})
	// 	})
	// 		.then(response => response.json())
	// 		.then(result => {
	// 			if (result.ok) {
	// 				console.log('updated successfully')
	// 				localChange()
	// 			}
	// 		})
	// }

	const handleApprove = async () => {
		try {
		  const response = await fetch(`http://localhost:6969/addResolved`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  _id: props.data._id
			})
		  });
	  
		  if (response.ok) {
			// Update the local state
			const updatedHistory = globalState.history.map(element => {
			  if (element._id === props.data._id) {
				return {
				  ...element,
				  resolved: !props.data.resolved
				};
			  }
			  return element;
			});
	  
			await setGlobalState({
			  ...globalState,
			  history: updatedHistory
			});
	  
			console.log('Updated successfully with: ', updatedHistory);
		  } else {
			console.log('Failed to update');
		  }
		} catch (error) {
		  console.error('Error:', error);
		}
	  };

	  const style1={'background': 'rgb(0,80,5) linear-gradient(180deg, rgba(0,80,5,1) 0%, rgba(26,176,0,1) 100%)'}
	  const style2={'background': 'rgb(80,0,0) linear-gradient(180deg, rgba(80,0,0,1) 0%, rgba(176,0,0,1) 100%)'}

	return (
		<div className='Card-with-del'>
			<div className='Card' style={props.data.resolved ? style1 : style2} >
				<div className='Card-1'>
					<div className='Card-11'>
						<div className='Card-111'>
							<h2>{data.title}</h2>
							<h4>{`${data.date}/${data.month}/${data.year}`}</h4>
						</div>
						<h5>You Paid</h5>
						<h1>&#8377;{Number(data.amount1)}</h1>
						<h5>Your share</h5>
						<h2>{Number(data.amount2)}</h2>
					</div>
					<div className="c11-c22-separation"></div>
					<div className="Card-12">
						<h1>{(Number(data.amount2) - Number(data.amount1)) > 0 ? '-' : '+'}{Math.abs(Number(data.amount2) - Number(data.amount1))}</h1>
					</div>
				</div>
				<div className="comment-seperation"></div>
				<div className="comment">
					{data.comment}
				</div>
				{props.data.resolved ? 'resolved' : 'not resolved'}
			</div>
			<div className='side-icons' onClick={handleApprove}>
				<div className="approve-icon">
					<img src='src\assets\approve.png' alt='done' />
				</div>
				<div className='delete-icon' onClick={handleDelete}>
					<img src='src\assets\delete.png' alt='delete' />
				</div>
			</div>
		</div>
	)
}

export default Card