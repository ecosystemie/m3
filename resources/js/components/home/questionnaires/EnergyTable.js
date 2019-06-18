import {Form, Table} from "react-bootstrap";
import {DynamicTable} from "../home-components/DynamicTable";
import React from "react";
import axios from 'axios';

export class EnergyTable extends React.Component {


    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this); //handle change function
        this.handleSubmit = this.handleSubmit.bind(this); //handle submit function

        this.state = {
            Unite: "",
            GazNaturel: "",
            Propane: "",
            EssencePompe: "",
            GazolePomp: "",
            FioulDomestique: "",
            MazoutLeger: "",
            Charbon: "",
            SCIAN: "",
            categories: []


        }


    }

    componentDidMount() {
        let uid = localStorage.getItem('UID');
        console.log(uid);
        axios.get('/scian/' + uid)
            .then(response => {
                console.log(response.data);
                this.setState({SCIAN: response.data});
            });


        console.log(this.state.SCIAN);
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
        console.log(data);


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
        let soudure;


        switch (this.state.SCIAN) {
            case 'SCIAN 21':
            case 'SCIAN 31-33':

                charbon =
                    <tr>
                        <td>Charbon</td>
                        <td><Form.Control name="Charbon" placeholder="valeur" value={this.state.Charbon}
                                          onChange={this.handleChange}></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>2.3</td>
                        <td>0</td>
                    </tr>
                coke =
                    <tr>
                        <td>Coke</td>
                        <td><Form.Control name="Coke" placeholder="valeur" value={this.state.Charbon}
                                          onChange={this.handleChange}></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>2.3</td>
                        <td>0</td>
                    </tr>
                bois =
                    <tr>
                        <td>Bois buche, sciures</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>place</td>
                        <td>0</td>
                    </tr>


                achatvapeurfroid =
                    <tr>
                        <td>Achats de vapeur et de froid</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                vin =
                    <tr>
                        <td>Fermentation du vin</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                biere =
                    <tr>
                        <td>Gazification de la biere</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                halocarbures =
                    <tr>
                        <td>Emissions d'halocarbunes et autres</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>
                usinage =
                    <tr>
                        <td>Usinage et tournage CNC (acier)</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                soudure =
                    <tr>
                        <td>Soudure (acier)</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                break;

            case 'SCIAN 11':
                bois =
                    <tr>
                        <td>Bois buche, sciures</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>place</td>
                        <td>0</td>
                    </tr>

                n2osol =
                    <tr>
                        <td>Emissions de N2O engrais au sol</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                n2oanimaux =
                    <tr>
                        <td>Emissions de N2O des animaux</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>

                autremethane =
                    <tr>
                        <td>Autres emissions de methane</td>
                        <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                        <td><Form.Control as="select" name="SectorActivity"
                                          onChange={this.handleChange} required>
                            <option></option>
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>
                break;


        }


        return (


            <div>

                < Form
                    onSubmit={e => this.handleSubmit(e)} method="POST" action="/">
                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th colSpan="5">Energie</th>
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
                            <td>Gaz natural</td>
                            <td><Form.Control name="GazNaturel" placeholder="valeur" value={this.state.GazNaturel}
                                              onChange={this.handleChange}></Form.Control></td>
                            <td><Form.Control as="select" name="Unite"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>2.3</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Propane</td>
                            <td><Form.Control name="Propane" placeholder="valeur" value={this.state.Propane}
                                              onChange={this.handleChange}></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>1.2</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Essence a la pompe</td>
                            <td><Form.Control name="EssencePompe" placeholder="valeur" value={this.state.EssencePompe}
                                              onChange={this.handleChange}></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>0</td>
                            <td>0</td>
                        </tr>

                        <tr>
                            <td>Gazole a la pompe</td>
                            <td><Form.Control name="GazolePompe" placeholder="valeur" value={this.state.GazolePompe}
                                              onChange={this.handleChange}></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>2.3</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Fioul domestique</td>
                            <td><Form.Control name="FioulDomestique" placeholder="valeur"
                                              value={this.state.FioulDomestique}
                                              onChange={this.handleChange}></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>1.2</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Mazout leger, num 4 a 6</td>
                            <td><Form.Control name="MazoutLeger" placeholder="valeur" value={this.state.MazoutLeger}
                                              onChange={this.handleChange}></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>0</td>
                            <td>0</td>
                        </tr>


                        {charbon}

                        {coke}


                        <th colSpan="4">Combustibles d'origine organique, sources fixes</th>
                        <tr>
                            <td>Biodiesel</td>
                            <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>1.2</td>
                            <td>0</td>
                        </tr>


                        {bois}


                        <tr>
                            <td>Chauffage fossible a partier des m^2 chauffes</td>
                            <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>2.3</td>
                            <td>0</td>
                        </tr>

                        <th colSpan="4">Electricite achetee</th>


                        <tr>
                            <td>Total Electricite</td>
                            <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>1.2</td>
                            <td>0</td>
                        </tr>

                        {achatvapeurfroid}

                        {vin}

                        {biere}

                        {n2osol}

                        {n2oanimaux}

                        <tr>
                            <td>Emissions de methane des animaux</td>
                            <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>1.23</td>
                            <td>0</td>
                        </tr>

                        {autremethane}

                        {halocarbures}

                        {usinage}

                        {soudure}

                        <tr>
                            <td>Cammionage</td>
                            <td><Form.Control name="x[]" placeholder="valeur"></Form.Control></td>
                            <td><Form.Control as="select" name="SectorActivity"
                                              onChange={this.handleChange} required>
                                <option></option>
                                <option value="Unite1"> Unite1</option>
                            </Form.Control></td>
                            <td>1.23</td>
                            <td>0</td>
                        </tr>

                        <tr>Employee Transportation, Use, End of Life</tr>


                        </tbody>

                    </Table>
                    <button type="submit" onClick={this.handleSubmit}>test</button>
                </Form>


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
                            <option value="Unite1"> Unite1</option>
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
                            <option value="Unite1"> Unite1</option>
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
                            <option value="Unite1"> Unite1</option>
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
                            <option value="Unite1"> Unite1</option>
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
                            <option value="Unite1"> Unite1</option>
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
                            <option value="Unite1"> Unite1</option>
                        </Form.Control></td>
                        <td>1.23</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </Table>

                <Table>


                    <tbody>
                    <DynamicTable> </DynamicTable>
                    </tbody>


                </Table>


            </div>


        )
    };
}