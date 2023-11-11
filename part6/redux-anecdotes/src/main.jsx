import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'


import { Provider } from 'react-redux'
import App from './App'

import store from "./utils/store"

// import reducer from './reducers/anecdoteReducer'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'

// import noteReducer, { addAnecdotes, vote } from './reducers/anecdoteReducer'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)