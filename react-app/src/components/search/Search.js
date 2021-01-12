import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { searchMovie } from '../../services/search'
import './Search.css'

const Search = ({clearSearch, lastSearch, setLastSearch}) => {
  const [results, setResults] = useState([]);
  const [doingSearch, setDoingSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [noResultsMsg, setNoResultsMessage] = useState(false)
  const history = useHistory();

  const rerouteSearchResults = () => {
    history.push(`/search-result/${inputValue}`)
  }

  const updateInput = (e) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }

  // const doSearch = (e) => {
  //   e.stopPropagation();
  //   const value = document.getElementById('search').value;
  //   if (value) {
  //     setLastSearch(value);
  //     setResults([]);
  //     setNoResultsMessage(false);
  //     setDoingSearch(true);
  //     sizeResults('min');
  //     (async () => {
  //     })();
  // }

  // const displaySearchInfo = (e) => {
  //   console.log('clicked!!!')
  //   document.getElementById('search-results').style.display = 'block';
  //   document.getElementById('search').value = inputValue
  //   sizeResults(results.length ? 'full' : 'min');

  // }

  // const hideSearchInfo = (e) => {
  //   e.stopPropagation()
  //   document.getElementById('search').value = lastSearch
  //   clearSearch(e);
  // }

  // const sizeResults = (size) => {
  //   if (size === 'min') {
  //     document.getElementById('search-results').style.bottom = 'auto';
  //   } else {
  //     document.getElementById('search-results').style.bottom = null;
  //   }
  // }




  return (
    // <div className="search-container" onClick={displaySearchInfo} >
    <form className="search-container" onSubmit={rerouteSearchResults}>
        <input id="search" type="search" className="search-bar" placeholder="search" autoComplete="off" onChange={updateInput} value={inputValue}/>
      {/* <button className="search-button" onClick={doSearch}><i className="fas fa-search"></i></buttons> */}
    </form>
  )
}

export default Search
