import React,{useState, useEffect} from 'react';
import { Bar} from "react-chartjs-2";
import axios from 'axios';
import { Redirect } from 'react-router';



const StatewiseActive = () => {
    const [chartData, setChartData] = useState({});
    
    const chart = () => {
        let ActiveCases = [];
       
        let State =[];

        axios.get("https://api.covid19india.org/data.json")
        .then(res => {
            console.log(res)
            for(const dataObj of res.data.statewise){
          
              if(dataObj.state==='Total'){
                continue;
              }
                ActiveCases.push(parseInt(dataObj.active))
                State.push(dataObj.state)

            }
            setChartData({
                labels: State,
                datasets: [
                    {  label: "Active cases",
                        data : ActiveCases,
                        backgrounColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4,
                        backgroundColor: [
                            'rgb(128,0,128,0.3)',
                            
                        ],
                        borderColor: [
                            'rgb(128,0,128)'
                        ],
                           
                        borderWidth: 1,
                        

                    }
                  
                ]
            })
        })
        .catch(err => {
            console.log(err)
        })
        console.log(ActiveCases, State);

        
    };

    useEffect(() => {
        chart();
    },[]);

    return(
        <div className="shadow-box-example z-depth-5" style={{width: 600, backgroundColor: "lightyellow" }}>
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

export default StatewiseActive;