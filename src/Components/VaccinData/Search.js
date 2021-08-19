import React, { useEffect, useState } from 'react';
import './Search.css';
import axios from 'axios';
import './Statewise.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import Navbar from "./Navbar";


const Search = () => {

    const [repo, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [tableShowHide, setTableShowHide] = useState(false);



    const search = (event) => {
        event.preventDefault();
        console.log(selectedDate);
        const formattedDate = Moment(selectedDate).format('DD/MM/yyyy');
        console.log(formattedDate);
        const formData = new FormData(event.target);
        const URL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + formData.get('search') + '&date=' + formattedDate;
        setTableShowHide(true);
        axios.get(URL)
            .then(response => {
                var responseData = response.data.sessions;
                console.log(responseData);
                setData(responseData);
               
            })
            .catch((error) => {

                console.log(error);
            })
        





    };

    useEffect(() => {
    }, []);

    return (
        <div>
            <Navbar/>
            <form className="searchbar" onSubmit={search}>
                <input type='text' placeholder="Enter your pincode"
                    name="search"
                />
                <DatePicker selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat='dd/MM/yyyy'
                    placeholder="Pick date"
                    minDate={new Date()}
                    isClearable
                    autoComplete="off"
                />
                <button type="submit">search</button>
            </form>
            
            <div className="container-fluid mt-5">

                { 
                    
                    tableShowHide ? (
                        <div className="table-reponsive">
                        
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Center ID</th>
                                        <th>Center Name</th>
                                        <th>Fee Type</th>
                                        <th>Vaccine</th>
                                        <th>Slots</th>
                                        <th>Dose 1</th>
                                        <th>Dose 2</th>
                                    </tr>
                                </thead>
                            
                            <tbody>
                                    { 
                                    repo.length > 0 ? (
                                        repo.map((repos) => (
                                            <tr>
                                                <th>{repos.center_id}</th>
                                                <th>{repos.name}</th>
                                                <th>{repos.fee_type}</th>
                                                <th>{repos.vaccine}</th>
                                                <th>{repos.slots}</th>
                                                <th>{repos.available_capacity_dose1}</th>
                                                <th>{repos.available_capacity_dose2}</th>
                                            </tr>
                                        ))) : <div className="text-center" style={{ padding:50, margin: 50, fontSize: 80}}><h1>No Slots Availabale</h1></div>}
                                </tbody>
                            </table>
                        </div>
                    ) : ""
                }
            </div>

        </div>







    )
};

export default Search;