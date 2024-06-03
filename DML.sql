-- CS340 Group 49: Anthony Parsons and Ryan Countryman
-- Project: GERMSQUAD

-- [ DISPLAYS ]

-- Display Current entries while on Plants page
SELECT * FROM Plants;

-- Display Current entries while on Seedlings page
SELECT 
	Seedlings.seedlingID,
	Plants.plantType,
    Seedlings.plantID,
    Seedlings.datePlanted,
    Seedlings.aveTemperature,
    Seedlings.waterFrequency,
    Seedlings.germinationTime
FROM Seedlings
LEFT JOIN Plants ON Seedlings.plantID = Plants.plantID;

-- Displays Current entries on the Growths Page 
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

-- Displays Current entries on the Productions Page 
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

-- Display Current entries while on GrowingLocations page
SELECT * FROM GrowingLocations;

-- Display FertilizerDetails
SELECT * FROM FertilizerDetails;

-- Display LocationDetails
SELECT * FROM LocationDetails;



-- [ DISPLAY CONT. + DROPDOWN POPULATION ]

-- Display Current entries while on Fertilizers page and populate fertilizer drop down
SELECT * FROM Fertilizers;

-- Query to populate plants drop down list during creation of plant 
SELECT DISTINCT plantType FROM Plants;

-- Query to populate growths drop down list during creation of intersection tables
SELECT growthID, Plants.plantType FROM Growths
LEFT JOIN Plants ON Growths.plantID = Plants.plantID

-- Query to populate productions drop down list during creation of intersection tables
SELECT productionID, Plants.plantType FROM Productions
LEFT JOIN Plants ON Productions.plantID = Plants.plantID

-- Query to populate fertilizers drop down list during creation of intersection tables
SELECT fertilizerID, fertilizerType FROM Fertilizers;

-- Query to populate GrowingLocations drop down list during creation of intersection tables
SELECT locationID, isGround, bedType, containerType FROM growingLocations

-- Query to populate drop down list for plants growing in the ground
SELECT bedType FROM GrowingLocations
	WHERE isGround = 1;

-- Query to populate drop down list for plants growing in containers
SELECT containerType FROM GrowingLocations
	WHERE isGround = 0;
    
-- Find specific plant entry by id for Puts
Select * From Plants WHERE plantID = :plantID;

-- Find specific seedling entry by id for Puts
Select * From Seedlings WHERE seedlingID = :seedlingID;

-- Find specific growth entry by id for Puts
Select * From Growths WHERE growthID = :growthID;

-- Find specific production entry by id for Puts
Select * From Productions WHERE productionID = :productionID;

-- Find specific fertilizer entry by id for Puts
Select * From Fertilizers WHERE fertilizerID = :fertilizerID;

-- Find specific growth entry by id for Puts
Select * From GrowingLocations WHERE locationID = :locationID;



-- [ CREATION ]

-- Create a new Plant
INSERT INTO Plants (plantType, seasonComplete, waterSummation) 
VALUES (:plantTypeInput, :seasonCompleteInput, :waterSummationInput);

-- Create a new Seedling
INSERT INTO Seedlings (plantID, datePlanted, aveTemperature, waterFrequency, germinationTime) 
VALUES (:plantID_from_dropdown_Input, :datePlantedInput, :aveTemperatureInput, :waterFrequencyInput, :germinationTimeInput);

-- Create a new Growth
INSERT INTO Growths (plantID, startDate, dailySunlight, waterFrequency,  fertilizerFrequency)
VALUES (:plantID_from_dropdown_Input, :startDateInput, :dailySunlightInput, :waterFrequencyInput, :fertilizerFrequencyInput);

-- Create a new Production
INSERT INTO Productions (plantID, startDate, endProduction, waterFrequency, waterAmount, fertilizerFrequency, yield)
VALUES (:plantID_from_dropdown_Input, :startDateInput, :endProductionInput, :waterFrequencyInput, :waterAmountInput, :fertilizerFrequencyInput, :yieldInput);

