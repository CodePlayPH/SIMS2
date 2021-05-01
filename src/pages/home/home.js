import React, { useState, useEffect, useContext } from 'react';
import MainDrawer from '../../components/drawer';
import { headers } from '../../utils/utils'
import Categories from '../categories/Categories'
import Dashboard from '../dashboard/Dashboard';
import NewEntry from '../entries/Entries'
import Products from '../products/Products'
// import Reports from '../reports/Reports'
import { Route, Switch, useHistory } from 'react-router-dom'
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from '../../contexts/ProductContext'
import { SizeContext } from '../../contexts/SizeCotext'
import { DashboardContext } from '../../contexts/DashboardContext';

import Register from '../auth/Register';
import Page_not_found from './page_not_found';
import Sizes from '../sizes/Sizes';
import History from '../history/History';
import NotFound from '../not_found/NotFound';




function Home(props) {
    var history = useHistory();
    const { window, location } = props;
    const { pathname } = props.location;
    var prevData;

    const { isLogin, setLogin } = useState(false)

    const { fetchCategories } = useContext(CategoryContext)
    const { fetchSizes } = useContext(SizeContext)
    const { fetchProducts } = useContext(ProductContext)
    const {fetchTopEntries,fetchSales} = useContext(DashboardContext)

    useEffect(() => {

        Promise.all([fetchCategories(), fetchSizes()]).then((values) => {
            fetchProducts()
        });
        fetchTopEntries('month');
        fetchSales();
    }, [])
    
    if (!localStorage.getItem('userData')) {
        return (
            <Page_not_found />
        )
    } else {
        return (
            <div>
            <MainDrawer pathName={pathname} >
                <Switch>
                    <Route path="/home" exact component={Dashboard} />
                    <Route path="/home/Categories" component={Categories} />
                    <Route path="/home/Entries" component={NewEntry} />
                    <Route path="/home/History" component={History} />
                    <Route path="/home/Products" component={Products} />
                    <Route path="/home/Sizes" component={Sizes} />
                    {/* <Route component={NotFound} /> */}
                    
                </Switch>
            </MainDrawer>

            <Route path="/Register" component={Register} />
            </div>
        )
    }
}

export default Home
