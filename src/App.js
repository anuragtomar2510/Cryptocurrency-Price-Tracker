import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin'
const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {

    axios.get(url)
      .then(response => {

        setCoins(response.data)
        console.log(response.data)
      })
      .catch(err => console.log(err))

  }, [])

  const changeHandler = (event) => {

      setSearch(event.target.value)

  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
            <div className="coin-app">
              <div className="coin-search">
                <h1 className="coin-text">Cryptocurrency Price Tracker</h1>
                <form>
                  <input type="text" className="coin-input" placeholder="Search a currency" onChange={changeHandler}></input>
                </form>

              </div>
                  {filteredCoins.map(coin => 
                    <Coin key={coin.id} 
                    image={coin.image} 
                    name={coin.name} 
                    symbol={coin.symbol} 
                    price={coin.current_price} 
                    marketCap={coin.market_cap} 
                    priceChange={coin.price_change_percentage_24h}
                    volume={coin.total_volume}/>)}

              
            </div>
       
    
  )

}

export default App;
