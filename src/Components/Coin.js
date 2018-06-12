import React from 'react';

const Coin = (props) =>{
    const {name, rank, price_usd, percent_change_1h} = props.coin;
    return (
        <div className="coin">
            <h4>{name}</h4>
            <div>Rank: {rank}</div>
            <div>Price in USD: {price_usd}</div>
            <div>Change in market %: {percent_change_1h}</div>
        </div>
    )
}

export default Coin;