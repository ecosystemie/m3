import {Form, Table} from "react-bootstrap";

import React from "react";
import axios from 'axios/index';
import { FormattedHTMLMessage } from 'react-intl'

/**
 * Energy table with conditional rendering allowing users
 * to add their energy expenditures to the database
 */
export default class EnergyTable extends React.Component {


    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this); //handle change function
        this.handleSubmit = this.handleSubmit.bind(this); //handle submit function

        this.state = {

            GazNaturel: "",
            GazUnite: "",

            Propane: "",
            PropaneUnite: "",

            EssencePompe: "",
            EssenceUnite: "",

            GazolePompe: "",
            GazoleUnite: "",

            FioulDomestique: "",
            FioulUnite: "",

            MazoutLeger: "",
            MazoutUnite: "",

            Charbon: "",
            CharbonUnite: "",

            Cammionage: "",
            CammionageUnite: "",

            TotalElectricite: "",
            ElectriciteUnite: "",

            Fossil: "",
            FossileUnite: "",

            Biodiesel: "",
            BiodieselUnite: "",

            Bois: "",
            BoisUnite: "",

            Soudure: "",
            SoudureUnite: "",

            CNC: "",
            UsinageUnite: "",

            VapeurFroid: "",
            VapeurUnite: "",

            Vin: "",
            VinUnite: "",

            Biere: "",
            BiereUnite: "",

            Halocarbunes: "",
            HaloUnite: "",

            AutreMethane: "",
            AutreMethaneUnite: "",

            n2osol: "",
            n2osolUnite: "",

            n2oanimaux: "",
            n2oanimauxUnite: "",

            MethaneAnimaux: "",
            MethaneAnimauxUnite: "",

            Coke: "",
            CokeUnite: "",


            SCIAN: "",
            UID: "",
            TableSubmit: sessionStorage.getItem('TableSubmit'),
            EnergyCategories: [],


        }


    }

        componentDidMount() {
        let uid = sessionStorage.getItem('UID');
        console.log(uid);
        axios.get('/scian/' + uid)
            .then(response => {
                console.log(response.data);
                this.setState({SCIAN: response.data, UID: uid});
            });

            axios.get('/test/')
                .then(response => {
                    console.log(response.data);
                    this.setState({EnergyCategories: response.data});
                });


        console.log(this.state.EnergyCategories);
    }



    /*
        componentDidMount() {
            axios.get('/prestart')
                .then(response => {
                    this.setState({categories: response.data});

                });
        }
        */


    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });


        console.log("Name: ", e.target.name);
        console.log("Value: ", e.target.value);
    };

    handleSubmit(e) {
        e.preventDefault();

        const data = this.state; //VERY IMPORTANT

        //checks all auth
        /*
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
        */





        fetch('/categorie', {
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
                console.log("why");
            });


        /* this.setState(({validated: true})); */
        console.log((data));


    };


    /**
     * Restrictions (2019-06-14)
     *
     * CHARBON                  21; 32; 33
     * COKE                     21; 32; 33
     * BOIS                     11; 21; 32; 33
     * ACHATS VAPEUR/FROID      21; 32; 33
     * FERMENTATION VIN         31
     * GAZIFICATION BIERRE      31
     * EMISSION N2O ENGRAIS SOL 11; 31
     * EMISSION N2O ANIMAUX     11
     * AUTRES EMISSIONS METHANE 11
     * EMISSIONS HALOCARBURES   21; 32; 33
     * USINAGE ET TOURNAGE      21; 32; 33
     * SOUDURE                  21; 32; 33
     *
     *
     */
    render() {
        let charbon;
        let coke;
        let bois;

        let achatvapeurfroid;
        let vin;
        let biere;

        let n2osol;
        let n2oanimaux;

        let autremethane;
        let halocarbures;
        let usinage;
        let Soudure;


        switch (this.state.SCIAN) {
            case 'SCIAN 21':
            case 'SCIAN 31-33':

                charbon =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Charbon"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Charbon"
                            placeholder="valeur"
                            value={this.state.Charbon}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="CharbonUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>2.3</td>
                        <td>0</td>
                    </tr>
                coke =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Coke"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td>
                            <Form.Control
                            name="Coke"
                            placeholder="valeur"
                            value={this.state.Coke}
                            onChange={this.handleChange}>
                        </Form.Control>
                        </td>
                        <td><Form.Control as="select" name="CokeUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>2.3</td>
                        <td>0</td>
                    </tr>
                bois =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Wood"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Bois"
                            placeholder="valeur"
                            value={this.state.Bois}
                            onChange={this.handleChange}
                        ></Form.Control></td>
                        <td><Form.Control as="select" name="BoisUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>place</td>
                        <td>0</td>
                    </tr>


                achatvapeurfroid =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.VapFroid"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="VapeurFroid"
                            placeholder="valeur"
                            value={this.state.VapeurFroid}
                            onChange={this.handleChange}
                        ></Form.Control></td>
                        <td><Form.Control as="select" name="VapeurUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                vin =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Wine"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Vin"
                            placeholder="valeur"
                            value={this.state.Vin}
                            onChange={this.handleChange}>

                        </Form.Control></td>
                        <td><Form.Control as="select" name="VinUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                biere =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Beer"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Biere"
                            placeholder="valeur"
                            value={this.state.Biere}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="BiereUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                halocarbures =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Halocarbures"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Halocarbunes"
                            placeholder="valeur"
                            value={this.state.Halocarbunes}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="HaloUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>
                usinage =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Usinage"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="CNC"
                            placeholder="valeur"
                            value={this.state.CNC}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="UsinageUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                Soudure =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Soudure"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Soudure"
                            placeholder="valeur"
                            value={this.state.Soudure}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="SoudureUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                break;

            case 'SCIAN 11':
                bois =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.Wood"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="Bois"
                            placeholder="valeur"
                            value={this.state.Bois}
                            onChange={this.handleChange}
                        ></Form.Control></td>
                        <td><Form.Control as="select" name="BoisUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>place</td>
                        <td>0</td>
                    </tr>

                n2osol =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.n2o"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="n2osol"
                            placeholder="valeur"
                            value={this.state.n2osol}
                            onChange={this.handleChange}
                        ></Form.Control></td>
                        <td><Form.Control as="select" name="n2osolUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                n2oanimaux =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.n2oAnimaux"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="n2oanimaux"
                            placeholder="valeur"
                            value={this.state.n2oanimaux}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="n2oanimauxUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                autremethane =
                    <tr>
                        <td><FormattedHTMLMessage id="EnergyTable.MethaneOther"
                                                  defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                  description="Welcome header on app main page"
                                                  values={{what: 'react-intl'}}/></td>
                        <td><Form.Control
                            name="AutreMethane"
                            placeholder="valeur"
                            value={this.state.AutreMethane}
                            onChange={this.handleChange}>
                        </Form.Control></td>
                        <td><Form.Control as="select" name="AutreMethaneUnite"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>
                break;


        }


        return (


            <div>


                {this.state.EnergyCategories.map(attribute => {
                    <Form
                        onSubmit={e => this.handleSubmit(e)} method="POST" action="/">
                        <Table responsive> {/**/}
                            <thead>
                            <tr>
                                <th colSpan="5"><Form.Control plaintext readOnly value={attribute.Gaznaturel}/></th>
                            </tr>
                            <tr>
                                <th colSpan="3">Compatiblisation direct des combustibles</th>
                                <th>Facteur Combustion</th>
                                <th>Total GES</th>
                            </tr>
                            <tr>
                                <th>Combustibles fossiles, sources fixes</th>
                                <th>Consommation</th>
                                <th>Unite</th>


                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.Gaz"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="GazNaturel" placeholder="valeur" value={this.state.GazNaturel}
                                                  onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="GazUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>2.3</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.Propane"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="Propane" placeholder="valeur" value={this.state.Propane}
                                                  onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="PropaneUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>1.2</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.PumpFuel"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="EssencePompe" placeholder="valeur"
                                                  value={this.state.EssencePompe}
                                                  onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="EssenceUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>0</td>
                                <td>0</td>
                            </tr>

                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.Diesel"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="GazolePompe" placeholder="valeur" value={this.state.GazolePompe}
                                                  onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="GazoleUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>2.3</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.HeatingOil"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="FioulDomestique" placeholder="valeur"
                                                  value={this.state.FioulDomestique}
                                                  onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="FioulUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>1.2</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.LightOil"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="MazoutLeger" placeholder="valeur" value={this.state.MazoutLeger}
                                                  onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="MazoutUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>0</td>
                                <td>0</td>
                            </tr>


                            {charbon}

                            {coke}


                            <th colSpan="4">Combustibles d'origine organique, sources fixes</th>
                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.Biodiesel"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="Biodiesel"
                                                  placeholder="valeur"
                                                  value={this.state.Biodiesel}
                                                  onChange={this.handleChange}
                                ></Form.Control></td>
                                <td><Form.Control as="select" name="BiodieselUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>1.2</td>
                                <td>0</td>
                            </tr>


                            {bois}


                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.FossilHeating"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control name="Fossil"
                                                  placeholder="valeur"
                                                  value={this.state.Fossil}
                                                  onChange={this.handleChange}
                                ></Form.Control></td>
                                <td><Form.Control as="select" name="FossileUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>2.3</td>
                                <td>0</td>
                            </tr>

                            <th colSpan="4">Electricite achetee</th>


                            <tr>
                                <td><FormattedHTMLMessage id="EnergyTable.Electricite"
                                                          defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                                                          description="Welcome header on app main page"
                                                          values={{what: 'react-intl'}}/></td>
                                <td><Form.Control
                                    name="TotalElectricite"
                                    placeholder="valeur"
                                    value={this.state.TotalElectricite}
                                    onChange={this.handleChange}></Form.Control></td>
                                <td><Form.Control as="select" name="ElectriciteUnite"
                                                  onChange={this.handleChange} required>
                                    <option></option>
                                    <option value="Litre">Litre</option>
                                    <option value="Kg">Kg</option>
                                    <option value="KWH">KWH</option>
                                </Form.Control></td>
                                <td>1.2</td>
                                <td>0</td>
                            </tr>

                            {achatvapeurfroid}


                            </tbody>
                        </Table>
                        <button type="submit" onClick={this.handleSubmit}>test</button>
                    </Form>
                })};



                {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}


                <Table responsive striped bordered hover variant="dark">
                    <thead>

                    <tr>
                        <th colSpan="5">Hors Energie</th>
                    </tr>
                    <tr>
                        <th colSpan="3">Compatiblisation direct des procedes</th>
                        <th>Facteur sur site</th>
                        <th>Total GES</th>
                    </tr>
                    <tr>
                        <th>Combustibles fossiles, sources fixes</th>
                        <th>Consommation</th>
                        <th>Unite</th>


                    </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td>Emissions de CO2 hors energie</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>2.3</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Emissions de CO2 hors energie</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.2</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Emissions de CO2 hors energie</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                    <tr>
                        <td>Emissions de CO2 hors energie</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>2.3</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Emissions de CO2 hors energie</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.2</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Emissions de CO2 hors energie</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Litre">Litre</option>
                            <option value="Kg">Kg</option>
                            <option value="KWH">KWH</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </Table>


            </div>


        )
    };
}
