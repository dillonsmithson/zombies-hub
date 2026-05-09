var step1Panel = document.getElementById("step1Panel");
var step2Panel = document.getElementById("step2Panel");
var step3Panel = document.getElementById("step3Panel");

var mNumberEntered      = -1;
var tvLowerBoundEneterd = -1;
var oNumberEntered      = -1;
var oNumberFinal        = -1;
var tvColor             = -1;
var ingredientIndex     = -1;
var acetaldehydeValueFinal = -1;
var glycerolValueFinal = -1;

var tvValueRange = [];
var possibleONumbers = [];

var oNumberTable = [2, 4, 5, 6, 8, 9, 11, 15];
var acceptableAcetaldehydeInput = [10, 15, 12, 8, 9];
var acceptableGlycerolInput = [14, 4, 11, 12, 18, 10, 13, 9];

const ingredientTable = new Map([
    ["Racing Fuel",                 [5, 6, 6, 6, 6, 8, 11, 13, 14, 14, 14, 16]],
    ["Insect Repellent",            [11, 9, 15, 7, 16, 12, 7, 14, 10, 15, 6, 3]],
    ["Vodka",                       [11, 12, 4, 4, 11, 6, 16, 9, 16, 11, 16, 11]],
    ["Baking Soda",                 [18, 10, 13, 12, 14, 10, 6, 16, 11, 13, 11, 8]],
    ["Detergent",                   [16, 14, 11, 8, 13, 13, 16, 10, 16, 8, 6, 9]],
    ["Food Coloring",               [15, 10, 16, 13, 17, 11, 12, 11, 12, 11, 6, 13]],
    ["Drain Opener",                [14, 9, 10, 14, 15, 11, 7, 9, 6, 8, 16, 13]],
    ["Quarters",                    [7, 10, 11, 12, 12, 13, 9, 9, 4, 5, 12, 8]],
    ["Glass Cleaner",               [7, 15, 7, 10, 10, 18, 8, 13, 13, 10, 16, 7]],
    ["Nail Polish Remover",         [5, 6, 9, 14, 9, 11, 17, 8, 9, 5, 9, 7]],
    ["Pennies",                     [14, 13, 17, 13, 5, 11, 14, 7, 8, 11, 7, 14]],
    ["Pool Cleaner",                [10, 14, 16, 7, 17, 16, 16, 3, 11, 15, 10, 16]],
    ["Plant Food",                  [11, 9, 10, 3, 13, 17, 13, 10, 13, 11, 7, 16]],
    ["Paint",                       [16, 12, 13, 4, 8, 10, 15, 5, 3, 7, 5, 8]],
    ["Vinegar",                     [6, 11, 18, 16, 10, 6, 11, 2, 7, 5, 6, 11]],
    ["Ice",                         [14, 10, 8, 9, 3, 13, 2, 7, 6, 10, 10, 13]],
    ["Bleach",                      [16, 13, 15, 13, 5, 11, 6, 7, 4, 10, 7, 10]],
    ["Powdered Milk",               [4, 8, 7, 12, 12, 8, 2, 10, 10, 15, 7, 10]],
    ["Fat",                         [8, 8, 10, 12, 12, 14, 12, 12, 15, 16, 10, 5]],
    ["Motor Oil",                   [7, 7, 11, 9, 14, 9, 9, 8, 11, 15, 9, 8]],
    ["Wheel Cleaner",               [11, 13, 6, 12, 13, 10, 13, 10, 8, 6, 13, 10]],
    ["Table Salt",                  [17, 16, 8, 12, 16, 8, 8, 8, 9, 7, 15, 7]],
    ["Acetaldehyde",                [10, 15, 12, 15, 9, 12, 12, 8, 12, 12, 8, 9]],
    ["Glycerol",                    [11, 14, 4, 11, 11, 12, 18, 10, 10, 13, 9, 9]],
    ["Methylbenzene",               [10, 15, 10, 17, 11, 10, 12, 10, 17, 7, 8, 12]],
    ["Nitrated Glycerol Solution",  [5, 7, 13, 11, 12, 13, 10, 8, 16, 9, 14, 13]],
    ["Mixed Acid Solution",         [12, 11, 14, 16, 12, 15, 16, 5, 13, 5, 8, 8]],
    ["Hexamine",                    [10, 8, 15, 11, 6, 5, 11, 6, 12, 14, 8, 8]],
    ["Phenolsulfonic Acid",         [12, 12, 17, 9, 4, 8, 10, 14, 15, 17, 13, 9]],
    ["Phenol",                      [17, 14, 13, 11, 7, 13, 11, 4, 8, 8, 10, 7]],
    ["Aldehyde Sludge",             [11, 8, 15, 4, 15, 11, 8, 18, 10, 11, 7, 12]],
    ["Formaldehyde",                [6, 12, 9, 9, 13, 12, 13, 11, 10, 13, 14, 11]],
    ["Dinitro",                     [12, 11, 13, 8, 13, 9, 9, 10, 12, 15, 7, 12]]    
]);

