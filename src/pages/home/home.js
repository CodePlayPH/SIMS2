import React, { useState } from 'react';
import Drawer from '../../components/drawer';
import { headers } from '../../utils/utils'
// import Categories from '../categories/Categories'
// import Dashboard from '../dashboard/Dashboard'
// import NewEntry from '../entries/NewEntry'
// import Products from '../products/Products'
// import Reports from '../reports/Reports'
import { Route, Switch } from 'react-router-dom'
import { CategoryContext } from "../../contexts/CategoryContext";



function Home(props) {
    const { window, location } = props;
    const { pathname } = props.location;
    
    return (
        
        <Drawer pathName={pathname}>
            <Switch>
                {/* <Route path="/home" exact component={Dashboard} /> */}
                {/* <Route path="/home/Categories" component={Categories} />
                <Route path="/home/Products" component={Products} />
                <Route path="/home/Entries" component={NewEntry} />
                <Route path="/home/Reports" component={Reports} /> */}
                {/* <Route path="/home/Grocery" component={Grocery} /> */}

            </Switch>
        </Drawer>
    )
}

export default Home
