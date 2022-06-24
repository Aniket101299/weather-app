import './App.css';

function App() {
  return (
    <div className="App">
      {/* left fiv */}
       <div className='info'>
          <div className='inDiv'>
            <div className='searchBox'> <input className='input'></input> </div>
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
