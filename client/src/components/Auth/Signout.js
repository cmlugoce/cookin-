import React from 'react';
import {withRouter} from 'react-router-dom';

import {ApolloConsumer} from 'react-apollo';

const handleClick=(client, history)=>{
    localStorage.setItem('token', "");
    client.resetStore();

    history.push('/');
}
const Signout = ({history}) =>(

 <ApolloConsumer>
  {client =>{
      return(
        <button onClick={()=> handleClick(client, history)}>Sign Out</button>
      )
  }}

 </ApolloConsumer>
    
);

export default withRouter(Signout);