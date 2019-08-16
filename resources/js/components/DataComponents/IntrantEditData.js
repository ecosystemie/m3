import React from 'react'
import MaterialTable from 'material-table'
import axios from "axios/index";
import {Form, Alert, Col} from "react-bootstrap";


export default class IntrantEditData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            columns: [
                { title: 'Procede', field: 'nom_intrant' },
                { title: 'Quantite', field: 'quantite_an' },
                { title: 'Unite', field: 'unite' ,

                    lookup: {
                "GJ":'GJ',
               "kWh":'kWh',
               "MWh":'MWh',
               "kg":'Kg',
               "t":'Ton',
               "L":'L',
                "m3":'m3',
               "lbs":'lbs',
               "tm":'Ton (metric)',
               "gal":'Gal',
               "bac240L":'Dumpster (240L)',
                "bac360L":'Dumpster (360L)',
        "VC":'Cubic Yards',
       "teqCO2":'GHG (Ton)',
       "kgeqCO2":'GHG (Kg)',
                    },

                },

                { title: 'Nombre de Transports', field: 'NbTransport'},
                { title: 'Provenance', field: 'provenance'},
                { title: "Frequence d'Achat", field: 'FreqAchat',
                    lookup: {
                        '1xY': "Once per year",
                        '2xY': "Twice per year",
                        '3xY': "Three per year",
                        '4xY': "Four per year",
                        '2xM': "Every two Months",
                        '6W': "Every six weeks",
                        '1xM': "Every month",
                        '3W': "Every three weeks",
                        '2W': "Every two weeks",
                        '1W': "Every week",
                        '3BD': "Every Three business days",
                        '2BD': "Every Two business days",
                        '1BD': "Every business day",
                    },
                },




            ],


            Rows: [],
        }
    }

    componentWillMount() {

        let uid = sessionStorage.getItem('UID');
        axios.get('/intrants/' + uid)
            .then(response => {
                this.setState({Rows: response.data});
            });


    }

    getTableRows = () => {
        //let uid = sessionStorage.getItem('UID');
        let uid = this.state.UID;
        axios.get('/intrants/' + uid)
            .then(response => {
                this.setState({Rows: response.data});
            });
    }

    render() {
        return (
            <div>


                <Col lg="4">
                    <h1> Intrants </h1>
                </Col>
                <br/>


            <MaterialTable

                title="Quantite Annuel Intrants"
                columns={this.state.columns}
                data={this.state.Rows}
                editable={{



                   onRowAdd: newData =>
                       new Promise((resolve, reject) => {
                           setTimeout(() => {
                               {


                                   const data = this.state.Rows;
                                   this.state.Rows.map(attribute => {
                                       if (newData.nom_intrant === attribute.nom_intrant) {
                                           this.setState({error: true})
                                       }
                                   });

                                       if (this.state.error === false) {
                                           data.push(newData);
                                           this.setState({ data }, () => resolve());
                                       }




                                   let id = sessionStorage.getItem('UID');
                                   const data2 = newData;




                                   var h = [];

                                   h.push(newData.nom_intrant); //0
                                   h.push(newData.quantite_an); //1
                                   h.push(newData.unite); //2
                                   h.push(newData.NbTransport) //3
                                   h.push(newData.y); //4
                                   h.push(newData.provenance); //5
                                   h.push(newData.FreqAchat) //6



                                   fetch('/intrants/' + JSON.stringify(h) + '/' + id ,{
                                       method: 'POST',
                                       body: JSON.stringify(data2),
                                       headers: {
                                           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                           "Content-type": "application/json"
                                       }

                                   })
                                       .then(function (response) {
                                           console.log('Request succeeded with JSON response', data2);


                                       })
                                       .catch(function (error) {
                                           console.log('Request failed', error);
                                       });
                               }
                               resolve()
                           }, 1000)
                       }),


                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = newData;
                                    const NameData = oldData.nom_intrant;
                                    var Q_an = data.quantite_an
                                    var Nom = data.nom_intrant
                                    let id = sessionStorage.getItem('UID');
                                    let Unite = data.unite
                                    const data2 = this.state.Rows;
                                    const index = data2.indexOf(oldData);
                                    data2[index] = newData;


                                    this.setState({ data }, () => resolve());
                                    fetch('/EditIntrant/' + NameData + '/' + Nom + '/' + Q_an + '/' + Unite + '/' + id,{
                                        method: 'POST',
                                        body: JSON.stringify(data),
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                            "Content-type": "application/json"
                                        }

                                    })
                                        .then(function (response) {

                                            console.log('Request succeeded with JSON response', response);


                                        })
                                        .catch(function (error) {

                                            console.log('Request failed', error);

                                        });
                                }
                                resolve()
                            }, 1000)
                        }),

                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    let data2 = this.state.Rows;
                                    const index = data2.indexOf(oldData);
                                    data2.splice(index, 1);
                                    this.setState({ data2 }, () => resolve());
                                    let data = oldData;
                                    let nom = data.nom_intrant

                                    let uid = sessionStorage.getItem('UID');

                                    fetch('/delIntrants/' + nom + '/' + uid, {
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                                            "Content-type": "application/json"
                                        }

                                    })
                                        .then(function (response) {
                                            console.log(response.data)


                                        })
                                        .catch(function (error) {
                                            console.log('Request failed', error);
                                        });
                                }
                                resolve()
                            }, 100)
                        }),




                }}



            />
            </div>
        )
    }
}