import React, { useState } from 'react';
import MainDrawer from '../../components/drawer';
import { headers } from '../../utils/utils'
import Categories from '../categories/Categories'
import Dashboard from '../dashboard/Dashboard';
import NewEntry from '../entries/Entries'
import Products from '../products/Products'
// import Reports from '../reports/Reports'
import { Route, Switch, useHistory } from 'react-router-dom'
import { CategoryContext } from "../../contexts/CategoryContext";



function Home(props) {
    var history = useHistory();
    const { window, location } = props;
    const { pathname } = props.location;
    var prevData;

    const { isLogin, setLogin } = useState(false)
    
    if (!localStorage.getItem('userData')) {
        return (
            <button onClick={() => history.replace('/')}>
                Please Login to continue
            </button>
        )
    } else {
        return (
            <MainDrawer pathName={pathname} >
                <Switch>
                    <Route path="/home" exact component={Dashboard} />
                    <Route path="/home/Categories" component={Categories} />
                    <Route path="/home/Entries" component={NewEntry} />
                    <Route path="/home/Products" component={Products} />
                </Switch>
            </MainDrawer>

        )
    }
}

export default Home
