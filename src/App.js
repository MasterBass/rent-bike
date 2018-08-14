import React from 'react';
import {Route, Switch} from 'react-router';
import About from './components/about/AboutPage';
import Register from './components/account/RegisterPage';
import Login from './components/account/LoginPage';
import UsersPage from './components/user/UsersPage';
import ManageUser from './components/user/ManageUserPage';
import ReservationList from './components/reserve/ReservationListPage';
import UserReport from './components/report/UserReportPage';
import BikeReport from './components/report/BikeReportPage';
import Home from './components/home/HomePage';
import ColorPage from './components/bike/color/ColorsPage';
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';
import ManageBikePage from "./components/bike/ManageBikePage";
import BikesPage from "./components/bike/BikesPage";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <PrivateRoute exact path='/' component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <PrivateRoute path='/manage-users' roleName='admin' component={UsersPage}/>
                    <PrivateRoute path='/user/:id' roleName='admin' component={ManageUser}/>
                    <PrivateRoute path='/reservation-list' component={ReservationList}/>
                    <PrivateRoute path='/report-users' roleName='admin' component={UserReport}/>
                    <PrivateRoute path='/report-bikes' roleName='admin' component={BikeReport}/>
                    <PrivateRoute exact path='/colors' roleName='admin' component={ColorPage}/>
                    <PrivateRoute exact path='/bike' roleName='admin' component={ManageBikePage}/>
                    <PrivateRoute exact path='/bike/:id' roleName='admin' component={ManageBikePage}/>
                    <PrivateRoute path='/bikes' component={BikesPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
