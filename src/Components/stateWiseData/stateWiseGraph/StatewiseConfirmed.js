import React,{useState, useEffect} from 'react';
import { Line, Bar} from "react-chartjs-2";
import axios from 'axios';

const StatewiseConfirmed = () => {
    const [chartData, setChartData] = useState({});
    
    const chart = () => {
        let ConfirmedCases = [];
       
        let State =[];

        axios.get("https://api.covid19india.org/data.json")
        .then(res => {
            console.log(res)
            for(const dataObj of res.data.statewise){
              console.log("sdfs",dataObj);
              if(dataObj.state==='Total'){
                continue;
              }
                ConfirmedCases.push(parseInt(dataObj.confirmed))
                State.push(dataObj.state)

            }
            setChartData({
                labels: State,
                datasets: [
                    {  label: "Confirmed cases",
                        data : ConfirmedCases,
                        backgrounColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                           
                        borderWidth: 1,
                        

                    }
                  
                ]
            })
        })
        .catch(err => {
            console.log(err)
        })
        console.log(ConfirmedCases, State);

        
    };

    useEffect(() => {
        chart();
    },[]);

    return(
        <div className="App" >
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

export default StatewiseConfirmed;