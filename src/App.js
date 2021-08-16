import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'


function App() {
  const [quote, setQuote] = useState('')
  const [myQuote, setMyQuote] = useState('')
  // favourite quotes
  const [favouriteQuotes, setFavouriteQuotes] = useState([])

  useEffect(()=>{
    axios.get('https://api.kanye.rest')
    .then(res=>{
      setQuote(res.data.quote)
    })
  },[])
  
  function getQuote(){
    axios.get('https://api.kanye.rest')
    .then(res=>{
      setQuote(res.data.quote)
    })
  }

  function addQuotes(){
    if(favouriteQuotes.length === 0){
      setFavouriteQuotes([...favouriteQuotes, quote])
    }else{
      let cekQuote = favouriteQuotes.filter(data=>{
        return data === quote
      })

      if(cekQuote.length === 0){
        setFavouriteQuotes([...favouriteQuotes, quote])
      }else{
        // nothing to do
      }
    }
  }

  function typeMyQuote(e){
    setMyQuote(e.target.value)
  }

  function addMyQuote(){
    if(favouriteQuotes.length === 0){
      setFavouriteQuotes([...favouriteQuotes, myQuote])
    }else{
      let cekQuote = favouriteQuotes.filter(data=>{
        return data === myQuote
      })

      if(cekQuote.length === 0){
        setFavouriteQuotes([...favouriteQuotes, myQuote])
        
        // reset input value after success adding quote 
        setMyQuote('')
      }else{
        // nothing to do
      }
    }
  }
  return (
    <div classname="container">
      <div className="row">
        <div classname="col-8 mx-auto">
          <h1>Kanye-West Quote</h1>
        </div>
        <div classname="col-8 mx-auto">
          <h3>{quote}</h3>
          <div classname="d-flex">
            <button onClick={getQuote}>Get Quote</button>
            <button onClick={addQuotes}>Add Favourite</button>
          </div>
          <ul>
            {favouriteQuotes.map(quote=>{
              return <li><q>{quote}</q></li>
            })}
          </ul>
          <div>
            <h2>My Quotes</h2>
            <div>
              <input type="text" onChange={typeMyQuote} value={myQuote} />
              <button onClick={addMyQuote}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