-- Create a new GrowingLocation
INSERT INTO GrowingLocations (isGround, isContainer, containerType, bedType)
VALUES (:isGroundInput, :isContainerInput, :containerTypeInput, :bedTypeInput);

-- Create a new Fertilizer
INSERT INTO Fertilizers (fertilizerType, nitrogen, phosphorous, potassium)
VALUES (:fertilizerTypeInput, :nitrogenInput, :phosphorousInput, :potassiumInput);

-- Create a new FertilizerDetails
INSERT INTO FertilizerDetails (fertilizerID, growthsID, productionsID)
VALUES (:fertilizerID, :growthsID, productionsID)

-- Create a new LocationDetails
INSERT INTO LocationDetails (locationID, growthsID, productionsID)
VALUES (:locationID, :growthsID, productionsID)



-- [UPDATING]

-- Update a Plants Entry
UPDATE Plants SET
		plantType = coalesce(:plantType,plantType), 
		seasonComplete = coalesce(:seasonComplete,seasonComplete)
WHERE plantID = ?

-- Update a Seedlings Entry
UPDATE Seedlings SET
		datePlanted = coalesce(:datePlanted,datePlanted),
		aveTemperature = coalesce(:aveTemperature,aveTemperature), 
		waterFrequency = coalesce(:waterFrequency,waterFrequency),  
		germinationTime = coalesce(:germinationTime,germinationTime)
WHERE seedlingID = ?

-- Update a Growths Entry
UPDATE Growths SET
		startDate = coalesce(:startDate,startDate),
		dailySunlight = coalesce(:dailySunlight,dailySunlight), 
		waterFrequency = coalesce(:waterFrequency,waterFrequency),  
		fertilizerFrequency = coalesce(:fertilizerFrequency,fertilizerFrequency)
WHERE growthID = ?

-- Update a Productions Entry
UPDATE Productions SET
		startDate = coalesce(:startDate,startDate), 
		endProduction = coalesce(:endProduction,endProduction), 
		waterFrequency = coalesce(:waterFrequency,waterFrequency), 
		fertilizerFrequency = coalesce(:fertilizerFrequency,fertilizerFrequency), 
		yield = coalesce(:yield,yield)
WHERE productionID = ?

-- Update a GrowingLocations Entry
UPDATE GrowingLocations SET
	isGround = :isGroundInput, 
	isContainer = :isContainerInput,
    bedType = :bedTypeInput,
	containerType = :containerTypeInput
WHERE locationID = :locationIDInput;

-- Update a Fertilizers Entry
UPDATE Fertilizers SET
		fertilizerType = coalesce(:fertilizerType,fertilizerType),
		nitrogen = coalesce(:nitrogen,nitrogen),
		phosphorous = coalesce(:phosphorous,phosphorous),
		potassium = coalesce(:potassium,potassium)
WHERE fertilizerID = ?

-- Update a GrowingLocationDetails Entry
UPDATE LocationDetails SET
		growthsID = :growthsID, 
		productionsID = :productionsID 
WHERE locationDetailsID = :locationDetailsID;

-- Update a FertilizerDetails Entry
UPDATE FertilizerDetails SET
		growthsID = :growthsID, 
		productionsID = :productionsID 
WHERE detailsID = :detailsID;



-- [ DELETION ]

-- Delete Plants entry
DELETE FROM Plants WHERE plantID = :plantIDInput;

-- Delete Seedlings entry
DELETE FROM Seedlings WHERE seedlingID = :seedlingIDInput;

-- Delete Growths entry
DELETE FROM Growths WHERE growthID = :growthIDInput;

-- Delete Productions entry
DELETE FROM Productions WHERE productionID = :productionIDInput;

-- Delete GrowingLocations entry
DELETE FROM GrowingLocations WHERE locationID = :locationIDInput;

-- Delete Fertilizers entry
DELETE FROM Fertilizers WHERE fertilizerID = :fertilizerIDInput;

-- Delete FertilizerDetails entry
DELETE FROM FertilizerDetails WHERE detailsID = :detailsID

-- Delete LocationDetails entry
DELETE FROM LocationDetails WHERE locationDetailsID = :locationDetailsID