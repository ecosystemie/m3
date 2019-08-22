import {Button, Card, Form, FormGroup, Row, Col, Alert} from "react-bootstrap";
import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import Person from '@material-ui/icons/VpnKey';
import "../../../sass/animation.css"
import {FormattedHTMLMessage} from "react-intl";
/**
 * Registartion form using firebase to create an account in the m3
 * system, upon registration, the user should be stored in both the
 * firebase authentication system as well as the 'register' table
 * in the database
 */

const EmailVerification = "Email Verifcation Link Sent";
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            organization: '',
            email: '',
            password: '',
            passwordConfirm: '',
            passwordStrength: 'd-none',
            passwordMatch: "d-none",
            errors: {},
            LoginOrRegister: this.props.select,
            error: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePasswordStrength = this.handleChangePasswordStrength.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     *
     * @param e
     *
     * Crucial function, allows for forms (textboxes) all over the page
     * to allow for data to be entered into them
     */
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    clearState = () => {
        this.setState({
            name: '',
            organization: '',
            email: '',
            password: '',
            passwordConfirm: '',
        })
    }

    sendData = () => {
        this.props.parentCallback(false);
    }
    componentDidMount = () => {
        console.log(this.state.LoginOrRegister);
    }

    handleSwitch = () => {

    }

    forgotPassword = () => {

        var email = this.state.email;
        if (email === '') {

            this.setState({
                error: 'NoEmail'
        })
        }
        else {

            firebase.auth().sendPasswordResetEmail(email).then({})
        }

}


    /**
     *
     * @param e
     * Checks if password entered obeys the requirement set by
     * the regex pattern strongRegex
     */
    handleChangePasswordStrength(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
        if (!this.state.password.match(strongRegex)) {
            this.setState({
                passwordStrength: "d-flex"
            });

        } else {
            this.setState({
                passwordStrength: "d-none"
            });
        }
    }

    /**
     *
     * @param e
     * Handles form submission, makes a call to firebase using the .createUserWithEmailAndPassword
     * function, the parameters are taken from the state. The same data is posted to the register table
     * using the /register RestAPI call
     */

    handleSubmit = (e) =>
    {
        e.preventDefault();

        let currentComponent = this
        // Checks passwords match
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                passwordMatch: "d-flex"
            });
            return;
        }

        let uid = null;
        let name = this.state.name;
        let organization = this.state.organization;
        let email = this.state.email;


        // Signs user up and send data to custom backend
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => { //catches login errors

                console.log(error.code);

                switch(error.code) {
                    case 'auth/invalid-email':
                        this.setState({error: 'Error: Invalid Email',
                            email: '',
                            password: '',})


                        break;
                    case 'auth/weak-password':
                        this.setState({error: 'Error: Password too weak',
                            password: '',
                            passwordConfirm: '',})


                        break;
                    case 'auth/email-already-in-use':
                        this.setState({error: 'Error: This email is in use',
                            email: '',
                            password: '',
                            passwordConfirm: '',})


                        break;

                }


                /*
                    console.log(error.code);
                    this.setState({error: error.code})
                    */


                this.setState({
                    email: '',
                    password: '',
                })

                return;

            })
            .then(function () {
                // SECURITY PROBLEM ?

                console.log('pe')
                firebase.auth().currentUser.sendEmailVerification().then(function () {
                    currentComponent.setState({error: "Email Verifcation Link Sent"})
                })




                let data = {
                    uid: firebase.auth().currentUser.uid,
                    name: name,
                    organization: organization,
                    email: email
                };

                currentComponent.clearState

                fetch('/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        "Content-type": "application/json"
                    }
                })
                    .then(function (data) {
                        console.log('Request succeeded with JSON response', data);


                    })
                    .catch(function (error) {
                        console.log('Request failed', error);
                    });


                console.log(data);

            }).catch(function (error) {
            // Sign Up errors
            console.log(error.code);
            console.log(error.message);

            if (error.code === 'auth/email-already-in-use') {
                alert("this email is already in use");
            }
            console.log(error.code);
            console.log(error.message);
        });


    };


    /**
     *
     * @returns {*}
     * Card Form Group made using bootstrap Form, Card, and Button
     * This is the register form which allows new users to create
     * accounts, each Form has an ID and a Label to make identification
     * easy
     */
    render()
    {
        return (
            <div>
                <br/>
                <br/>
                <Card id="test">
                    <Card.Header className="d-flex justify-content-center login-btn-color-font"><Person />  Forgot Password</Card.Header>
                    <Card.Body>

                        <form id="registerForm">


                                {/**
                                 * Each new entry requires
                                 * <Form.Group>
                                 * <Form.Label>Label</Form.Label>
                                 * <Form.Control />
                                 * </Form.Group>
                                 */}
                                <Form.Group controlId="signUpFormName">
                                    <Form.Label><FormattedHTMLMessage id="Register.Name"
                                                                      defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                                      description="Welcome header on app main page"
                                                                      values={{what: 'react-intl'}}/></Form.Label>
                                    <Form.Control name="name" type="text" onChange={this.handleChange}
                                                  placeholder="Email"/>
                                </Form.Group>



                                </form>

                        <Row>
                            <Col>
                        <Button variant="outline-info"  onClick={this.sendData}>
                            <FormattedHTMLMessage id="Register.SignIn"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/>
                        </Button>
                            </Col>

                            <Col>
                            <Button variant="outline-info"  onClick={this.forgotPassword}>
                                <FormattedHTMLMessage id="Register.SignIn"
                                                      defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                      description="Welcome header on app main page"
                                                      values={{what: 'react-intl'}}/>
                            </Button>
                            </Col>
                        </Row>



                    </Card.Body>
                </Card>
            </div>
        );
    }
}