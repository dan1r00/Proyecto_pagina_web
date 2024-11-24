import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaDeProductos from './components/ListaDeProductos';
import ProductoDetalle from './components/ProductoDetalle';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ListaDeProductos} />
                <Route path="/producto/:id" component={ProductoDetalle} />
            </Switch>
        </Router>
    );
};

export default App;
