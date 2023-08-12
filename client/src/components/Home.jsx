import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import Net from './Net'
import Axios from 'axios'
import { MyContext } from '../context/MyContext';

function Home() {

  const {globalState, setGlobalState} = useContext(MyContext);
  const [loaded, setLoaded] = useState(false)
  const [expenseTitle, setExpenseTitle] = useState('')
  const [amount1, setAmount1] = useState(0)
  const [amount2, setAmount2] = useState(0)
  const [comment, setComment] = useState('')

  const currDate = new Date()
  const [date, setDate] = useState(currDate.getDate())
  const [month, setMonth] = useState(currDate.getMonth())
  const [year, setYear] = useState(currDate.getFullYear())

  const fetchAll = async () => {
    Axios.get('http://localhost:6969/all').then((response) => {
      const regularJSON = JSON.parse(JSON.stringify(response));
      let documents = []
      response.data.forEach((document) => {
        documents.push(document)
      });
      setGlobalState({...globalState, history: documents})
    }).then((reply) => {
      setLoaded(true)
    })
  }
  console.log(globalState.history)

  const handleSubmit = () => {
    if (!loaded || !history) return

    let thisId

    const postData = {
      title: expenseTitle,
      amount1,
      amount2,
      date,
      month,
      year,
      comment,
      resolved: false
    }
    fetch('http://localhost:6969/addExpense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(result => {
        setGlobalState({...globalState, history: [...(globalState.history), result]})
        return globalState
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <div>
      <div className='home-flex'>
        <div className='home-div'>
          <h1>History</h1>
          {
            loaded ?
              <div style={{ 'color': 'white' }}>
                {globalState.history.map((document) => {
                  return <Card key={document._id} data={document} />
                })}
              </div> : <p>loading...</p>
          }
        </div>
        <div className='net-payments'>
          <h1>NET PAYMENTS</h1>
          <Net />
        </div>
      </div>
      <div className="add-expense-div">
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <label htmlFor='title'>Title</label>
          <input name='title' type='text' placeholder='Person name' onChange={(e) => setExpenseTitle(e.target.value)} />
          <label htmlFor='amount1'>You paid</label>
          <input name='amount1' type='text' placeholder='Amount paid' onChange={(e) => setAmount1(e.target.value)} />
          <label htmlFor='amount2'>Your share</label>
          <input name='amount2' type='text' placeholder='Your share' onChange={(e) => setAmount2(e.target.value)} />
          <label htmlFor='comment'>comment</label>
          <input name='comment' type='text' placeholder='comment' onChange={(e) => setComment(e.target.value)} />
          <label htmlFor='date'>date</label>
          <input name='date' type='text' placeholder='date' value={date} onChange={(e) => setDate(e.target.value)} />
          <label htmlFor='month'>month</label>
          <input name='month' type='text' placeholder='month' value={month} onChange={(e) => setMonth(e.target.value)} />
          <label htmlFor='year'>year</label>
          <input name='year' type='text' placeholder='year' value={year} onChange={(e) => setYear(e.target.value)} />
          <button onClick={() => handleSubmit()}>ADD EXPENSE</button>
        </form>
      </div>
    </div>
  )
}

export default Home