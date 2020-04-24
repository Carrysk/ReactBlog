import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Pages/Main';
import store from './store/index'
import {Provider} from 'react-redux'

const App = () => (
    <Provider store={store}>
        <Main/>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));