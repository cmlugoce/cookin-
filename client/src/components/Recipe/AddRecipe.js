import React from 'react';

import {Mutation} from 'react-apollo';
import {ADD_RECIPE} from '../queries';
import Error from '../Error';

class AddRecipe extends React.Component{
  state = {
   name: '',
   category: 'Breakfast',
   instructions: '',
   description: '',
   username: '',
  }
componentDidMount(){
    this.setState({username: this.props.session.getCurrentUser.username})
}
  handleChange = e =>{
    const {name, value} = e.target;
    this.setState({
        [name]: value
    });
   };

   handleSubmit=(e, addRecipe)=>{
       e.preventDefault();
       addRecipe().then(({data})=>{
         console.log(data);

       });
   };

   validateForm = () =>{

    const{name, category, description, instructions}=this.state;
    const isInvalid = !name || !category || !description || !instructions;
    return isInvalid;
   };

    render(){

const{name, category, description, instructions, username}=this.state;
  return(     
<Mutation mutation={ADD_RECIPE} variables={{name, category, description, instructions, username}}>
    {(addRecipe, {data, loading, error}) => {
        return(
    <div className="App">
        <h2>Add a recipe</h2>

        <form className='form'onSubmit={e=>this.handleSubmit(e, addRecipe)}>

        <input type="text" name="name" value={name} placeholder="Recipe Name" onChange={this.handleChange} />
        <select name='category'value={category} onChange={this.handleChange}>
        
        <option value = 'Breakfast'>Breakfast</option>
        <option value = 'Lunch'>Lunch</option>
        <option value = 'Dinner'>Dinner</option>
        <option value = 'Dessert'>Dessert</option>
        <option value = 'Snack'>Snack</option>


        </select>

        <input type='text' value={description} name='description' placeholder='Add Description' onChange={this.handleChange} />
         <textarea name='instructions' value={instructions} placeholder='Add instructions' onChange={this.handleChange}></textarea>

         <button disabled={loading || this.validateForm()} type='submit' className='button-primary'>Submit</button>
        
        {error && <Error error={error} />}
        </form>
    </div>
    

        );
    }}
        </Mutation>
  )
        }
};

export default AddRecipe;