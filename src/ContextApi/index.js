import React from 'react';
// const Context = React.createContext('hello');
// export default Context;

const userContext = React.createContext({
    
        user: {},
        athadd: () => {}
      
}); // Create a context object

export {
  userContext // Export it so it can be used by other Components
};