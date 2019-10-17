import React from 'react';
// import Styles from 'STYLES/bass.scss';
import configureStore from './store';
import {Provider} from "react-redux";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from 'CONTAINERS/Home';
import RouterConfig from './router';

const store = configureStore();
const App = props => (
    <Provider store={store}>
        {/* <Main data={'ceshi'} /> */}
        <HashRouter>
            <Switch>
                {

                    RouterConfig.map( ( item , index ) => {

                        return <Route exact key={ index } path={ item.path } component={ item.component }/>
                        
                    })

                }
            </Switch>
        </HashRouter>

    </Provider>
)

export default App;