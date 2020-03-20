import React, { Component } from 'react';
import { Button,Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { DatatablePage } from '../datatble/'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import {TransactionHistoryis_riders } from '../../actions/DeshboardAction'
import Modal from "react-responsive-modal";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBInput,ToastContainer, toast,MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Transaction extends Component {
constructor(props){
super(props)
this.state={
  value: '',
  columnsdata:[
    {
      label: 'User name',
      field: 'name',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Rider id ',
      field: 'totalnooftransaction',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Ride start',
      field: 'TotalFareAccumulated',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Ride end',
      field: 'TotalFareAccumulated',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Cost of the ride',
      field: 'TotalFareAccumulated',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Type of transaction',
      field: 'TotalFareAccumulated',
      sort: 'asc',
      width: 270
    },{
      label: 'Status',
      field: 'TotalFareAccumulated',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Action',
      field: 'top',
      sort: 'disabled',
      width: 100
    }

  ]
}

}
componentDidMount(){

  this.props.TransactionHistoryis_riders()
}

  render() {
    const  { transaction_histories_riders }=this.props
    console.log(transaction_histories_riders)
    const results = [];
if(transaction_histories_riders!=null ){
  transaction_histories_riders.map((data,index)=>
  results.push(
     {  name:data.name,
        totalnooftransaction:data.count,
        TotalFareAccumulated:data.total,
        top:index==0? <div><i className="fa fa-check"></i></div>: '' 
     
    }  
  )
  ) 
}

 // Transaction Summary page  data
const data = {
  columns: this.state.columnsdata,
  rows:results
};
    return (
      <div className="animated fadeIn">
      <Row className="mt-3">
          <Col>
            <Card>
              <CardHeader>
              <i className="fa fa-align-justify"></i>  All rides
              </CardHeader>
              <CardBody className="dtbFooterhide">
              <MDBDataTable      
                striped
                bordered
                entries={20}
                entriesOptions={[ 20, 30, 50 ]}
                data={data}
              />
              </CardBody>
            </Card>
         
          </Col>
          
        </Row>
        <Row>
          <Col>
            
          </Col>

        </Row>
      </div>

    );
  }
}


const mapStateToProps = ({alluserlist}) =>{
  const { userlist,transaction_histories_riders } = alluserlist
  return { userlist,transaction_histories_riders }
}
export default withRouter(connect(mapStateToProps, {TransactionHistoryis_riders })(Transaction))