const acetaldehydeMap = new Map([
    [10,    [0]],
    [15,    [1, 3]],
    [12,    [2, 5, 6, 8, 9]],    
    [9,     [4, 11]],        
    [8,     [7, 10]]    
]);

const glycerolMap = new Map([
    [14,    [1]],
    [4,     [2]],
    [11,    [3, 4]],    
    [12,    [5]],
    [18,    [6]],
    [10,    [7,8]],    
    [13,    [9]],
    [9,     [10, 11]]
]);

const bombPropaneFormula = new Map([
    ["Formula 1", ["Vodka", "Pennies"]],
    ["Formula 2", ["Racing Fuel", "Quarters"]],
    ["Formula 3", ["Formaldehyde", "Acetaldehyde", "Detergent"]],
    ["Formula 4", ["Aldehyde Sludge", "Nail Polish Remover"]]
]);

const bombPhenolFormula = new Map([
    ["Formula 1", ["Motor Oil", "Insect Repellent", "Wheel Cleaner"]],
    ["Formula 2", ["Phenol", "Drain Opener"]],
    ["Formula 3", ["Phenolsulfonic Acid", "Detergent"]]
]);

const bombNitrobenzenFormula = new Map([
    ["Formula 1", ["Drain Opener", "Paint", "Detergent"]],
    ["Formula 2", ["Methylbenzene", "Baking Soda", "Vinegar", "Detergent"]],
    ["Formula 3", ["Dinitro", "Racing Fuel"]]
]);

const bombZokineFormula = new Map([
    ["Formula 1", ["Racing Fuel", "Quarters"]],
    ["Formula 2", ["Formaldehyde", "Glass Cleaner"]],
    ["Formula 3", ["Hexamine", "Vinegar", "Plant Food", "Detergent"]]   
]);

const bombNitriteFormula = new Map([
    ["Formula 1", ["Fat", "Vodka"]],
    ["Formula 2", ["Detergent", "Drain Opener", "Ice"]],
    ["Formula 3", ["Glycerol", "Mixed Acid Solution"]],
    ["Formula 4", ["Nitrated Glycerol Solution", "Baking Soda"]]
]);

const formulaTable = new Map([
    ["3,4 Di-Nitroxy-Methyl-Propane",           bombPropaneFormula],
    ["1,3,5 Tera-Nitra-Phenol",                 bombPhenolFormula],
    ["3-Methyl 2,4 Di-Nitrobenzene",            bombNitrobenzenFormula],
    ["Octa-Hydro 2,5 Nitro 3,4,7 Para-Zokine",  bombZokineFormula],
    ["2,4 Propane 3,5 Tetra-Nitrite",           bombNitriteFormula]
]);

