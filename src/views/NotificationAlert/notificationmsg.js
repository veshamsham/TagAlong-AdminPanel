import React, { Component, Fragment } from 'react';
import { Button, ToastContainer, toast } from 'mdbreact';

class NotificationsPage extends Component {
  notify(type){
  return () => {
    switch (type) {
      case 'info':
        toast.info('Info message', {
          autoClose: 3000
        });
        break;
      case 'success':
        toast.success('Success message', {
          position: "top-right",
        });
        break;
      case 'warning':
        toast.warn('Warning message');
        break;
      case 'error':
        toast.error('Error message');
        break;
    }
  };
};
  render(){
    return (
      <Fragment>

        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </Fragment>
    );
  }
}
export default NotificationsPage;