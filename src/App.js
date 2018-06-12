import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Coin from './Components/Coin';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      coinList: [],
      sortBy: 'ascending',
      pageObj: {
        startIndex: 0,
        endIndex: 50
      }
    }

    this.originList = [];
  }

  componentDidMount(){
    fetch(API_URL, { 
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      this.originList = [...data];
      const coinList = this.originList;
      this.setState({coinList});
    })
    .catch(err => console.log(err))
  }

  loadOriginList = () => {
    const coinList = this.originList;
    this.setState({coinList});
  }  

  handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const pageObj = {
      startIndex: 0,
      endIndex: 50
    }
    e.preventDefault();
    const {filter} = this.state;
    let coinList = this.originList;
    coinList = coinList.filter(coin => coin.name.toUpperCase().indexOf(filter.toUpperCase()) > -1); 
    this.setState({pageObj, coinList});
  }

  handleSorting = (btnType) => {
    const { sortBy, coinList } = this.state;
    const coins = coinList.sort((a, b) => {
      if(btnType === "name"){
        a = a[btnType].toUpperCase();
        b = b[btnType].toUpperCase();
        let num;
        if(sortBy === "ascending"){
          if(a < b) num = -1;
          if(a > b) num = 1;
          return num;
        } else {
          if(a > b) num = -1;
          if(a < b) num = 1;
          return num;
        }
      } else {
        a = Number(a[btnType]);
        b = Number(b[btnType]);
        
        if(sortBy === "ascending")
          return a - b;
        else 
          return b - a;
      }
    })

    this.setState({coinList: coins});
  }

  movePagination = (btnName) => {
    const pageObj = {...this.state.pageObj};
    const coinListLength = this.state.coinList.length;
    if(btnName === "next" && pageObj.endIndex < coinListLength){
      pageObj.startIndex += 50;
      pageObj.endIndex += 50;
    } 
    if(pageObj.startIndex > 0 && btnName === "previous"){
      pageObj.startIndex -= 50;
      pageObj.endIndex -= 50;
    }

    this.setState({pageObj});
  }

  render() {
    const {pageObj, coinList} = this.state;
    let renderCoin = this.state.coinList.slice(pageObj.startIndex, pageObj.endIndex).map((coin, i) => <Coin key={i} coin={coin} />);
    
    return (
      <div>
        {/* {this.state.originList.length > 0 && <Header coinList={this.state.originList} loadCoinList={this.loadCoinList} />} */}
        
        <Header 
          handleInput={this.handleInput} 
          handleSubmit={this.handleSubmit}
          loadOriginList={this.loadOriginList}
          handleSorting={this.handleSorting}
        />

        <div id="container">
        
          {coinList.length > 50 
            && <div>
            <div id="count_result">There are currently {coinList.length} type(s) of cryptocurrency</div>
            <div id="pagination">
              <button onClick={() => this.movePagination("previous")}>Previous</button>
              <button onClick={() => this.movePagination("next")}>Next</button>
            </div></div>}

            {coinList.length <= 50 && coinList.length > 0
            &&
            <div id="count_result">There are currently {coinList.length} type(s) of cryptocurrency</div>}

            {coinList.length === 0 && <div id="count_result">Sorry! We cannot find any type of cryptocurrency you are looking for.</div>}

          <div id="coin_container">
            {renderCoin}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
