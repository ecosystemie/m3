import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Example from "./Deprecated/Example";
import Navbar from "./Navigation";
import PrestartQuestion from "./FormComponents/PrestartQuestion";
import EnergyTableData from "./DataComponents/EnergyTableData";
import LandingPage from "./LandingPage";
import Loading from "./Authentication/Loading";
import ContactInformationData from "./DataComponents/ContactInformationData";
import NoMatch from "./Authentication/NoMatch";
import Dashboard from "./Dashboard";
import Login from "./LoginComponent";
import SignIn from "./Authentication/SignIn";




import AboutUs from "./Authentication/Loading";



export default class App extends React.Component {
    constructor(props) {
        super(props);

    }




    /**
     *
     * Full routing can be found below, index.js is the ReactJS
     * entry point of this application and has the ID root, this
     * can be reconfigured in the app.js file in the 'js' directory
     */


    render() {
        let q = sessionStorage.getItem('authenticated');
        return (
            /*full routing found here*/
            <HashRouter>





                {
                    !q
                ||
                q === 'false' ?
                        <Login />
                :

                        <Navbar />
                    }

                <Switch>


                    {/*<Home exact path="/" component={Dashboard}/>*/}

                    <BlockRoute exact path="/home" component={Dashboard}/>
                    <BlockRoute exact path="/login" component={Login}/>
                    <Route exact path="/data" component={EnergyTableData}/>
                    <Route exact path="/route" component={Example}/>
                    <PrivateRoute exact path="/prestart_questions/" component={PrestartQuestion}/>
                    <PrivateRoute exact path="/profile" component={LandingPage}/>


                    <Route exact path="/loading" component={Loading}/>
                    <PrivateRoute exact path="/Contact" component={ContactInformationData}/>



                    <Route component={NoMatch}/>
                </Switch>

                {/* <Footer2/> */}


            </HashRouter>
        );
    }
}

/**
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 *
 * The consts below create a PrivateRoute and BlockedRoute Tag
 * which allows for the blocking of specific routes contingent
 * on whether the user is logged in or not. This is done using a
 * sessionStorage parameter authenticated
 */

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                sessionStorage.getItem('authenticated') === 'true' ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export const Home = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                sessionStorage.getItem('authenticated') === null ? (
                    <p>hihi</p>
                ) : <p/>

            }
        />
    );
}

/**
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 *
 * The const below created a PrivateRoute Tag
 * which allows for the blocking of specific
 * routes contingent on whether the user is
 * logged in or not. This is done using a
 * sessionStorage parameter authenticated
 */


export const BlockRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                sessionStorage.getItem('authenticated') === 'false' || sessionStorage.getItem('authenticated') === null ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/profile",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};



/**
 *
 */




if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
