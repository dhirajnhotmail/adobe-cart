import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ShoppingList from "./Pages/ShoppingListPage/shoppingList";
import Cart from "./Pages/CartPage/cart";

export default class Routes extends React.Component {
  render = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ShoppingList}></Route>
            <Route path="/Cart" component={Cart}></Route>
          </Switch>
        </div>
      </Router>
    );
  };
}
