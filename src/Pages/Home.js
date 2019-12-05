import React, {useState, useEffect} from "react";
import facade from "../apiFacade";

export function Home() {
  
  window.M.toast({html: 'Velkommen til RushFlight'})

    
  return (
      <div>
      <div class="row">
        <div class="offset-s4 col s4 offset-s4">

          <center>
            <img style={{width: 60 + '%'}} src="/rushflight.png"></img>
            <h5>CPHBusiness Exam Project</h5>
          </center>
        </div>
        <SearchFlight/>
      </div>
    </div>
    )
  }

  function SearchFlight() {
    const init = {departure: "", arrival: "", date: ""};
    const [searchInfo, setsearchInfo] = useState(init);
    const [searchData, setSearchData] = useState([]);

    const [filterData, setfilterData] = useState("");

    const performSearch = (evt) => {
      evt.preventDefault();
      facade.search(searchInfo.departure, searchInfo.arrival, searchInfo.date).then(data => setSearchData(data));
    }

    const onChange = (evt) => {
      setsearchInfo({...searchInfo, [evt.target.id]: evt.target.value})
    }

    const dropDownValue = (event) => {
      console.log('Selected value:', event.target.value);
      setfilterData(event.target.value);
    }
  
    return (
      <div>
        <div class="row">
          <div class="offset-s3 col s6 offset-s3">
            <div class="card-panel">
              <form onChange={onChange} style={{display: "inline-block"}}>
                <br/>
                <p>Fra: </p>
                <input id="departure" type="text" class="validate" placeholder="Copenhagen" style={{borderBottom: "1px solid #fff", display: "inline"}} required/>
                <br/>
                <p>Til: </p>
                <input id="arrival" type="text" class="validate" placeholder="Frankfurt" style={{borderBottom: "1px solid #fff", display: "inline"}} required />
                <br/>
                <p>Dato: </p>
                <input id="date" type="text" class="validate" placeholder="2019-11-22" style={{borderBottom: "1px solid #fff", display: "inline"}} required/>
                <br/>
                <p>Filter</p>
                <select class="browser-default" onChange={dropDownValue}>
                  <option value="" disabled selected>Vælg flyselskab</option>
                  <option value="1">RushFlight</option>
                  <option value="2">Norwegian Air Shuttle</option>
                  <option value="3">Option 3</option>
                </select>
                <br/>

                <button className="waves-effect waves-light btn" onClick={performSearch}>Find destinationer</button>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="offset-s3 col s6 offset-s3">
            <LetsSearch searchData={searchData} filterData={filterData}/>
          </div>
        </div>
      </div>
    )
  
  }

  function LetsSearch({searchData}, {filterData}){

    /// Input Props
    //var filterData = {filterData};
    console.log(filterData);

    var filterPrice = 0;
    var displayData = [];

    /// Log
    console.log("I received: ", {filterData})

    ///Filter By AirCarrier
    if(filterData == 2){
      displayData = searchData.filter(t=>t.airline ==='Norwegian Air Shuttle');
      console.log(displayData)
    }else{
      displayData = searchData;
    }

    /// Filter by Ascending
    if(filterPrice == 1){
      displayData = searchData.sort((a, b) => (a.price - b.price));
    }

    /// Filter by Descending
    if(filterPrice == 0){
      displayData = searchData.sort((a, b) => (b.price - a.price));
    }

    return (
    <div>
        {displayData.map(flight =>
        <div class="row">
          <div class="col s12">
            <div class="card horizontal" style={{width:"100%"}}>
              <div class="card-image teal">
                <p style={{writingMode: "vertical-rl", marginTop: "30px", color:"white"}}>{flight.airline}</p>
              </div>
              <div class="card-stacked">
                <div class="card-content">

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
        </div>
        )}
      </div>
    )
  }