import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [card, setCard] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isLaunch, setIsLaunch] = useState(null);
  const [isLanding, setIsLanding] = useState(null);
  const [years] = useState([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020])
  const [boolean] = useState([true, false])

  useEffect(() => {
    const query = {}
    if (isLaunch || isLaunch === false) {
      query.launch_success = isLaunch;
    }
    if (isLanding || isLanding === false) {
      query.land_success = isLanding;
    }
    if (selectedYear) {
      query.launch_year = selectedYear;
    }
    let url = new URL('https://api.spaceXdata.com/v3/launches')
    url.search = new URLSearchParams(query)
    fetch(url, query)
      .then(res => res.json())
      .then(
        (result) => {
          setCard(result)
        },
      )
  }, [selectedYear, isLanding, isLaunch])


  return (
    <div className="App">
      <div className="Header">
        <h1>SpaceX Launch Programs</h1>
      </div>
      <div className="Body">
        <div className="SideMenu">
          <div style={{ margin: "0.8vw 0vw 0vw 0.8vw" }}>
            <h3>Filters</h3>
          </div>
          <div className="title">
            Launch Year
            <hr />
            <div className="ButtonContainer">
              {years.map((year) => {
                return (
                  <button className={`Button ${year === selectedYear && 'ButtonActive'}`} onClick={() => setSelectedYear(year)}>
                    {year}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="title">
            Successful Launch
            <hr />
            <div className="ButtonContainer">
              {boolean.map((isTrue) => {
                return (
                  <button className={`Button ${isTrue === isLaunch && 'ButtonActive'}`} onClick={() => setIsLaunch(isTrue)}>
                    {isTrue ? "True" : "False"}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="title">
            Successful Landing
            <hr />
            <div className="ButtonContainer">
              {boolean.map((isTrue) => {
                return (
                  <button className={`Button ${isTrue === isLanding && 'ButtonActive'}`} onClick={() => setIsLanding(isTrue)}>
                    {isTrue ? "True" : "False"}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
        <div className="CardContainer">
          {
            card.map((card) => {
              return (
                <div className="card">
                  <div className="Image">
                    <img src={card.links.mission_patch} alt="Card Logo" width="200" height="200"></img>
                  </div>
                  <div className="cardBody">
                    <div className="cardTitle">
                      {card.mission_name}:&nbsp;#{card.flight_number}
                    </div>
                    <div>
                      <b>Mission Ids</b>:&nbsp;
                      <span className="answer">{card.mission_id.join(", ")}</span>
                    </div>
                    <div>
                      <b>Launch Year</b>:&nbsp;
                      <span className="answer">{card.launch_year}</span>
                    </div>
                    <div>
                      <b>Successful Launch</b>:&nbsp;
                      <span className="answer">{card.launch_success ? "True" : "False"}</span>
                    </div>
                    <div>
                      <b>Successful Landing</b>:&nbsp;
                      <span className="answer"> {card.launch_landing ? "True" : "False"}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="Name">
        <b>Developed by: Saras Walia</b>
      </div>
    </div>
  );
}

export default App;
