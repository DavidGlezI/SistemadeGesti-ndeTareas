const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.port || 3000;

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'tasks',
}); 

db.connect(except => {
    if(except) throw except;
    console.log("Conexion a la base de datos correcta");
})

async function taskQuery(query){
    return new Promise((resolve, reject)=>{
        db.query(query,function(error, result){
            if(error) throw except;
            resolve(result);
        })
    })
}


app.get('/tasks', async(req, res) => {
    let api_key = req.headers["x-api-key"];
    let query = await taskQuery(`
    SELECT
	tasks.id,
	tasks.title,
	tasks.description,
	tasks.\`status\`,
	status.name AS status_name 
    FROM tasks
    LEFT JOIN status ON tasks.\`status\` = status.id
    LEFT JOIN user ON tasks.user_id = user.id
    WHERE user.api_key = '`+ api_key + `'
    `);
    res.status(200).json({
        result: query
    })
});

app.get('/tasks/:task', async(req, res) => {
    let api_key = req.headers["x-api-key"];
    let task_id = req.params["task"];
    let query = await taskQuery(`
    SELECT
	tasks.*,
	status.name AS status_name 
    FROM tasks
    LEFT JOIN status ON tasks.\`status\` = status.id
    LEFT JOIN user ON tasks.user_id = user.id
    WHERE user.api_key = '`+ api_key + `' and tasks.id = '`+ task_id + `' 
    `);
    res.status(200).json({
        result: query[0]
    })
});

app.post('/tasks', async(req, res) => {
    
    let title = req.body["title"];
    let description = req.body["description"];
    let status = req.body["status"];
    let delivery_date = req.body["delivery_date"];
    let api_key = req.headers["x-api-key"];

    let user = await taskQuery(`
    SELECT
	user.id
    FROM user
    WHERE user.api_key = '`+ api_key + `'
    `);
    user = user[0].id;
    let query = await taskQuery(`
    INSERT INTO \`tasks\` (\`title\`, \`description\`, \`status\`, \`delivery_date\`, \`user_id\`) 
    VALUES ('`+ title + `', '`+ description + `', '`+ status + `', '`+ delivery_date + `', '`+ user + `');
    `);
    
    res.status(200).json({

    })
});

app.delete('/tasks/:task', async(req, res) => {
    let task_id = req.params["task"];
    let query = await taskQuery(`
    DELETE FROM \`tasks\` WHERE  \`id\`='`+task_id+`';
    `);
    
    res.status(200).json({

    })
});


app.put('/tasks/:task', async(req, res) => {
    let title = req.body["title"];
    let description = req.body["description"];
    let status = req.body["status"];
    let delivery_date = req.body["delivery_date"];
    let task_id = req.params["task"];
    let query = await taskQuery(`
    UPDATE \`tasks\` SET \`title\`='`+title+`', \`description\`='`+description+`', \`status\`='`+status+`', \`delivery_date\`='`+delivery_date+`' 
    WHERE  \`id\`='`+task_id+`';
    `);
    
    res.status(200).json({

    })
});

app.listen(port, ()=> {
    console.log('Server on port ' + port);
});


