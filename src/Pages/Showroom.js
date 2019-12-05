import React, {useState, useEffect} from "react";
import facade from "../apiFacade";
import {backend_url1, backend_url2, backend_url3} from "../settings.js"


export function Showroom(){
    return (
      <div>
        <center>
        <h3>Showroom</h3>
        </center>
        <div class="row">
          <div class="s12">
              <AllFlights from={backend_url1}/>
          </div>
        </div>
        <div class="row">
          <div class="s12">
              <AllFlights from={backend_url2}/>
          </div>
        </div>
        <div class="row">
          <div class="s12">
              <AllFlights from={backend_url3}/>
          </div>
        </div>
      </div>
    )
  }

  const AllFlights = ({from}) => {
    const [flightsData, setFlightsData] = useState([]);

    useEffect(() => {
      facade.fetch_AllFlights(from).then(data => setFlightsData(data));
    }, [flightsData, from]);

    return (
      <div>
        <center><h5>Alle afgange fra API</h5></center>
        <center><p style={{fontSize: "8px;"}}>{from}</p></center>
        <center><p>Fandt: <b>{flightsData.length} </b>afgange</p></center>

        {/* <center>
          <div class="row">
            <div class="col s3">
              <button class="btn waves-effect waves-light btn-large" type="submit" name="action">Filter pris (billigst)</button> 
            </div>
            <div class="col s3">
              <button class="btn waves-effect waves-light btn-large" type="submit" name="action">Filter pris (dyreste)</button>
            </div>
            <div class="col s3">
              <button class="btn waves-effect waves-light btn-large" type="submit" name="action">Filter dato</button> 
            </div>
            <div class="col s3">
              <button class="btn waves-effect waves-light btn-large" type="submit" name="action">Filter selskab</button>
            </div>
          </div>
        </center> */}
  
        {flightsData.map(flight =>

          <div class="col s4">
            <div class="card horizontal" style={{width:"100%"}}>
              <div class="card-image teal">
                <p style={{writingMode: "vertical-rl", marginTop: "30px", color:"white"}}>{flight.airline}</p>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p><b>ID:  </b>{flight.id}</p>
                  <b><h4 style={{display: "inline-block"}}><b>{flight.arrivalAirportName}</b></h4><p style={{display: "inline"}}> ({flight.arrivalAirportCode})</p></b>
                  <br></br>
                  <h6 style={{display: "inline-block"}}>Afgang fra: <b>{flight.departureAirportName}<p style={{display: "inline"}}> ({flight.departureAirportCode})</p></b></h6>
                  <br></br>
                  <h6>{flight.departureTime}</h6>
                </div>
                <div class="card-action">
                  <h5 style={{display: "inline-block"}}>Pris: {flight.price} USD </h5>
                  <br></br>
                  <a class="waves-effect waves-light btn-small red" href={flight.link}>Gå til</a>
                </div>
              </div>
            </div>
          </div>
       
        )}
      </div>
      
    )
  }