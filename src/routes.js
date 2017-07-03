import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './containers/home';
import Heroes from './containers/heroes';
import Sorting from './containers/sorting';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/sorting" component={Sorting} />
        <Route path="*" component={Home}>
            <Redirect to="/" />
        </Route>
    </Switch>
);
