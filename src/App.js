import './App.css';
import React, { useState } from 'react';
import Filters from './containers/Filters';
import FilterContext from './FilterContext';
import CategoryChart from './containers/CategoryChart';
import TransactionValueCard from './containers/TransactionValueCard';

function App() {
  const [filter, setFilter] = useState({ quarter: 1, year: 2021, geo: 'state-wise', state: "madhya pradesh", district: ""})
  return (
    <div className="App">
      <FilterContext.Provider value={{ filter, setFilter}}>
        <Filters />
        <br />
        <TransactionValueCard />
        <CategoryChart />
      </FilterContext.Provider>
    </div>
  );
}

export default App ;
