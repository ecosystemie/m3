import React from 'react';
import {Button, Col, Form} from 'react-bootstrap';

const CityRegex = new RegExp("^[a-zA-Z]+$"); //
const AddressRegex = new RegExp("^[0-9]+ [a-z]+$"); //"civic number" "street name"
const PostalRegex = new RegExp("/^[a-z][0-9][a-z]\s?[0-9][a-z][0-9]$/");


export default class Question extends React.Component {


    constructor(props) {
        super(props); //required

        this.handleChange = this.handleChange.bind(this); //handle change function
        this.handleSubmit = this.handleSubmit.bind(this); //handle submit function

        this.state = {


            BusinessName: "",
            QuebecAddress: "",
            City: "",
            PostalCode: "",
            CorporateAddress: "",
            IncomeValue: "",
            EmployeeNumber: "",
            OfferToClient: "",
            SectorActivity: "",
            ClientBase: "",

            DiffCorpAddress: "",
            validated: false,


            BusinessNameError: ""

        };
    }


    handleSubmit(e) {
        e.preventDefault();

        const data = this.state; //VERY IMPORTANT

        //checks all auth
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            fetch('/', {
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

        }
        this.setState(({validated: true}));
        console.log(data);


    };

    handleChange(e) {
        { /* = e => */
        }


        this.setState({
            [e.target.name]: e.target.value
        });


        console.log("Name: ", e.target.name);
        console.log("Value: ", e.target.value);
    };

    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }

    showHideDiv(corpAddress) {
        var box = document.getElementById("corpAddress");
        box.style.display = checkCorp.checked ? "block" : "none";

    }

    handleCheck() {
        if (this.state.DiffCorpAddress != "") {
            console.log(this.state.DiffCorpAddress);
            return true;
        }
        return false;
    }