function determineONumber() {
    resetData();

    var oNumberSection      = document.getElementById("ONumberField");
    var oNumberField        = document.getElementById("inputONumber");
    var mNumberField        = document.getElementById("inputMNumber");
    var tvLowerBoundField   = document.getElementById("inputTVLowerBound");

    var mNumberError        = document.getElementById("MNumberError");
    var tvNumberError       = document.getElementById("EyeNumberError");
    var oNumberError        = document.getElementById("ONumberError");

    var form1Submit         = document.getElementById("form1SubmitGroup");

    var step2ONumberDisplay = document.getElementById("ONumberDisplayed");
    var step2EyeColorDisplay = document.getElementById("EyeColorDisplayed");

    mNumberError.hidden     = true;
    tvNumberError.hidden    = true;
    oNumberError.hidden     = true;
    
    if (oNumberSection.checkVisibility()) {
        var oTemp = oNumberField.value;

        if (Number.isInteger(Number(oTemp)) && oTemp != "") {
            if (oNumberTable.includes(Number(oTemp))) {
                oNumberFinal = Number(oTemp);
            } else {
                oNumberError.hidden = false;                    
            }
        } else {            
            oNumberError.hidden = false;
        }
    }

    if (Number.isInteger(Number(mNumberField.value)) && mNumberField.value != "" && mNumberField.value != 0) {                
        mNumberEntered = Number(mNumberField.value);
    } else {        
        mNumberError.hidden = false;        
    }

    if (Number.isInteger(Number(tvLowerBoundField.value)) && tvLowerBoundField.value != "" && tvLowerBoundField != 0) {        
        tvLowerBoundEneterd = Number(tvLowerBoundField.value);
    } else {
        tvNumberError.hidden = false;
    }

    if (mNumberEntered != -1 && tvLowerBoundEneterd != -1) {
        tvValueRange = [tvLowerBoundEneterd-1, tvLowerBoundEneterd+1, tvLowerBoundEneterd+3];
        
        for (let i = 0; i < tvValueRange.length; i++) {
            if (tvValueRange[i] % mNumberEntered == 0){
                var oNum = tvValueRange[i] / mNumberEntered;
                if (oNumberTable.includes(oNum)) {
                    possibleONumbers.push(oNum);
                }      
            }
        }
    }
    
    if (possibleONumbers.length <= 0 && oNumberFinal == -1) {
        mNumberError.hidden = false;
        tvNumberError.hidden = false;
        return;
    }

    if (possibleONumbers.length > 1 && oNumberFinal == -1) {        
        oNumberSection.hidden = false;        
        return;
    }

    if (oNumberFinal != -1 && !possibleONumbers.includes(oNumberFinal)) {        
        oNumberError.hidden = false;
        return;
    }

    if (oNumberFinal == -1) {
        oNumberFinal = possibleONumbers[0];
    }
    
    switch(tvValueRange.indexOf(oNumberFinal * mNumberEntered)) {
        case 0: tvColor = "Top"; break;
        case 1: tvColor = "Middle"; break;
        case 2: tvColor = "Bottom"; break;
        default: tvColor = -1;
    }

    step1Panel.hidden = true;
    step2Panel.hidden = false;

    step2ONumberDisplay.innerHTML = "O Number = <b>" + oNumberFinal + "</b>";
    step2EyeColorDisplay.innerHTML = "Eye Color = <b>" + tvColor + " color on TV</b>";
}

function determineIngredientNumbers() {
    var glycerolSection = document.getElementById("glycerolSection");
    var glycerolInputField = document.getElementById("inputGlycerolNumber");
    var glycerolErrorField = document.getElementById("glycerolNumberError");

    var acetaldehydeErrorField = document.getElementById("acetaldehydeNumberError")
    var acetaldehydeInputField = document.getElementById("inputAcetaldehydeNumber");

    var noChemicalError = document.getElementById("noChemicalError");
    noChemicalError.hidden = true;

    var acetaldehydeInputValue = acetaldehydeInputField.value;
    if (!acceptableAcetaldehydeInput.includes(Number(acetaldehydeInputValue))){            
        acetaldehydeErrorField.hidden = false;
        return;
    } else {
        acetaldehydeErrorField.hidden = true;
        acetaldehydeValueFinal = Number(acetaldehydeInputValue);
    }
    
    if (acetaldehydeValueFinal == 10) {
        ingredientIndex = 0;
    } else {
        if(!glycerolSection.checkVisibility()) {
            glycerolSection.hidden = false;
            return;
        }
    }

    if (glycerolSection.checkVisibility()) {        
        var glycerolInputValue = glycerolInputField.value;
        if (!acceptableGlycerolInput.includes(Number(glycerolInputValue))) {
            glycerolErrorField.hidden = false;
            return;
        } else {
            glycerolErrorField.hidden = true;
            glycerolValueFinal = Number(glycerolInputValue);
        }

        var acetaldehydeIndexList = acetaldehydeMap.get(acetaldehydeValueFinal);
        var glycerolIndexList = glycerolMap.get(glycerolValueFinal);
        var possibleIndexes = [];

        for (let i = 0; i < acetaldehydeIndexList.length; i++) {
            for (let j = 0; j < glycerolIndexList.length; j++) {
                if (acetaldehydeIndexList[i] == glycerolIndexList[j]) {                    
                    possibleIndexes.push(acetaldehydeIndexList[i]);
                    break;
                }
            }
        }        

        if (possibleIndexes.length == 1) {
            ingredientIndex = possibleIndexes[0];
        } else {
            noChemicalError.hidden = false;
            return;
        }
    }

    step2Panel.hidden = true;
    step3Panel.hidden = false;
}

