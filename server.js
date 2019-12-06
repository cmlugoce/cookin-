const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const cors = require('cors');
const path = require('path')

const jwt = require('jsonwebtoken');
// connect graphql
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');



const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

//create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//Connects to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log('DB connected'))
    .catch(err=>console.error(err));
    //initiates app
const app = express();
const corsOptions = {
    origin: ' http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions))


app.use(async(req, res, next)=>{
    const token = req.headers['authorization'];

    //console.log(token, typeof token);
    if (token !== "null"){
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
         //  console.log(currentUser)

         req.currentUser = currentUser;
        } catch(err){
            console.log(err);
        }
    }
    next();
    
});


// create graphiql app
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

//connect schema to graphql
app.use('/graphql', 
bodyParser.json(),
graphqlExpress(({currentUser})=>({
schema,
context: {
    Recipe,
    User,
    currentUser
}

}))
);
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>
    {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 4444;

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port ${PORT}`);
})