-- CS340 Group 49: Anthony Parsons and Ryan Countryman
-- Project: GERMSQUAD Part3 Draft

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
SELECT * FROM LocationDetails



-- [ DISPLAY CONT. + DROPDOWN POPULATION ]

-- Display Current entries while on Fertilizers page and populate fertilizer drop down
SELECT * FROM Fertilizers;

-- Query to populate drop down list during creation of plant 
SELECT plantType FROM Plants;

-- Query to populate drop down list for plants growing in the ground
SELECT bedType FROM GrowingLocations
	WHERE isGround = 1;

-- Query to populate drop down list for plants growing in containers
SELECT containerType FROM GrowingLocations
	WHERE isGround = 0;
    
-- Find specific entry by id for Puts
Select * From Plants WHERE plantID = :plantID;



-- [ CREATION ]

-- Create a new Plant
INSERT INTO Plants (plantType, seasonComplete, waterSummation) 
VALUES (:plantTypeInput, :seasonCompleteInput, :waterSummationInput);

-- Create a new Seedling
INSERT INTO Seedlings (plantID, datePlanted, aveTemperature, waterFrequency, waterAmount, germinationTime) 
VALUES (:plantID_from_dropdown_Input, :datePlantedInput, :aveTemperatureInput, :waterFrequencyInput, :waterAmountInput, :germinationTimeInput);

-- Create a new Growth

INSERT INTO Growths (plantID, startDate, dailySunlight, waterFrequency, waterAmount, fertilizerFrequency)
VALUES (:plantID_from_dropdown_Input, :startDateInput, :dailySunlightInput, :waterFrequencyInput, :waterAmountInput, :fertilizerFrequencyInput);

-- Create a new Production
INSERT INTO Productions (plantID, startDate, endProduction, waterFrequency, waterAmount, fertilizerFrequency, yield)
VALUES (:plantID_from_dropdown_Input, :startDateInput, :endProductionInput, :waterFrequencyInput, :waterAmountInput, :fertilizerFrequencyInput, :yieldInput);

-- Create a new GrowingLocation
INSERT INTO GrowingLocations (isGround, isContainer, containerType, bedType)
VALUES (:isGroundInput, :isContainerInput, :containerTypeInput, :bedTypeInput);

-- Create a new Fertilizer
INSERT INTO Fertilizers (fertilizerType, nitrogen, phosphorous, potassium)
VALUES (:fertilizerTypeInput, :nitrogenInput, :phosphorousInput, :potassiumInput);





-- [UPDATING]

-- Update a Plants Entry
UPDATE Plants SET
	plantType = :plantTypeInput, 
	seasonComplete = :seasonCompleteInput
WHERE plantID = :plantIDInput;

-- Update a Seedlings Entry
UPDATE Seedlings SET
	datePlanted = :datePlantedInput,
	aveTemperature = :aveTemperatureInput, 
	waterFrequency = :waterFrequencyInput, 
	waterAmount = :waterAmountInput, 
	germinationTime = :germinationTimeInput
WHERE seedlingID = :seedlingIDInput;

-- Update a Growths Entry
UPDATE Growths SET
	startDate = :startDateInput,
	dailySunlight = :dailySunlightInput, 
	waterFrequency = :waterFrequencyInput, 
	waterAmount = :waterAmountInput, 
	fertilizerFrequency = :fertilizerFrequencyInput
WHERE growthID = :growthIDInput;

-- Update a Productions Entry
UPDATE Productions SET
	startDate = :startDateInput, 
	endProduction = :endProductionInput, 
	waterFrequency = :waterFrequencyInput, 
	waterAmount = :waterAmountInput, 
	fertilizerFrequency = :fertilizerFrequencyInput, 
	yield = :yieldInput
WHERE productionID = :productionIDInput;

-- Update a GrowingLocations Entry
UPDATE GrowingLocations SET
	isGround = :isGroundInput, 
	isContainer = :isContainerInput, 
	containerType = :containerTypeInput, 
	bedType = :bedTypeInput
WHERE locationID = :locationIDInput;

-- Update a Fertilizers Entry
UPDATE Fertilizers SET
	fertilizerType = :fertilizerTypeInput,
	nitrogen = :nitrogenInput,
	phosphorous = :phosphorousInput,
	potassium = :potassiumInput
WHERE fertilizerID = :fertilizerIDInput;





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
