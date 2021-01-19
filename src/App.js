import './App.css';
import Header from './components/Header';
import CharacterTable from './components/CharacterTable';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Search from './components/Search';

const hash = "7ce6a30df8e2cc6fad73f51e862de931"

function App() {
  const[items,setItems] = useState([])
  const[isLoading,setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(()=>{
    const fetch = async()=>{
    if(query===''){
    const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b847342325e591bf67d0c5758e3078fa&hash=${hash}`)
    console.log(result.data.data.results)
    setItems(result.data.data.results)
    setLoading(false)
    }else{
    const result = await axios(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=b847342325e591bf67d0c5758e3078fa&hash=${hash}`)
    console.log(result.data.data.results)
    setItems(result.data.data.results)
    setLoading(false)
   
    }
    
  }

    fetch()
  },[query])

  return (
    <div className="container">
    <Header />
    <Search search={(q)=>setQuery(q)}></Search>
    <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;
