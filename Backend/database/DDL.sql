/* Create Base table for each Plant  */
CREATE OR REPLACE TABLE Plants(
    plantID int NOT NULL AUTO_INCREMENT,
    plantType varchar(45) NOT NULL,  /* Name of plant in plain text */
    seasonComplete tinyint DEFAULT 0, /* Marks completion of harvest */
    PRIMARY KEY (plantID)
);

/* Establish table for seedling state of plant  */
CREATE OR REPLACE TABLE Seedlings(
    seedlingID int NOT NULL AUTO_INCREMENT,
    plantID int NOT NULL,  /* Associates seedling state to plant */
    datePlanted date NOT NULL,
    aveTemperature int,  /* Average soil temps */
    waterFrequency int, /* Days between watering  */
    germinationTime int, /* Days to sprout */
    PRIMARY KEY (seedlingID),
    FOREIGN KEY (plantID) REFERENCES Plants(plantID) ON DELETE CASCADE
);

/* Establishes table for growth stage of plant  */
CREATE OR REPLACE TABLE Growths(
    growthID int NOT NULL AUTO_INCREMENT,
    plantID int NOT NULL,
    startDate date NOT NULL,
    dailySunlight int,  /* Hours of sunlight per day */
    waterFrequency int,
    fertilizerFrequency int, /* Days between each fertilization  */
    PRIMARY KEY (growthID),
    FOREIGN KEY (plantID) REFERENCES Plants(plantID) ON DELETE CASCADE
);

/* Establishes table for Production stage of plant  */
CREATE OR REPLACE TABLE Productions(
    productionID int NOT NULL AUTO_INCREMENT,
    plantID int NOT NULL,
    startDate date NOT NULL,
    endProduction date,  /* Date plant stops producing fruits. Once set, need to implement method of updating SeasonComplete bool */
    waterFrequency int,
    fertilizerFrequency int,
    yield int,  /* Total Yield in grams from plant during production phase  */
    PRIMARY KEY (productionID),
    FOREIGN KEY (plantID) REFERENCES Plants(plantID) ON DELETE CASCADE
);

/* Establishes set of possible locations plant may be growing  */
CREATE OR REPLACE TABLE GrowingLocations(
    locationID int NOT NULL AUTO_INCREMENT,
    isGround tinyint DEFAULT 0 NOT NULL,  /* Represents in ground location */
    isContainer tinyint DEFAULT 0 NOT NULL, /* Container Location  */
    containerType varchar(45), /* Description of location  */
    bedType varchar(45),
    PRIMARY KEY (locationID)
);

/* Intersection table to associate locations to plant and stage */
CREATE OR REPLACE TABLE LocationDetails(
    locationDetailsID int NOT NULL AUTO_INCREMENT,
    growingLocationsID int NOT NULL,
    growthsID int,
    productionsID int,
    PRIMARY KEY (locationDetailsID),
    FOREIGN KEY (growingLocationsID) REFERENCES GrowingLocations(locationID) ON DELETE CASCADE,
    FOREIGN KEY (growthsID) REFERENCES Growths(growthID) ON DELETE SET NULL,
    FOREIGN KEY (productionsID) REFERENCES Productions(productionID) ON DELETE SET NULL
);

/* Table for storing types of fertilizer and relevant properties of them */
CREATE OR REPLACE TABLE Fertilizers(
    fertilizerID int NOT NULL AUTO_INCREMENT,
    fertilizerType varchar(255),
    nitrogen int, /* Value shown on fertilizer. Does not refer to a specific percentage or volume. Is the case for all three components  */
    phosphorous int,
    potassium int,
    PRIMARY KEY (fertilizerID)
);

/* Intersection table to associate fertilizers to plant stages  */
CREATE OR REPLACE TABLE FertilizerDetails(
    detailsID int NOT NULL AUTO_INCREMENT,
    fertilizerID int NOT NULL,
    growthsID int,
    productionsID int,
    PRIMARY KEY (detailsID),
    FOREIGN KEY (fertilizerID) REFERENCES Fertilizers(fertilizerID) ON DELETE CASCADE,
    FOREIGN KEY (growthsID) REFERENCES Growths(growthID) ON DELETE SET NULL,
    FOREIGN KEY (productionsID) REFERENCES Productions(productionID) ON DELETE SET NULL
);