    formValid() {
        const {
            BusinessName, QuebecAddress,
            City, PostalCode, CorporateAddress
        } = this.state;

        let g = BusinessName && QuebecAddress &&
            City && PostalCode && CorporateAddress;


        console.log(g);
        return g
        //Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    };


    render() {
        const {validated} = this.state;
        return (


            < Form noValidate
                   validated={validated}
                   onSubmit={e => this.handleSubmit(e)} method="POST" action="/"> {/*start of form*/}


                {/*group 2*/}

                <Form.Group controlId="validationCustom01">
                    <Col sm="5">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control
                            name="BusinessName"
                            required
                            type="text"
                            placeholder="Business Name"
                            onChange={this.handleChange}
                            value={this.state.BusinessName}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group controlId="validationCustom02">
                    <Col sm="5">


                        <Form.Label>Quebec Address</Form.Label>
                        <Form.Control
                            name="QuebecAddress"
                            required
                            type="text"
                            placeholder="Quebec address"
                            onChange={this.handleChange}
                            value={this.state.QuebecAddress}
                            pattern="^[0-9]+ [a-z]+$"

                        />


                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col sm="5">

                        <Form.Label>City</Form.Label>
                        <Form.Control
                            name="City"
                            required
                            type="text"
                            placeholder="City"
                            onChange={this.handleChange}
                            value={this.state.City}
                            pattern="^[a-zA-Z]+$"
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col sm="5">

                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            maxLength="7" minLength="6"
                            name="PostalCode"
                            required
                            type="text"
                            placeholder="Postal Code"
                            onChange={this.handleChange}
                            value={this.state.PostalCode}
                            pattern="^[a-z][0-9][a-z]\s?[0-9][a-z][0-9]$"
                        />
                        <Form.Control.Feedback type="invalid">Postal Code must contain 6
                            characters</Form.Control.Feedback>
                    </Col>
                </Form.Group>


                <Form.Group>
                    <Col sm="5">
                        <Form.Check controlId="CheckCorp" type="checkbox" label="different corporate address" value="DiffCorpAddress"/>
                        <Form.Control
                            disabled 
                            controlId="corpAddress"
                            name="CorporateAddress"
                            required
                            type="text"
                            placeholder="corporate address"
                            onChange={this.handleChange}
                            value={this.state.CorporateAddress}
                            pattern="^[0-9]+ [a-z]+$"
                        />


                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


                    </Col>
                </Form.Group>


                <Form.Group>
                    <Col sm="5">
                        <Form.Label>Type of Business</Form.Label>


                        <Form.Check
                                    required
                                    type="radio"
                                    class="text-dark"
                                    label="PME Manufacturiere"
                                    name="TypeOfBusiness"
                                    id="formHorizontalRadios1"
                                    value="PME"
                                    onChange={this.handleChange}
                        />
                        <Form.Check type="radio"
                                    label={'TPE Manufacturiere'}
                                    name="TypeOfBusiness"
                                    id="formHorizontalRadios2"
                                    value="TPE"
                                    onChange={this.handleChange}
                        />
                        <Form.Check type="radio"
                                    label={'Entreprise en Distribution'}
                                    name="TypeOfBusiness"
                                    id="formHorizontalRadios3"
                                    value="EntrePriseDistribution"
                                    onChange={this.handleChange}
                        />
                        <Form.Check type="radio"
                                    label={'Entreprise de Services'}
                                    name="TypeOfBusiness"
                                    id="formHorizontalRadios4"
                                    value="EntrepriseServices"
                                    onChange={this.handleChange}
                        />
                        <Form.Check type="radio"
                                    label="Autre"
                                    name="TypeOfBusiness"
                                    id="formHorizontalRadios5"
                                    value="Autre"
                                    onChange={this.handleChange}
                        />

                    </Col>
                </Form.Group>

                <Form.Group> { /*SCIAN code */}

                    <Col sm="5">
                        <Form.Label>Sectors of Activity</Form.Label>

                        <Form.Group as={Col} controlId="formGridState">


                            <Form.Control as="select"  name="SectorActivity"
                                          onChange={this.handleChange} required>
                                <option></option>
                                <option value="SCIAN 11"> Agriculture, foresterie, peche et chasse</option>
                                <option value="SCIAN 21"> Extraction miniere et extracion de petrole et de gaz</option>
                                <option value="SCIAN 22"> Services publics</option>
                                <option value="SCIAN 23"> Construction</option>
                                <option value="SCIAN 31-33"> Fabrication</option>
                                <option value="SCIAN 41"> Commerce de gros</option>
                                <option value="SCIAN 44-45"> Commerce de détail</option>
                                <option value="SCIAN 48-49"> Transport et entreposage</option>
                                <option value="SCIAN 51"> Industrie de l\'information et industrie culturelle</option>
                                <option value="SCIAN 52"> Finance et assurances</option>
                                <option value="SCIAN 53"> Services d\'immobiliers et services de location et de location
                                    à bail
                                </option>
                                <option value="SCIAN 54"> Services professionnels, scientifiques et techniques</option>
                                <option value="SCIAN 55"> Gestion de sociétés et d\'entreprises</option>
                                <option value="SCIAN 56"> Services administratifs, services de soutien, services de
                                    gestion de déchets et services d\'assainissement
                                </option>
                                <option value="SCIAN 62"> Soins de santé et assistance sociale</option>
                                <option value="SCIAN 71"> Arts, spectacles et loisirs</option>
                                <option value="SCIAN 72"> Hébergement et services de restauration</option>
                                <option value="SCIAN 78"> Autres services – sauf les administrations publiques</option>
                            </Form.Control>

                        </Form.Group>
                    </Col>
                </Form.Group>


              ///////////////////////
                //////////////////////////////
                //////////////////////////////

                <Form.Group>


                    <Form.Group as={Col} controlId="formGridState">

                        <Col sm="5">
                            <Form.Label>Number of employees</Form.Label>
                            <Form.Control as="select" name="EmployeeNumber" placeholder="Select Range"
                                          value={this.state.EmployeeNumber}
                                          onChange={this.handleChange}
                                          required
                            >

                                <option></option>
                                <option> Self Employed</option>
                                <option> 1 - 10</option>
                                <option> 11 - 50</option>
                                <option> 51 - 200</option>
                                <option> 201 - 500</option>
                                <option> 501 - 1000</option>
                                <option> 1,001 - 5,000</option>
                                <option> 5,001 - 10,000</option>
                                <option> 10,000+</option>

                            </Form.Control>
                        </Col>
                    </Form.Group>

                </Form.Group>



                <Form.Group>
                    <Col sm="5">
                        <Form.Label>Does your business have committee working towards sustainable development
                        </Form.Label>
                        <Form.Check
                            required
                            type="radio"
                            label="Yes"
                            name="ExistCommittee"
                            id="formHorizontalRadios1"
                            value="Yes"
                            onChange={this.handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="ExistCommittee"
                            id="formHorizontalRadios2"
                            value="No"
                            onChange={this.handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col sm="5">
                        <Form.Label>On what level does your business operate
                        </Form.Label>
                        <Form.Check
                            required
                            type="radio"
                            label="Regional"
                            name="BusinessLevel"
                            id="formHorizontalRadios1"
                            value="Regional"
                            onChange={this.handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Provincial"
                            name="BusinessLevel"
                            id="formHorizontalRadios2"
                            value="Provincial"
                            onChange={this.handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="National"
                            name="BusinessLevel"
                            id="formHorizontalRadios3"
                            value="National"
                            onChange={this.handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="International"
                            name="BusinessLevel"
                            id="formHorizontalRadios4"
                            value="International"
                            onChange={this.handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col sm="5">
                        <Form.Label>What is your general client base
                        </Form.Label>

                        <Form.Check
                            required
                            type="radio"
                            label="Individuals"
                            name="ClientBase"
                            id="individuals"
<<<<<<< HEAD:resources/js/components/home/Questionnaires/Question.js
                            value="Individuals"
                            onChange={this.handleChange}/>

                        <Form.Check

                            type="radio"
                            label="Businesses"
                            name="ClientBase"
                            id="Businesses"
                            value="Businesses"
                            onChange={this.handleChange}/>
                        <Form.Check
                            type="radio"
                            label="Buying Groups"
                            name="ClientBase"
                            id="Buyinggroups"
                            value="BuyingGroups"
                            onChange={this.handleChange}/>
                        <Form.Check
                            type="radio"
                            label="Resellers or Distributors"
                            name="ClientBase"
                            id="Resellers"
                            value="ResellersDistributors"
=======
                            value=""
>>>>>>> ee81fa84af03a311420d5cc89a449f8d1d6286de:resources/js/components/home/questionnaires/Question.js
                            onChange={this.handleChange}/>
                    </Col>
                </Form.Group>


                <Form.Group as={Col}>


                    <Col lg="5">
                        <Form.Label>What do you Offer to Clients</Form.Label>
                        <Form.Control as="textarea" required rows="3" name="OfferToClient" type="text"
                                      onChange={this.handleChange}
                                      value={this.state.OfferToClient}
                                      placeholder="a short description is required">

                        </Form.Control>
                    </Col>
                </Form.Group>


                <Form.Group as={Col} controlId="formGridState">

                    <Col sm="5">
                        <Form.Label>Business annual total income</Form.Label>
                        <Form.Control as="select" required name="IncomeValue"
                                      value={this.state.IncomeValue}
                                      onChange={this.handleChange} defaultvalue="">
                            <option></option>
                            <option> {"<"} 99,999$"</option>
                            <option> 100,000$ - 449,999$</option>
                            <option> 500,000$ - 999,999$</option>
                            <option> 1,000,000$ - 4,999,999$</option>
                            <option> 5,000,000$ - 9,999,999$</option>
                            <option> 10,000,000$ - 24,999,999$</option>
                            <option> 25,000,000$ - 49,999,999$</option>
                            <option> 50,000,000$ - 99,999,999$</option>
                            <option> 100,000,000$ - 249,999,999$</option>
                            <option> {">"} 250,000,000$</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Col sm="5">
                    <Button variant="primary"
                            type="submit" /*onClick={this.handleSubmit} disabled={!this.formValid()} */  >
                        Submit
                    </Button>
                </Col>


            </Form>


        );

    }
}



