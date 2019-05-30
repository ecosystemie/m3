import React from 'react';
import {Button, Card, Col, Container, Form, FormGroup, Row} from 'react-bootstrap';

export default class Dashboard extends React.Component
{
    render()
    {
        return (
            <Container className="mt-4">
                <Row>
                    <Col sm>info for website</Col>
                    <Col sm>
                        <SignUpForm/>
                    </Col>
                </Row>
            </Container>
        );
    }
}


class SignUpForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePasswordStrength = this.handleChangePasswordStrength.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            organization: '',
            email: '',
            password: '',
            passwordConfirm: '',
            passwordStrength: 'd-none',
            passwordMatch: "d-none"
        }
    }

    handleChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleChangePasswordStrength(e)
    {
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

    handleSubmit(e)
    {
        e.preventDefault();

        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                passwordMatch: "d-flex"
            });
            return;
        }

        let data = {
            name: this.state.name,
            organization: this.state.organization,
            email: this.state.email,
            password: this.state.password,
        };

        fetch('/SignUp', {
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

    };


    render()
    {
        return (
            <Card>
                <Card.Header className="d-flex justify-content-center login-btn-color-font"><i
                    className="fas fa-user-plus icon-transform"/>Sign Up</Card.Header>
                <Card.Body>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup role="form">
                            <Form.Group controlId="signUpFormName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" onChange={this.handleChange}
                                              placeholder="Enter name"/>
                            </Form.Group>

                            <Form.Group controlId="signUpFormOrganization">
                                <Form.Label>Organization</Form.Label>
                                <Form.Control name="organization" onChange={this.handleChange} type="text"
                                              placeholder="Enter organization name"/>
                            </Form.Group>

                            <Form.Group controlId="signUpFormEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleChange}
                                              placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group controlId="signUpFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password"
                                              onChange={this.handleChangePasswordStrength}
                                              placeholder="Password"/>
                            </Form.Group>

                            <div className={"mt-3 red-text ".concat(this.state.passwordStrength)}>
                                Password must contain at least 8 characters, and at least one lowercase character,
                                uppercase character and number.
                            </div>

                            <Form.Group controlId="signUpFormPasswordCheck">
                                <Form.Label>Retype password</Form.Label>
                                <Form.Control name="passwordConfirm" type="password" onChange={this.handleChange}
                                              placeholder="Retype Password"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                            <div className={"mt-3 red-text ".concat(this.state.passwordMatch)}>
                                These passwords don't match
                            </div>
                        </FormGroup>
                    </form>
                </Card.Body>
            </Card>
        );
    }
}