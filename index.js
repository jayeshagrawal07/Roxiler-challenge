const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config()
let app = express();
const port = process.env.PORT||3000;

app.get('/todo',(req,res)=>{
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((response)=>{
            let data = response.data.map(item => {
                delete item.userId;
                return item;
            })
            res.json(data);
        }).catch((error)=>{
            res.send(`Error: ${error.message}`);
        })
});
    
app.get('/user/:id',(req,res)=>{
    axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
        .then((userResponse)=>{
            let userData = userResponse.data;
            axios.get('https://jsonplaceholder.typicode.com/todos')
                .then((todoResponse)=>{
                    let todoData = todoResponse.data.filter(item => {
                        return item.userId === parseInt(req.params.id);
                    })
                    userData['todo'] = todoData;
                    res.json(userData);
                }).catch((error)=>{
                    res.send(`Error: ${error.message}`);
                })
        }).catch((error)=>{
            res.send(`Error: ${error.message}`);
        })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})