import React from 'react';

const RecipeItem = ({_id, name, category}) =>(
    <li >
          <h4>{name}</h4>
          <p>{category}</p>
          </li>
);

export default RecipeItem;