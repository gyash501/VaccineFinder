import React, { useDebugValue, useEffect, useState } from 'react';
import './Statewise.css';
import './Search.css';
import 'react-tippy/dist/tippy.css'
import Tippy from '@tippyjs/react'
import StatewiseActive from './stateWiseGraph/StatewiseActive'
import StatewiseRecovered from './stateWiseGraph/StatewiseRecovered'
import StatewiseDeath from './stateWiseGraph/StatewiseDeath'
import './button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Statewise = () => {
    const [data1, setData] = useState([]);
    const [searchTerm, setSearchTerm]=useState('');


    const getCovidData = async () => {
        const response = await fetch('https://api.covid19india.org/data.json');
        const actualData = await response.json();
        console.log(actualData.statewise);
        setData(actualData.statewise);
    }

    useEffect(() => {
        document.title = `COVID-19 DASHBOARD||STATUS`;
        getCovidData();
    },[])


    

    return (
        <div>
            <div className="Search">
                <input type="text" placeholder="Search your state"
                  onChange={(event) => {
                      setSearchTerm(event.target.value);
                  }}/>
                
                
                    <Tippy placement='bottom' content = {<div>
                       <StatewiseActive/>
                       <h1></h1>
                    </div>}>
                    <button className="button">Active<FontAwesomeIcon icon="fa-solid fa-chart-bar" /></button>
                    </Tippy>

                    <Tippy placement='bottom' content = {<div>
                       <StatewiseRecovered/>
                       <h1></h1>
                    </div>}>
                    <button  className="button">Recovered</button>
                    </Tippy>

                    <Tippy placement='right' content = {<div>
                       <StatewiseDeath/>
                       <h1></h1>
                    </div>}>
                    <button  className="button">Deaths</button>
                    </Tippy>
                
                

                <div className="container-fluid mt-5">

                <div className="table-reponsive">
                    <table className="table table-hover">
                        <thead className="heading" >
                            <tr>
                                <th>State</th>
                                <th>Total Cases</th>
                                <th>Recoverd</th>
                                <th>Deaths</th>
                                <th>Active</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data1.filter((currentElem)=> {
                                    if(searchTerm === " ")
                                    {
                                        return currentElem
                                    }
                                    else if(currentElem.state.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return currentElem
                                    }
                                }).map((currentElem, index) => {
                                    return (
                                        <tr>
                                            <th>{currentElem.state}</th>
                                            <th className="green">{currentElem.confirmed}</th>
                                            <th className="green">{currentElem.recovered}</th>
                                            <th className="deaths">{currentElem.deaths}</th>
                                            <th className="green" >{currentElem.active}</th>
                                            <th className="green">{currentElem.lastupdatedtime}</th>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Statewise;