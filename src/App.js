import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* left fiv */}
       <div className='info'>
          <div className='inDiv'>
            <div className='searchBox'> 
                <div> <FontAwesomeIcon className='location' icon={faLocationDot} /> </div> 
                <div> <input className='input'></input> </div> 
                <div> <FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} />  </div>
            </div>
            <div className='sevenDay'></div>
            <div className='graphs'></div>
          </div>
       </div>

       {/* right div */}
       <div className='map'>
          <iframe className='iframe'>
          </iframe>
       </div>
    </div>
  );
}

export default App;
