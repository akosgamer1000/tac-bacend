import express from "express";
import mysql from 'mysql2';
import cors from 'cors';

const app= express();
app.use(express.json())
app.use(cors())
const db =mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'tic'
}).promise();

app.get("/name/:names",async (req,res)=>{
    

        let name=req.params.names
        const temp=await  db.query('SELECT name FROM tac WHERE name=?',[name])
        
        const rows=temp[0]
        if(rows.length==1){

            res.send(rows)
        }
        else{
            res.status(404).send()
        }
    
})
app.get("/stats/:names",async (req,res)=>{
    

    let name=req.params.names
    const temp=await  db.query('SELECT * FROM tac WHERE name=?',[name])
    
    const rows=temp[0]
    if(rows.length==1){

        res.send(rows)
    }
    else{
        res.status(404).send()
    }

})

app.post("/register", async (req,res)=>{
    try{

        const temp= await db.query('INSERT INTO `tac`(`name`, `win`, `loss`, `winrate`)  VALUES (?,?,?,?)',[req.body.name,req.body.win,req.body.loss,req.body.winrate]);
        res.status(202).send()
    }
    catch{
        res.status(404).send()
    }
})
app.put("/update/:player", async (req,res)=>{
    try{
        let name=req.params.player
        console.log(name);
        console.log(req.body)
        const temp= await db.query(`UPDATE tac SET name='${req.body.name}',win=${req.body.win},loss=${req.body.loss},winrate=${req.body.winrate} WHERE name='${name}'`);
        res.status(202).send()
    }
    catch{
        res.status(404).send()
    }
})

app.listen(3000)