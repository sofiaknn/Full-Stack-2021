import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCoutries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCoutries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const namesToShow = showAll
   ? countries
   : countries.filter(n => n.name.toLowerCase().includes(newFilter.toLowerCase()))
   

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
    <div>
      find countries <input value = {newFilter}
      onChange = {handleFilterChange}/>
    </div>
    <div>
    <List countries={namesToShow}/>
  </div>
  </div>
  )
}

const List = (props) => {
  const nameArray = props.countries
  if (nameArray.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (nameArray.length === 1) {
    const e = nameArray[0].languages.map(p => p.name)
    console.log(e)
    return (
      <div>
        <h1>{nameArray[0].name}</h1>
        <p>capital {nameArray[0].capital}</p>
        <p>population {nameArray[0].population}</p>
        <h2>languages</h2>
        <ul>
          {nameArray[0].languages.map(p =>
          <p key={p.name}>
          <li>{p.name}</li>
          </p>
          )}
        </ul>
        <img src= {nameArray[0].flag} width= {100} height= {100}></img>
    </div>
    )
  }
  else {
    return (
      <div>
      {nameArray.map(k =>
        <p key={k.name}>
        {k.name}
        </p>
      )} 
    </div>
    )
  }
}

export default App
