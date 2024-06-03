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


//Read full plants table
app.get('/Plants',(req,res) => {
    db.query('SELECT * FROM Plants', (error, results) => {
        if(error){
            console.error('Error running query:', error);
            res.status(500).send('Error fetching plant data');
            return;
        }
        res.json(results);
    });
});


//Obtain specific plant entry by ID
app.get('/Plants/:plantID', (req,res) =>{
    const plantID = req.params.plantID;
    db.query(`Select * From Plants WHERE plantID = ?`,[plantID], (error,results) =>{
        if(error){
            console.log(`Error obtaining plant with ID: ${plantID}`);
            res.status(500).send('Unable to find plant')
            return;
        }
        res.json(results);
    });
});


//Creation of plant entry
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


//Edit plant entry
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


//Deletion of plant entry by plantID
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


//Plants Drop Down for FK 
app.get('/PlantsDrop',(req,res) => {
    db.query('SELECT plantID, plantType FROM plants', (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching plants for dropdown');
            return;
        }
        res.json(results);
    });
});


//Plant Name Drop Down for Creation of Plants
app.get('/PlantsTypeDrop',(req,res) => {
    db.query('SELECT DISTINCT plantType FROM plants', (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching plants for dropdown');
            return;
        }
        res.json(results);
    });
});

//--------------------------------------SEEDLINGS OPERATIONS-------------------------------------------

//GET all seedling entries
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
        res.json(results);
    });
});


//Get Seedling By ID
app.get('/Seedlings/:seedlingID', (req,res) =>{
    const seedlingID = req.params.seedlingID;
    db.query(`Select * From Seedlings WHERE seedlingID = ?`,[seedlingID], (error,results) =>{
        if(error){
            console.log(`Error obtaining seedling with ID: ${seedlingID}`);
            res.status(500).send('Unable to find seedling')
            return;
        }
        res.json(results);
    });
});


//Create New Seedling
app.post('/CreateSeedling', (req,res) => {
    let { plantID, datePlanted, aveTemperature, waterFrequency, germinationTime } = req.body;
    aveTemperature = aveTemperature ? aveTemperature : null;
    waterFrequency = waterFrequency ? waterFrequency : null;
    germinationTime = germinationTime ? germinationTime : null;

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
            GrowingLocations.isGround,
            GrowingLocations.isContainer,
            GrowingLocations.bedType,
            GrowingLocations.containerType
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
        res.json(results);
    });
});


//Get Growth By ID
app.get('/Growths/:growthID', (req,res) =>{
    const growthID = req.params.growthID;
    db.query(`Select * From Growths WHERE growthID = ?`,[growthID], (error,results) =>{
        if(error){
            console.log(`Error obtaining growth with ID: ${growthID}`);
            res.status(500).send('Unable to find growth')
            return;
        }
        res.json(results);
    });
});


