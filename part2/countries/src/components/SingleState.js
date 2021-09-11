import React, {useEffect, useState} from 'react'
import axios from 'axios'

const SingleState = ({state}) => {
    
    const [ meteo, setMeteo ] = useState([])

    useEffect(() => {
        axios.get('http://api.weatherstack.com/current?access_key='.concat(process.env.REACT_APP_API_KEY).concat('&query=').concat(state.name))
        .then(response => setMeteo(response.data))
    }, [])

    return (
        <div>
            <h2>{state.name}</h2>
            <p>capital: {state.capital}</p>
            <p>population: {state.population}</p>
            <h3>Languages</h3>
            <ul>{state.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
            <div><img src={state.flag} width="300px" height="200px" alt={state.name.concat("_flag")}/></div>
            <h2>Weather report in {state.name}</h2>
            <div><b>temperature: </b><span>{meteo.current.temperature} Celsius</span></div>
            <img src={meteo.current.weather_icons} width="100px" heigth="100px" alt={state.name.concat("_weather")} />
            <div><b>wind: </b><span>{meteo.current.wind_speed} direction {meteo.current.wind_dir}</span></div>
        </div>
    )
}

export default SingleState