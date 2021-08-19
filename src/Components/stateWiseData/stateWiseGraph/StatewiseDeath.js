import React,{useState, useEffect} from 'react';
import { Line, Bar} from "react-chartjs-2";
import axios from 'axios';

const StatewiseDeath = () => {
    const [chartData, setChartData] = useState({});
    
    const chart = () => {
        let DeathCases = [];
       
        let State =[];

        axios.get("https://api.covid19india.org/data.json")
        .then(res => {
            console.log(res)
            for(const dataObj of res.data.statewise){
           
              if(dataObj.state==='Total'){
                continue;
              }
                DeathCases.push(parseInt(dataObj.deaths))
                State.push(dataObj.state)

            }
            setChartData({
                labels: State,
                datasets: [
                    {  label: "Deaths",
                        data : DeathCases,
                        backgrounColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4,
                        backgroundColor: [
                            'rgb(255,0,0,0.3)',
                            
                        ],
                        borderColor: [
                            'rgb(255,0,0)'
                        ],
                           
                        borderWidth: 1,
                        

                    }
                  
                ]
            })
        })
        .catch(err => {
            console.log(err)
        })
        console.log(DeathCases, State);

        
    };

    useEffect(() => {
        chart();
    },[]);

    return(
        <div className="App" style={{width: 700 , backgroundColor: "lightyellow"}}>
            <div>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    title: { text: "THICCNESS SCALE", display: true },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true
                            
                          },
                          gridLines: {
                            display: true
                          }
                        }
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false
                          },
                         barThickness: 6
                        }
                      ]
                    }
                  }}
                />
                </div>
                </div>
              
            
          );
            
            
};

export default StatewiseDeath;