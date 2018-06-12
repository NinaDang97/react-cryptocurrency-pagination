import React from 'react';
import Logo from '../logo.png';

const Header = (props) => (
    <div id="header">
        <div id="logo">
            <img src={Logo} alt="Logo" onClick={props.loadOriginList} />
        </div>
        <div id="sort">
            <label>sort by: </label>
            <select name="sortBy" onChange={props.handleInput}>
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
            </select>
            <button onClick={() => props.handleSorting("name")}>name</button>
            <button onClick={() => props.handleSorting("price_usd")}>price</button>
            <button onClick={() => props.handleSorting("rank")}>rank</button>
        </div>
        <div>
            <form onSubmit={props.handleSubmit}>
                <input 
                    type="text" 
                    name="filter" 
                    id="filter" 
                    placeholder="search crypto name..."
                    onChange={props.handleInput}    
                />
                <button>filter</button>
            </form>
        </div>        
    </div>
)

export default Header;