//Create New Growth
app.post('/CreateGrowth', (req,res) => {
    let { plantID, startDate, dailySunlight, waterFrequency, fertilizerFrequency } = req.body;
    dailySunlight = dailySunlight ? dailySunlight : null;
    waterFrequency = waterFrequency ? waterFrequency : null;
    fertilizerFrequency = fertilizerFrequency ? fertilizerFrequency : null;

    const query = `
            INSERT INTO Growths (
                plantID,
                startDate,
                dailySunlight,
                waterFrequency,
                fertilizerFrequency)
            VALUES (?,?,?,?,?)`;
    db.query(query, [plantID, startDate, dailySunlight, waterFrequency, fertilizerFrequency], (error, results) =>{
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


//Delete existing Production entry
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


//Growths Drop Down for Intersection Tables
app.get('/GrowthsDrop',(req,res) => {
    db.query(`
        SELECT growthID, Plants.plantType FROM Growths
        LEFT JOIN Plants ON Growths.plantID = Plants.plantID`, (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching growths for dropdown');
            return;
        }
        res.json(results);
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
            GrowingLocations.isGround,
            GrowingLocations.isContainer,
            GrowingLocations.bedType,
            GrowingLocations.containerType
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
    });
});


//Get Production By ID
app.get('/Productions/:productionID', (req,res) =>{
    const productionID = req.params.productionID;
    db.query(`Select * From Productions WHERE productionID = ?`,[productionID], (error,results) =>{
        if(error){
            console.log(`Error obtaining production with ID: ${productionID}`);
            res.status(500).send('Unable to find production')
            return;
        }
        res.json(results);
    });
});


//Create new Production Entity
app.post('/CreateProduction', (req,res) => {
    let { plantID, startDate, endDate, waterFrequency, fertilizerFrequency, totalYield } = req.body;
    endDate = endDate ? endDate : null;
    waterFrequency = waterFrequency ? waterFrequency : null;
    fertilizerFrequency = fertilizerFrequency ? fertilizerFrequency : null;
    totalYield = totalYield ? totalYield : null;

    const query = `
        INSERT INTO Productions (
            plantID,
            startDate,
            endProduction,
            waterFrequency,
            fertilizerFrequency,
            yield)
        VALUES (?,?,?,?,?,?);`;
    db.query(query, [plantID, startDate, endDate, waterFrequency, fertilizerFrequency, totalYield], (error, results) =>{
        if(error){
            console.error("Issue inserting new production entry");
            res.status(500).send('Unable to create production plant');
            return;
        }
        res.status(201).send('New production created');
    });
});


//Update existing Production Entry
app.put('/EditProduction/:editProductionID', (req,res) =>{
    const productionID = req.params.editProductionID;
    let { startDate, endDate, waterFrequency, fertilizerFrequency, totalYield } = req.body;

    const query = `
        UPDATE Productions SET
	        startDate = coalesce(?,startDate), 
            endProduction = coalesce(?,endProduction), 
            waterFrequency = coalesce(?,waterFrequency), 
            fertilizerFrequency = coalesce(?,fertilizerFrequency), 
            yield = coalesce(?,yield)
        WHERE productionID = ?`;
    db.query(query, [startDate, endDate, waterFrequency, fertilizerFrequency, totalYield, productionID], (error, results) =>{
        if(error){
            console.error("Issue updating production entry");
            res.status(500).send('Unable to update production entry');
            return;
        }
        res.status(201).send('Production updated');
    });
});


//Delete existing production entry
app.delete('/DeleteProduction/:productionID', (req,res) => {
    const productionID = req.params.productionID;
    db.query('DELETE FROM Productions WHERE productionID = ?', [productionID], (error, results) =>{
        if(error){
            console.error(`Issue deleting production entry with productionID ${productionID} `);
            res.status(500).send('Unable to delete production');
            return;
        }
        res.status(204).send("Production deleted");
    });
});


//Productions Drop Down for Intersection Tables
app.get('/ProductionsDrop',(req,res) => {
    db.query(`
        SELECT productionID, Plants.plantType FROM Productions
        LEFT JOIN Plants ON Productions.plantID = Plants.plantID`, (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching productions for dropdown');
            return;
        }
        res.json(results);
    });
});

//--------------------------------------Fertilizers OPERATIONS-------------------------------------------

//Get all Fertilizers
app.get('/Fertilizers',(req,res) => {
    db.query(` SELECT * FROM Fertilizers`, (error, results) => {
        if(error){
            console.error('Error running fertilizer query:', error);
            res.status(500).send('Error fetching fertilizer data');
            return;
        }
        res.json(results);
    });
});


//Get Fertilizer By ID
app.get('/Fertilizers/:fertilizerID', (req,res) =>{
    const fertilizerID = req.params.fertilizerID;
    db.query(`Select * From Fertilizers WHERE fertilizerID = ?`,[fertilizerID], (error,results) =>{
        if(error){
            console.log(`Error obtaining fertilizer with ID: ${fertilizerID}`);
            res.status(500).send('Unable to find fertilizer')
            return;
        }
        res.json(results);
    });
});


//Create new Fertilizer Entity
app.post('/CreateFertilizer', (req,res) => {
    let { fertilizerType, nitrogen, phosphorous, potassium } = req.body;
    nitrogen = nitrogen ? nitrogen : 0;
    phosphorous = phosphorous ? phosphorous : 0;
    potassium = potassium ? potassium : 0;

    const query = `
        INSERT INTO Fertilizers (
            fertilizerType,
            nitrogen,
            phosphorous,
            potassium)
        VALUES (?,?,?,?);`;
    db.query(query, [fertilizerType, nitrogen, phosphorous, potassium], (error, results) =>{
        if(error){
            console.error("Issue inserting new fertilizer entry");
            res.status(500).send('Unable to create fertilizer');
            return;
        }
        res.status(201).send('New fertilizer created');
    });
});


//Update existing Fertilizer Entry
app.put('/EditFertilizer/:editFertilizerID', (req,res) =>{
    const fertilizerID = req.params.editFertilizerID;
    let { fertilizerType, nitrogen, phosphorous, potassium } = req.body;

    const query = `
        UPDATE Fertilizers SET
            fertilizerType = coalesce(?,fertilizerType),
            nitrogen = coalesce(?,nitrogen),
            phosphorous = coalesce(?,phosphorous),
            potassium = coalesce(?,potassium)
        WHERE fertilizerID = ?`;
    db.query(query, [fertilizerType, nitrogen, phosphorous, potassium, fertilizerID], (error, results) =>{
        if(error){
            console.error("Issue updating Fertilizer entry");
            res.status(500).send('Unable to update Fertilizer entry');
            return;
        }
        res.status(201).send('Fertilizer updated');
    });
});


//Delete existing Fertilizer entry
app.delete('/DeleteFertilizer/:fertilizerID', (req,res) => {
    const fertilizerID = req.params.fertilizerID;
    db.query('DELETE FROM Fertilizers WHERE fertilizerID = ?', [fertilizerID], (error, results) =>{
        if(error){
            console.error(`Issue deleting fertilizer entry with fertilizerID ${fertilizerID} `);
            res.status(500).send('Unable to delete fertilizer');
            return;
        }
        res.status(204).send("Fertilizer deleted");
    });
});


//Fertilizer Drop Down for Intersection Table
app.get('/FertilizersDrop',(req,res) => {
    db.query(`SELECT fertilizerID, fertilizerType FROM Fertilizers`, (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching fertilizers for dropdown');
            return;
        }
        res.json(results);
    });
});

//--------------------------------------GrowingLocations OPERATIONS-------------------------------------------

//Get All growingLocations
app.get('/GrowingLocations',(req,res) => {
    db.query(` SELECT * FROM GrowingLocations`, (error, results) => {
        if(error){
            console.error('Error running growing location query:', error);
            res.status(500).send('Error fetching growing location data');
            return;
        }
        res.json(results);
    });
});


//Get GrowingLocation By ID
app.get('/GrowingLocations/:locationID', (req,res) =>{
    const locationID = req.params.locationID;
    db.query(`Select * From GrowingLocations WHERE locationID = ?`,[locationID], (error,results) =>{
        if(error){
            console.log(`Error obtaining growingLocation with ID: ${locationID}`);
            res.status(500).send('Unable to find growingLocation')
            return;
        }
        res.json(results[0]);
    });
});


//Create new GrowingLocation Entity
app.post('/CreateGrowingLocation', (req,res) => {
    let { isGroundLoc, isContainerLoc, bedType, containerType } = req.body;
    bedType = isGroundLoc === 1 ? bedType : null;
    containerType = isContainerLoc === 1 ? containerType : null;
    
    const query = `
        INSERT INTO GrowingLocations (
            isGround,
            isContainer,
            bedType,
            containerType)
        VALUES (?,?,?,?)`;
    db.query(query, [isGroundLoc, isContainerLoc, bedType, containerType], (error, results) =>{
        if(error){
            console.error("Issue inserting new growingLocation entry");
            res.status(500).send('Unable to create growingLocation');
            return;
        }
        res.status(201).send('New growingLocation created');
    });
});


//Update existing GrowingLocation Entry
app.put('/EditGrowingLocation/:editLocationID', (req,res) =>{
    const locationID = req.params.editLocationID;
    let { isGroundLoc, isContainerLoc, bedType, containerType } = req.body;
    bedType = isGroundLoc === 1 ? bedType : null;
    containerType = isContainerLoc === 1 ? containerType : null;

    const query = `
        UPDATE GrowingLocations SET
            isGround = ?, 
            isContainer = ?,
            bedType = ?, 
            containerType = ? 
        WHERE locationID = ?`;
    db.query(query, [isGroundLoc, isContainerLoc, bedType, containerType, locationID], (error, results) =>{
        if(error){
            console.error("Issue updating GrowingLocation entry");
            res.status(500).send('Unable to update GrowingLocation entry');
            return;
        }
        res.status(201).send('GrowingLocation updated');
    });
});


//Delete existing GrowingLocation entry
app.delete('/DeleteGrowingLocation/:locationID', (req,res) => {
    const locationID = req.params.locationID;
    db.query('DELETE FROM GrowingLocations WHERE locationID = ?', [locationID], (error, results) =>{
        if(error){
            console.error(`Issue deleting GrowingLocation entry with locationID ${locationID} `);
            res.status(500).send('Unable to delete GrowingLocation');
            return;
        }
        res.status(204).send("GrowingLocation deleted");
    });
});


//Get Locations for dropdown
app.get('/LocationsDrop',(req,res) => {
    db.query('SELECT locationID, isGround, bedType, containerType FROM growingLocations', (error ,results) => {
        if(error){
            console.error('Error running dropdown population query:', error);
            res.status(500).send('Error fetching plants for dropdown');
            return;
        }
        res.json(results);
    });
});



//--------------------------------------FertilizerDetails OPERATIONS-------------------------------------------

//Get All FertilizerDetails
app.get('/FertilizerDetails',(req,res) => {
    db.query(` SELECT * FROM FertilizerDetails`, (error, results) => {
        if(error){
            console.error('Error running FertilizerDetails query:', error);
            res.status(500).send('Error fetching FertilizerDetails data');
            return;
        }
        res.json(results);
    });
});


//Get FertilizerDetails By ID
app.get('/FertilizerDetails/:detailsID', (req,res) =>{
    const detailsID = req.params.detailsID;
    db.query(`Select * From FertilizerDetails WHERE detailsID = ?`,[detailsID], (error,results) =>{
        if(error){
            console.log(`Error obtaining FertilizerDetails with ID: ${detailsID}`);
            res.status(500).send('Unable to find FertilizerDetails')
            return;
        }
        res.json(results);
    });
});


//Insert new FertilizerDetails
app.post('/CreateFertilizerDetails',(req,res) => {
    let { fertilizerID, growthsID, productionsID } = req.body;
    growthsID = growthsID ? growthsID : null;
    productionsID = productionsID ? productionsID : null;
    const query = `
        INSERT INTO FertilizerDetails (
            fertilizerID,
            growthsID,
            productionsID)
        VALUES (?,?,?)`;
    db.query(query, [fertilizerID, growthsID, productionsID], (error, results) =>{
            if(error){
                console.error("Issue inserting FertilizerDetails entry");
                res.status(500).send('Unable to create FertilizerDetails entry');
                return;
            }
            res.status(201).send('FertilizerDetails entry created');
        });
});


//Update existing FertilizerDetails Entry
app.put('/EditFertilizerDetails/:editFertilzerDetailsID', (req,res) =>{
    const fertilzerDetailsID = req.params.editFertilzerDetailsID;
    let { growthsID, productionsID } = req.body;
    growthsID = growthsID ? growthsID : null;
    productionsID = productionsID ? productionsID : null;
   
    const query =`
        UPDATE FertilizerDetails SET
            growthsID = ?, 
            productionsID = ? 
        WHERE detailsID = ?`;
        
    db.query(query, [ growthsID, productionsID, fertilzerDetailsID], (error, results) =>{
        if(error){
            console.error(`Issue updating FertilizerDetails entry with ID: ${fertilzerDetailsID}`);
            res.status(500).send('Unable to update FertilizerDetails entry');
            return;
        }
        res.status(201).send('FertilizerDetails updated');
    });
});


//Delete existing FertilizerDetails entry
app.delete('/DeleteFertilizerDetails/:detailsID', (req,res) => {
    const detailsID = req.params.detailsID;
    db.query('DELETE FROM FertilizerDetails WHERE detailsID = ?', [detailsID], (error, results) =>{
        if(error){
            console.error(`Issue deleting FertilizerDetails entry with detailsID ${detailsID} `);
            res.status(500).send('Unable to delete FertilizerDetails');
            return;
        }
        res.status(204).send("FertilizerDetails entry deleted");
    });
});

//--------------------------------------LocationDetails OPERATIONS-------------------------------------------

//Get All LocationDetails
app.get('/LocationDetails',(req,res) => {
    db.query(` SELECT * FROM LocationDetails`, (error, results) => {
        if(error){
            console.error('Error running FertilizerDetails query:', error);
            res.status(500).send('Error fetching FertilizerDetails data');
            return;
        }
        res.json(results);
    });
});


//Get LocationDetails By ID
app.get('/LocationDetails/:locationDetailsID', (req,res) =>{
    const locationDetailsID = req.params.locationDetailsID;
    db.query(`Select * From LocationDetails WHERE locationDetailsID = ?`,[locationDetailsID], (error,results) =>{
        if(error){
            console.log(`Error obtaining LocationDetails with ID: ${locationDetailsID}`);
            res.status(500).send('Unable to find LocationDetails')
            return;
        }
        res.json(results);
    });
});


//Insert new LocationDetails
app.post('/CreateLocationDetails',(req,res) => {
    let { locationsID, growthsID, productionsID } = req.body;
    growthsID = growthsID ? growthsID : null;
    productionsID = productionsID ? productionsID : null;
    const query = `
        INSERT INTO LocationDetails (
            growingLocationsID,
            growthsID,
            productionsID)
        VALUES (?,?,?)`;
    db.query(query, [locationsID, growthsID, productionsID], (error, results) =>{
            if(error){
                console.error("Issue inserting LocationDetails entry");
                res.status(500).send('Unable to create LocationDetails entry');
                return;
            }
            res.status(201).send('LocationDetails entry created');
        });
});


//Update existing GrowingLocation Entry
app.put('/EditLocationDetails/:editLocationDetailsID', (req,res) =>{
    const locationDetailsID = req.params.editLocationDetailsID;
    let { growthsID, productionsID } = req.body;
   
    const query =`
        UPDATE LocationDetails SET
            growthsID = ?, 
            productionsID = ? 
        WHERE locationDetailsID = ?`;
        
    db.query(query, [ growthsID, productionsID, locationDetailsID], (error, results) =>{
        if(error){
            console.error(`Issue updating LocationDetails entry with ID: ${locationDetailsID}`);
            res.status(500).send('Unable to update LocationDetails entry');
            return;
        }
        res.status(201).send('LocationDetails updated');
    });
});


//Delete existing LocationDetails entry
app.delete('/DeleteLocationDetails/:locationDetailsID', (req,res) => {
    const locationDetailsID = req.params.locationDetailsID;
    db.query('DELETE FROM LocationDetails WHERE locationDetailsID = ?', [locationDetailsID], (error, results) =>{
        if(error){
            console.error(`Issue deleting LocationDetails entry with detailsID ${locationDetailsID} `);
            res.status(500).send('Unable to delete LocationDetails');
            return;
        }
        res.status(204).send("LocationDetails entry deleted");
    });
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