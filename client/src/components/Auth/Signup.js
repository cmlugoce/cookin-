import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNUP_USER} from '../queries/index';
import Error from '../Error';
import {withRouter} from 'react-router-dom';
const initialState = {
     username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
}


class Signup extends React.Component {

  state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
  }
    clearState = () => {
      this.setState({...initialState});
    }
   handleChange = (e) => {
     const {name, value} = e.target
    // console.log(name, ':', value);

    this.setState({
        [name] : value
    })
   }

   handleSubmit = (event, signupUser) => {
       event.preventDefault();
       signupUser().then(async({data})=>{
        console.log(data);

        localStorage.setItem('token', data.signupUser.token)
        await this.props.refetch();  
        
        this.clearState();
           
           this.props.history.push('/');
       }
        );
   }

   validateForm = () => {
    const {username, email, password, passwordConfirmation } = this.state
    const isInvalid = !username || !email || !password || !passwordConfirmation || password !== passwordConfirmation ;


    return isInvalid
   }


    render(){

        const {username, email, password, passwordConfirmation } = this.state
        return(
         <div className="App">
         
         <h2 className='App'>Sign Up</h2>
         <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
          {(signupUser,{ data, loading, error})=>{

              return(

         <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>

         <input type='text' value={username }name='username' placeholder='Username' onChange={this.handleChange} />
         <input type='email'value={email} name='email' placeholder='Email' onChange={this.handleChange}/>
         <input type='password' value={password} name='password' placeholder='Password' onChange={this.handleChange}/>
         <input type='password'value={passwordConfirmation} name='passwordConfirmation' placeholder='Confirm Password' onChange={this.handleChange}/>

        <button type="submit" 
         disabled={loading || this.validateForm()}
        className='button-primary'>Submit</button>
            {error && <Error error={error} />}

         </form>
              )
          }
        }
        
         </Mutation>
         </div>
        )
    }
}

export default withRouter(Signup);