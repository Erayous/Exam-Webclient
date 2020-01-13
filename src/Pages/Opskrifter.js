import React, {useState, useEffect} from "react";
import facade from "../apiFacade";






export function Showroom(){
    return (
      <div>
        <center>
        <h5>Opskrifter</h5>
        </center>
        <div class="row">
          <div class="s12">
              <SearchFlight />
              <AllRecipes/>
          </div>
        </div>
      </div>
    )
  }

  const AllRecipes = () => {
    const [RecipeData, setRecipeData] = useState([]);
    //const [SaveData, setSaveData] = useState([]);

    useEffect(() => {
      facade.fetch_AllRecipes().then(data => setRecipeData(data));
    }, [RecipeData]);

    //const performSave = (evt) => {
    //  evt.preventDefault();
    //  facade.fetchData(evt).then(data => setSaveData(data));
    //}
    // button onClick={performSave} id={recipe.u_id}


    return (
      <div>
        <center><p>Alle recipes fra API</p></center>
        <center><p>Fandt: <b>{RecipeData.length} </b>afgange</p></center>
      
        {RecipeData.map(recipe =>

          <div class="col s4">
            <div class="card horizontal" style={{width:"100%", height:"300px"}}>
              <div class="card-image teal">
                <p style={{writingMode: "vertical-rl", marginTop: "30px", color:"white"}}><b>RECIPE</b></p>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p><b>{recipe.id}</b></p>
                  <p>{recipe.description}</p>
                  <br></br>
                  <p>{recipe.prep_time}</p>
                </div>
                <div class="card-action">
                  <div>
                    
                    <button className="waves-effect waves-light btn" >Gem</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
        )}
      </div>
      
    )
  }

  function SearchFlight() {
    const init = {id: ""};
    const [searchInfo, setsearchInfo] = useState(init);
    const [searchData, setSearchData] = useState([]);

    const performSearch = (evt) => {
      evt.preventDefault();
      facade.search(searchInfo.id).then(data => setSearchData(data));
    }

    const onChange = (evt) => {
      setsearchInfo({searchInfo, [evt.target.id]: evt.target.value})
    }

    return (
      <div>
        <div class="row">
          <div class="offset-s3 col s6 offset-s3">
            <div class="card-panel">
              <form onChange={onChange} style={{display: "inline-block", width: "100%"}}>
                <br/>
                <div class="row" style={{width: "100%"}}>
                  <div class="col" style={{width: "100%"}}>
                    <p>Søg efter: </p>
                    <input id="id" type="text" class="validate" style={{borderBottom: "2px solid red", display: "inline"}} required/>
                  </div>
                </div>
                <br/>
                <button className="waves-effect waves-light btn" onClick={performSearch}>Find opskrift</button>
                <br/>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="s12">
            <LetsSearch searchData={searchData} />
          </div>
        </div>
      </div>
    )
  
  }

  function LetsSearch({searchData}){
    //const [SaveData, setSaveData] = useState([]);

    // const performSave = (evt) => {
    //  evt.preventDefault();
    //  facade.fetchData(evt).then(data => setSaveData(data));
    //}

    // onClick={performSave} id={recipe.u_id}

    return (
    <div>
        {searchData.map(recipe =>
          <div class="col s4">
            <div class="card horizontal" style={{width:"100%", height:"300px"}}>
              <div class="card-image teal">
                <p style={{writingMode: "vertical-rl", marginTop: "30px", color:"white"}}><b>RECIPE</b></p>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p><b>{recipe.id}</b></p>
                  <p>{recipe.description}</p>
                  <br></br>
                  <p>{recipe.prep_time}</p>
                </div>
                <div class="card-action">
                  <div>
                    <button className="waves-effect waves-light btn" >Gem</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }