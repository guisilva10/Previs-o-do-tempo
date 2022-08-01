
import { useState } from 'react';



function App() {

  const [city, setCity] = useState("São Paulo")

  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`
    http://api.weatherapi.com/v1/current.json?key=8f31718a6fe04ae792841222220507&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((data) => {
        setWeatherForecast(data)
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expanded-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#toque">
          Previsão do Tempo
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>
            Verifique a previsão do tempo da sua cidade
          </h1>
          <p className="lead">
            Digite o nome da sua cidade e clique em pesquisar
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city} />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="btn btn-primary btn-lg"
          >
            Pesquisar
          </button>

          {
            weatherForecast ? (
              <div>
                <div className='mt-4 d-flex align-items-center p-4'>
                  <div>
                    <img src={weatherForecast.current.condition.icon} />
                  </div>
                  
                <div>

                  <h3> Clima:{weatherForecast.current.condition.text}</h3>
                  <p>
                    Temperatura:{weatherForecast.current.temp_c}°c
                  </p>
                </div>

                </div>
              </div>
            ) : null
          }

        </div>
      </main>
    </div>
  );
}

export default App;
