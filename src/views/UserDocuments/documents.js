/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Button,Card, CardBody, CardHeader, Col, CardImg, Row } from 'reactstrap';
import pdfIcon from './../../assets/img/pdf.png';
import { connect } from "react-redux";
import { withRouter,Link  } from 'react-router-dom'
import { getDocuments } from '../../actions/DeshboardAction'
import Modal from "react-responsive-modal";

 

class Dashboard extends Component {
constructor(props){
super(props)
this.state={
  value: '',
  ppercase: false,
  open: false,
  change_id:'',
  status_value:'',
  btaction:'',
  btactionss:'',
  message:''
}
this.toggleInputCase = this.toggleInputCase.bind(this); 
}

componentDidMount(){
    let id = this.props.location.state ? this.props.location.state[0].id:'';
    
    if(id) {
      this.props.getDocuments(id);
    }else{
      this.props.history.push("dashboard");
    }
    
  
  }


handleChange=(event)=> {
  console.log(event.target.value)
  this.setState({value: event.target.value});
  }

  toggleInputCase=(value,id)=> {
  
  this.setState({ open: true,change_id:id,status_value:value });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>

              {/* <CardHeader>
                <i className="fa fa-align-justify"></i>  {'View User Uploads Inner'}

                <Button color="success" className="pull-right"><i className="fa fa-download"></i> Download</Button>
              </CardHeader> */}

              <CardBody>
                <Row>
                {(this.props.getUserDocumentList!=null && this.props.getUserDocumentList.length>0)?
                this.props.getUserDocumentList.map((data,index)=>
                // <Link to={data}>
                  <Col sm="6" md="2">
                  {/* onClick={this.toggle} */}
                  <a href={data} target="_blank">
                    <Card className="card_box" >
                    {(data.split('.').pop() === 'pdf')?
                    <CardImg top width="100%" src={pdfIcon} alt="" />
                    :<CardImg top width="100%" src={data} alt="" />
                    }
                      
                      {/* <CardBody>
                        <CardTitle>{index}</CardTitle>
                      </CardBody> */}
                    </Card></a>
                  </Col>
                  // </Link>
                 ) :"No Documents Found"}
                </Row>
              </CardBody>

            </Card>
          </Col>
        </Row>

      </div>

    );
  }
}


const mapStateToProps = ({alluserlist}) =>{
  const { getUserDocumentList } = alluserlist;
  return { getUserDocumentList }
}
export default withRouter(connect(mapStateToProps, { getDocuments })(Dashboard))