function getBombChemicalSolution() {
    var bombChemicalValue = document.getElementById("inputBombChemical").value;
    var bombChemicalError = document.getElementById("bombChemicalError");
    var bombSolutionBox = document.getElementById("bombSolutionBox");
    var bombChemicalFinal = "";

    // Make sure bomb chemical has a value and isn't using placeholder still
    if (bombChemicalValue == "Select One...") {
        bombChemicalError.hidden = false;
        return;
    } else {
        bombChemicalError.hidden = true;
        bombChemicalFinal = bombChemicalValue;
    }

    var bombChemicalMap = formulaTable.get(bombChemicalFinal);
    
    bombSolutionBox.innerHTML = "";

    bombSolutionBox.insertAdjacentHTML('beforeend', `<h4 class="card-title fw-bold">${bombChemicalFinal} Solution</h4>`); 
    bombSolutionBox.insertAdjacentHTML('beforeend', `<h6 class="card-subtitle fst-italic">Using O = ${oNumberFinal}</h6><hr>`);

    bombChemicalMap.forEach((value, key) => {
        var numberToPunchIn = -oNumberFinal;
        var formulaString = "";
        formulaString += `<p class="card-text fs-5"><b>${key}</b>  |  <i>`;

        value.forEach(ingredient => {
            var ingredientNumber = ingredientTable.get(ingredient)[ingredientIndex];
            numberToPunchIn += ingredientNumber;
            
            formulaString += `${ingredient} + `;            
        })

        formulaString = formulaString.slice(0, -2);
        formulaString += "</i> | "

        formulaString += `<span class="badge bg-dark fs-6">Number to Punch In: <b>${String(numberToPunchIn).padStart(2, '0')}</b></span><hr>`

        bombSolutionBox.insertAdjacentHTML('beforeend', formulaString);
    });
}

function resetData() {
    mNumberEntered = -1;
    tvLowerBoundEneterd = -1;
    oNumberEntered = -1;

    oNumberFinal = -1;
    tvColor = -1; 

    tvValueRange = [];
    possibleONumbers = [];
}

function resetForm1() {
    mNumberEntered = -1;
    tvLowerBoundEneterd = -1;
    oNumberEntered = -1;

    oNumberFinal = -1;
    tvColor = -1; 

    tvValueRange = [];
    possibleONumbers = [];

    var oNumberSection      = document.getElementById("ONumberField");
    var oNumberField        = document.getElementById("inputONumber");
    var mNumberField        = document.getElementById("inputMNumber");
    var tvLowerBoundField   = document.getElementById("inputTVLowerBound");

    var mNumberError        = document.getElementById("MNumberError");
    var tvNumberError       = document.getElementById("EyeNumberError");
    var oNumberError        = document.getElementById("ONumberError");

    oNumberError.hidden = true;
    tvNumberError.hidden = true;
    mNumberError.hidden = true;
    oNumberSection.hidden = true;

    oNumberField.value = "";
    mNumberField.value = "";
    tvLowerBoundField.value = "";
}

function resetForm3() {
    var bombChemicalField = document.getElementById("inputBombChemical");
    var bombChemicalError = document.getElementById("bombChemicalError");
    var bombSolutionBox = document.getElementById("bombSolutionBox");

    bombChemicalField.selectedIndex = 0;
    bombChemicalError.hidden = true;
    bombSolutionBox.innerHTML = "";
}

function resetForm2() {
    var glycerolSection = document.getElementById("glycerolSection");
    var glycerolInputField = document.getElementById("inputGlycerolNumber");
    var glycerolErrorField = document.getElementById("glycerolNumberError");

    var acetaldehydeErrorField = document.getElementById("acetaldehydeNumberError")
    var acetaldehydeInputField = document.getElementById("inputAcetaldehydeNumber");

    var noChemicalError = document.getElementById("noChemicalError");

    glycerolSection.hidden = true;
    glycerolInputField.value = "";
    glycerolErrorField.hidden = true;

    acetaldehydeInputField.value = "";
    acetaldehydeErrorField.hidden = true;

    noChemicalError.hidden = true;

    acetaldehydeValueFinal = -1;
    glycerolValueFinal = -1;
}

function resetAll() {
    resetForm1();
    resetForm2();
    resetForm3();

    step1Panel.hidden = false;
    step2Panel.hidden = true;
    step3Panel.hidden = true;
}