INSERT INTO Plants (
    plantType
)
VALUES(
    "Cherry Tomato"
),
(
    "Chocolate Seven Pot Pepper"
),
(
    "HoneyNut Squash"
),
(
    "English Cucumbers"
);

INSERT INTO Seedlings (
    plantID,
    datePlanted,
    aveTemperature,
    waterFrequency,
    germinationTime
)
VALUES
(
    (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato"), 
    20240301,
    70,
    2,
    10
),
(
    (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper"), 
    20240315,
    80,
    3,
    7
),
(
    (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash"), 
    20240401,
    70,
    2,
    3
),
(
    (SELECT plantID FROM Plants WHERE plantType = "English Cucumbers"), 
    20240401,
    70,
    2,
    6
);

INSERT INTO Growths (
    plantID,
    startDate,
    dailySunlight,
    waterFrequency,
    fertilizerFrequency
)
VALUES
(
    (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato"), 
    20240311,
    12,
    2,
    4
),
(
    (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper"), 
    20240322,
    16,
    4,
    4
),
(
    (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash"), 
    20240404,
    10,
    1,
    7
),
(
    (SELECT plantID FROM Plants WHERE plantType = "English Cucumbers"), 
    20240407,
    10,
    1,
    7
);

INSERT INTO Productions (
    plantID,
    startDate,
    endProduction,
    waterFrequency,
    fertilizerFrequency,
    yield
)
VALUES 
(
    (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato"), 
    20240601,
    20241023,
    2,
    4,
    2000
),
(
    (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper"), 
    20240701,
    20240925,
    4,
    7,
    850
),
(
    (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash"), 
    20240615,
    20241115,
    2,
    7,
    10000
),
(
    (SELECT plantID FROM Plants WHERE plantType = "English Cucumbers"), 
    20240515,
    20240820,
    1,
    7,
    8000
);

INSERT INTO Fertilizers (
    fertilizerType,
    nitrogen,
    phosphorous,
    potassium
)
VALUES
(
    "Liquid Big Bloom",
    0,
    1,
    2
),
(
    "Liquid Grow Big",
    3,
    2,
    6
),
(
    "Liquid Tiger's Blood",
    2,
    8,
    4
);

INSERT INTO FertilizerDetails (
    fertilizerID,
    growthsID,
    productionsID
)
VALUES
(
    (SELECT fertilizerID FROM Fertilizers WHERE fertilizerType = "Liquid Grow Big"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato") )
),
(
    (SELECT fertilizerID FROM Fertilizers WHERE fertilizerType = "Liquid Tiger's Blood"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper") )
),
(
    (SELECT fertilizerID FROM Fertilizers WHERE fertilizerType = "Liquid Big Bloom"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash") )
);

INSERT INTO GrowingLocations (
    isGround,
    bedType
)
VALUES
(
    1,
    "Raised Bed"
),
(
    1,
    "Row"
),
(
    1,
    "Trellised Bed"
);

INSERT INTO GrowingLocations (
    isContainer,
    containerType
)
VALUES
(
    1,
    "Ceramic 3 Gallons"
),
(
    1,
    "Cloth 5 Gallons"
);

INSERT INTO LocationDetails (
    growingLocationsID,
    growthsID,
    productionsID
)
VALUES
(
    (SELECT locationID FROM GrowingLocations WHERE containerType = "Ceramic 3 Gallons"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Cherry Tomato") )
),
(
    (SELECT locationID FROM GrowingLocations WHERE containerType = "Cloth 5 Gallons"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "Chocolate Seven Pot Pepper") )
),
(
    (SELECT locationID FROM GrowingLocations WHERE bedType = "Raised Bed"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "HoneyNut Squash") )
),
(
    (SELECT locationID FROM GrowingLocations WHERE bedType = "Trellised Bed"),
    (SELECT growthID FROM Growths WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "English Cucumbers")),
    (SELECT productionID FROM Productions WHERE plantID = (SELECT plantID FROM Plants WHERE plantType = "English Cucumbers") )
);