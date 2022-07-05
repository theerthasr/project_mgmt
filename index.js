
const { response } = require('express');
const express = require('express');
const con = require('./app/Helper/db')
const app = express();
const PORT = 8000;

app.use(express.json())
app.post("/project", function (req, res) {
    console.log(req.body)
    let project_name = req.body.project_name;
    let stack = req.body.stack;
    let plateform = req.body.plateform;
    let team_id = req.body.team_id;
    let kick_off_timestamp = req.body.kick_off_timestamp;
    let completetion_timestamp = req.body.completetion_timestamp;
    let submission_timestamp = new Date();
    let status = req.body.status

    const form_data = [project_name, stack, plateform, team_id, kick_off_timestamp, completetion_timestamp, submission_timestamp, status]
    let qr = 'insert into table_1_project(project_name,stack,platform,team_id,kick_off_timestamp,completetion_timestamp ,submission_timestamp,status )values(?)';
    con.query(qr, [form_data], (err, result) => {
        if (err) {
            res.send({ error: err })
        }
        else {
            res.send({ success: "success" })
        }

    })


})
app.get("/projects", function (req, res) {
    con.query("select * from table_1_project", (err, result) => {
        if (err) {
            res.send({ error: err })
        }
        else {
            res.send(result)
        }

    })
})
app.delete("/projects/:id", function (req, res) {
    const {id}=req.params
    con.query(`update table_1_project  set delete_timestammp= '${new Date().toISOString().replace("T"," ").replace("Z"," ")}' where id=${id}`, (err, result) => {
        if (err) {
            res.send({ error: err })
        }
        else {
            res.send(result)
        }

    })
})
app.get("/projects/:id", function (req, res) {
    const {id}=req.params
    con.query(`select * from table_1_project where id=${id}`, (err, result) => {
        if (err) {
            res.send({ error: err })
        }
        else {
            res.send(result)
        }

    })
})
app.put("/projects/:id", function (req, res){
   
    let status = req.body.status
    const {id}=req.params
    con.query(`update table_1_project set update_timestamp  = '${new Date().toISOString().replace("T"," ").replace("Z"," ")}',status='${status}'where id=${id}`,(err,result)=>{
        if(err)
        {
            res.send({error:err})
        }
        else {
            res.send(result)
        }

    })
})





app.get("/", (req, res) => {
    res.send(" welcome  to fgdhghvgs")
})
app.listen(PORT, (error) => {
    if (!error)
        console.log("App is sucessfully running " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);
