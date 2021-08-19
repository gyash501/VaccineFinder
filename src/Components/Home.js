import React, { useEffect, useState } from "react";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';
import imgind from './images/India-Map.jpg';


const styles = {

    cardImage: {
        width: 100,
        height: 100
    }
}
export default function Home() {
    const [data1, setData] = useState([]);

    const getHomeData = async () => {
        const response = await fetch('https://api.covid19india.org/data.json');
        const HomeData = await response.json();
        setData(HomeData.statewise[0]);
    }

    useEffect(() => {
        document.title = `COVID-19 DASHBOARD || Home`;
        getHomeData();
    }, [])
    return (
        <div>
            <CardDeck>
      <Card style={{padding:20}}>
        <CardImg top width="100%" src={imgind} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Active Cases</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Total Active Cases in India</CardSubtitle>
          <CardText><h1 style={{color: "purple"}}>{data1.active}</h1></CardText>
        
        </CardBody>
      </Card>
      <Card style={{padding:20}}>
        <CardImg top width="100%" src={imgind} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Recoverd Cases</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Total Recoverd Cases in India</CardSubtitle>
          <CardText style={{color: "green"}}><h1>{data1.recovered}</h1></CardText>
         
        </CardBody>
      </Card>
      <Card style={{padding:20}}>
        <CardImg top width="100%" src={imgind} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Deaths</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Total Deaths in India</CardSubtitle>
          <CardText><h1 style={{color: "red"}}>{data1.deaths}</h1></CardText>
       
        </CardBody>
      </Card>
    </CardDeck>
        </div>
    )
};

