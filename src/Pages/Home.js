import React from "react";


export function Home() {
  
  window.M.toast({html: 'Velkommen til MadPlan!'})

  return (
      <div>
      <div class="row">
        <div class="offset-s4 col s4 offset-s4">
          <br></br>
          <center>
            <img style={{width: 100 + '%'}} src="/madplan.jpg" alt=""></img>
            <h5>Madplanlægning gjort nemt</h5>
            <br />
            <p>Det kan være svært at lave en madplan til ugen, som rent faktisk bliver overholdt. Det kan også være 
              svært at skulle finde på mad til så mange dage, når det både skal være sund og varieret kost.</p>
          </center>
        </div>
        
      </div>
    </div>
    )
  }
