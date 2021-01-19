import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { searchMovie } from '../../services/search'
import './Search.css'

const Search = ({clearSearch, lastSearch, setLastSearch}) => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const rerouteSearchResults = () => {
    history.push(`/search-result/${inputValue}`)
  }

  const updateInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <form className="search-container" onSubmit={rerouteSearchResults}>
      <input id="search" type="search" className="search-bar" placeholder="search" autoComplete="off" onChange={updateInput} value={inputValue}/>
      <button className="search-button" onClick={rerouteSearchResults}><i className="fas fa-search"></i></button> 
    </form>
  )
}

export default Search
