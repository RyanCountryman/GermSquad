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

//--------------------------------------PLANTS OPERATIONS-------------------------------------------


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
    const plantID = req.params.editPlantID;
    let { plantType, plantName,seasonComplete } = req.body;
    if(!plantType) plantType = plantName;

    const query = `
                UPDATE Plants SET
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


app.get('/PlantsDrop',(req,res) => {
    db.query('SELECT plantID, plantType FROM plants', (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching plants for dropdown');
            return;
        }
        res.json(results);
    })
});


//--------------------------------------SEEDLINGS OPERATIONS-------------------------------------------


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

//Get Seedling By ID
app.get('/Seedlings/:seedlingID', (req,res) =>{
    const seedlingID = req.params.seedlingID;
    db.query(`Select * From Seedlings WHERE seedlingID = ?`,[seedlingID], (error,results) =>{
        if(error){
            console.log(`Error obtaing seedling with ID: ${seedlingID}`);
            res.status(500).send('Unable to find seedling')
            return;
        }
        console.log(results);
        res.json(results);
    })
});

//Create New Seedling
app.post('/CreateSeedling', (req,res) => {
    let { plantID, datePlanted, aveTemperature, waterFrequency, germinationTime } = req.body;
    console.log(`plantID:${plantID} datePlant:${datePlanted} aveTemp:${aveTemperature}  waterFreq:${waterFrequency}  germTime:${germinationTime}  `)
    const query = `
                INSERT INTO Seedlings (
                    plantID,
                    datePlanted,
                    aveTemperature,
                    waterFrequency,
                    germinationTime) 
                VALUES (?,?,?,?,?)`;
    db.query(query, [plantID, datePlanted, aveTemperature, waterFrequency, germinationTime], (error, results) =>{
        if(error){
            console.error("Issue inserting new seedling entry");
            res.status(500).send('Unable to create seedling plant');
            return;
        }
        res.status(201).send('New Seedling created');
    });
});


//Update existing Seedling Entity
app.put('/EditSeedling/:editSeedlingID', (req,res) =>{
    const seedlingID = req.params.editSeedlingID;
    let { datePlanted, aveTemperature, waterFrequency, germinationTime } = req.body;

    const query = `
                UPDATE Seedlings SET
                    datePlanted = coalesce(?,datePlanted),
                    aveTemperature = coalesce(?,aveTemperature), 
                    waterFrequency = coalesce(?,waterFrequency),  
                    germinationTime = coalesce(?,germinationTime)
                WHERE seedlingID = ?`;
    db.query(query, [datePlanted, aveTemperature, waterFrequency, germinationTime, seedlingID], (error, results) =>{
        if(error){
            console.error("Issue updating seedling entry");
            res.status(500).send('Unable to update seedling entry');
            return;
        }
        res.status(201).send('Seedling updated');
    });
});


//Delete existing seedling entry
app.delete('/DeleteSeedling/:seedlingID', (req,res) => {
    const seedlingID = req.params.seedlingID;
    db.query('DELETE FROM Seedlings WHERE seedlingID = ?', [seedlingID], (error, results) =>{
        if(error){
            console.error(`Issue deleting seedling entry with seedlingID ${seedlingID} `);
            res.status(500).send('Unable to delete seedling');
            return;
        }
        res.status(204).send("Seedling deleted");
    });
});



//--------------------------------------GROWTHS OPERATIONS-------------------------------------------

//Display All Growths
app.get('/Growths',(req,res) => {
    db.query(`
        SELECT 
            Growths.growthID,
            Growths.plantID,
            Plants.plantType,
            Growths.startDate,
            Growths.dailySunlight,
            Growths.waterFrequency,
            Growths.fertilizerFrequency,
            Fertilizers.fertilizerType,
            Growinglocations.isGround,
            Growinglocations.isContainer,
            Growinglocations.bedType,
            Growinglocations.containerType
        FROM Growths
        LEFT JOIN FertilizerDetails ON Growths.growthID = FertilizerDetails.growthsID
        LEFT JOIN Fertilizers ON FertilizerDetails.fertilizerID = Fertilizers.fertilizerID
        LEFT JOIN LocationDetails ON Growths.growthID = LocationDetails.growthsID
        LEFT JOIN GrowingLocations ON LocationDetails.growingLocationsID = GrowingLocations.locationID
        LEFT JOIN Plants ON Growths.plantID = Plants.plantID;
        `, (error, results) => {
        if(error){
            console.error('Error running growth query:', error);
            res.status(500).send('Error fetching growth data');
            return;
        }
        //console.log(Object.keys(results[0]));
        res.json(results);
    })
});

//Get Growth By ID
app.get('/Growths/:growthID', (req,res) =>{
    const growthID = req.params.growthID;
    db.query(`Select * From Growths WHERE growthID = ?`,[growthID], (error,results) =>{
        if(error){
            console.log(`Error obtaing growth with ID: ${growthID}`);
            res.status(500).send('Unable to find growth')
            return;
        }
        console.log(results);
        res.json(results);
    })
});

//Create New Growth
app.post('/CreateGrowth', (req,res) => {
    let { plantID, startDate, dailySunlight, waterFreq, fertilizerFrequency } = req.body;
    const query = `
            INSERT INTO Growths (
                plantID,
                startDate,
                dailySunlight,
                waterFrequency,
                fertilizerFrequency)
            VALUES (?,?,?,?,?)`;
    db.query(query, [plantID, startDate, dailySunlight, waterFreq, fertilizerFrequency], (error, results) =>{
        if(error){
            console.error("Issue inserting new growth entry");
            res.status(500).send('Unable to create growth plant');
            return;
        }
        res.status(201).send('New Growth created');
    });
});

//Update existing Growth Entity
app.put('/EditGrowth/:editGrowthID', (req,res) =>{
    const growthID = req.params.editGrowthID;
    let { startDate, dailySunlight, waterFrequency, fertilizerFrequency } = req.body;

    const query = `
            UPDATE Growths SET
                startDate = coalesce(?,startDate),
                dailySunlight = coalesce(?,dailySunlight), 
                waterFrequency = coalesce(?,waterFrequency),  
	            fertilizerFrequency = coalesce(?,fertilizerFrequency)
            WHERE growthID = ?`;
    db.query(query, [startDate, dailySunlight, waterFrequency, fertilizerFrequency, growthID], (error, results) =>{
        if(error){
            console.error("Issue updating growth entry");
            res.status(500).send('Unable to update growth entry');
            return;
        }
        res.status(201).send('Growth updated');
    });
});



//Delete existing growth entry
app.delete('/DeleteGrowth/:growthID', (req,res) => {
    const growthID = req.params.growthID;
    db.query('DELETE FROM Growths WHERE growthID = ?', [growthID], (error, results) =>{
        if(error){
            console.error(`Issue deleting growth entry with growthID ${growthID} `);
            res.status(500).send('Unable to delete growth');
            return;
        }
        res.status(204).send("Growth deleted");
    });
});



//--------------------------------------PRODUCTIONS OPERATIONS-------------------------------------------

//Display all Productions
app.get('/Productions',(req,res) => {
    db.query(`
        SELECT 
            Productions.productionID,
            Productions.plantID,
            Plants.plantType,
            Productions.startDate,
            Productions.endProduction,
            Productions.waterFrequency,
            Productions.yield,
            Productions.fertilizerFrequency,
            Fertilizers.fertilizerType,
            Growinglocations.isGround,
            Growinglocations.isContainer,
            Growinglocations.bedType,
            Growinglocations.containerType
        FROM Productions
        LEFT JOIN FertilizerDetails ON Productions.productionID = FertilizerDetails.productionsID
        LEFT JOIN Fertilizers ON FertilizerDetails.fertilizerID = Fertilizers.fertilizerID
        LEFT JOIN LocationDetails ON Productions.productionID = LocationDetails.productionsID
        LEFT JOIN GrowingLocations ON LocationDetails.growingLocationsID = GrowingLocations.locationID
        LEFT JOIN Plants ON Productions.plantID = Plants.plantID;
        `, (error, results) => {
        if(error){
            console.error('Error running production query:', error);
            res.status(500).send('Error fetching production data');
            return;
        }
        res.json(results);
    })
});

app.get('/Fertilizers',(req,res) => {
    db.query(` SELECT * FROM Fertilizers`, (error, results) => {
        if(error){
            console.error('Error running fertilizer query:', error);
            res.status(500).send('Error fetching fertilizer data');
            return;
        }
        res.json(results);
    })
});

app.get('/GrowingLocations',(req,res) => {
    db.query(` SELECT * FROM GrowingLocations`, (error, results) => {
        if(error){
            console.error('Error running growing location query:', error);
            res.status(500).send('Error fetching growing location data');
            return;
        }
        res.json(results);
    })
});

app.get('/FertilizerDetails',(req,res) => {
    db.query(` SELECT * FROM FertilizerDetails`, (error, results) => {
        if(error){
            console.error('Error running FertilizerDetails query:', error);
            res.status(500).send('Error fetching FertilizerDetails data');
            return;
        }
        res.json(results);
    })
});

app.get('/LocationDetails',(req,res) => {
    db.query(` SELECT * FROM LocationDetails`, (error, results) => {
        if(error){
            console.error('Error running FertilizerDetails query:', error);
            res.status(500).send('Error fetching FertilizerDetails data');
            return;
        }
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