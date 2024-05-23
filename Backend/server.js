// 5/18/2024
// Server Structure obtained from react-starter-app :
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:

//Read full plants table TODO:CHECK STATUS CODES
app.get('/Plants',(req,res) => {
    db.query('SELECT * FROM Plants', (error, results) => {
        if(error){
            console.error('Error running query:', error);
            res.status(500).send('Error fetching plant data');
            return;
        }
        res.json(results);
    })
});

//Obtain specific plant entry by ID
app.get('/Plants/:plantID', (req,res) =>{
    console.log(req.params.plantID);
    const plantID = req.params.plantID;
    db.query(`Select * From Plants WHERE plantID = ?`,[plantID], (error,results) =>{
        if(error){
            console.log(`Error obtaing plant with ID: ${plantID}`);
            res.status(500).send('Unable to find plant')
            return;
        }
        console.log(results);
        res.json(results);
    })
});


//Creation of plant entry TODO: CHECK STATUS CODES
app.post('/CreatePlant', (req,res) => {
    let { plantType, plantName, seasonComplete } = req.body;
    if(!plantType) plantType = plantName;
    if (!seasonComplete) seasonComplete = 0;
    const query = `INSERT INTO Plants (plantType, seasonComplete) 
                   VALUES (?, ?)`;
    db.query(query, [plantType,seasonComplete], (error, results) =>{
        if(error){
            console.error("Issue inserting new plant entry");
            res.status(500).send('Unable to create new plant');
            return;
        }
        res.status(201).send('New Plant created');
    });
});

app.put('/EditPlant/:editPlantID', (req,res) =>{
    //console.log(req.body);
    
    const plantID = req.params.editPlantID;
    console.log(plantID);
    let { plantType, plantName,seasonComplete } = req.body;
    console.log(`plantType ${plantType}   plantName ${plantName}  seasonComplete${seasonComplete}`);
    if(!plantType) plantType = plantName;
    //if (!seasonComplete) seasonComplete = 0;
    const query = `UPDATE Plants SET
	                    plantType = coalesce(?,plantType), 
	                    seasonComplete = coalesce(?,seasonComplete)
                    WHERE plantID = ?`;
    db.query(query, [plantType, seasonComplete, plantID], (error, results) =>{
        if(error){
            console.error("Issue updating plant entry");
            res.status(500).send('Unable to update plant entry');
            return;
        }
        res.status(201).send('Plant updated');
    });
});

//Deletion of plant entry by plantID TODO: CHECK STATUS CODES
app.delete('/DeletePlant/:plantID', (req,res) => {
    const plantID = req.params.plantID;
    db.query('DELETE FROM Plants WHERE plantID = ?', [plantID], (error, results) =>{
        if(error){
            console.error(`Issue deleting plant entry with plantID ${plantID} `);
            res.status(500).send('Unable to delete plant');
            return;
        }
        res.status(204).send("Plant deleted");
    });
});

app.get('/Seedlings',(req,res) => {
    db.query(`
        SELECT 
            Seedlings.seedlingID,
            Plants.plantType,
            Seedlings.plantID,
            Seedlings.datePlanted,
            Seedlings.aveTemperature,
            Seedlings.waterFrequency,
            Seedlings.germinationTime
        FROM Seedlings
        LEFT JOIN Plants ON Seedlings.plantID = Plants.plantID
        `, (error, results) => {
        if(error){
            console.error('Error running query:', error);
            res.status(500).send('Error fetching seedling data');
            return;
        }
        //console.log(Object.keys(results[0]));
        res.json(results);
    })
});








// Add your Connect DB Activitiy Code Below:
// ...

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to database',err);
        return;
    }
    console.log('Connected to database');
});

// ...
// End Connect DB Activity Code.


app.listen(PORT, () => {
  // Change this text to whatever FLIP server you're on
  console.log(`Server running:  localhost${PORT}...`);
});