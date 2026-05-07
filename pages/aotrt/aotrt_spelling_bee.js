var wordList = [
    "aldehydes",
    "allomer",
    "benzene",
    "chlorination",
    "ethers",
    "ethyl",
    "hydrogenation",
    "neutrino",
    "nitriles",
    "oxidation",
    "reduction",
    "solvoysis",
    "sublimation",
    "zwitterion"
];
var letters = ["A", "A", "A", "A"];
var currentlySetWord = -1;
var offset_list = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
solution_list = [];


function moused(id){
    if(document.getElementById(id).className != "selected") {
        var letter = document.getElementById(id).alt;
        document.getElementById(id).src = "../../imgs/cipher_symbols_sb/blue/Symbol" + letter + ".png";
    }
}

function unmoused(id) {
    if(document.getElementById(id).className != "selected") {
        var letter = document.getElementById(id).alt;
        document.getElementById(id).src = "../../imgs/cipher_symbols_sb/black/Symbol" + letter + ".png";
    }
}

function setLetter(pos, letter) {    
    changeSymbolColor(document.getElementById("" + pos + letters[pos-1].toLowerCase()), letters[pos-1], "black", false);
    letters[pos-1] = letter.toUpperCase();
    changeSymbolColor(document.getElementById("" + pos + letter), letter.toUpperCase(), "red", true);

    if (currentlySetWord != 1) {
        solveCipher();
    }
}

function setWord(word) {
    if (currentlySetWord == -1) {
        currentlySetWord = word;

        var element = document.getElementById(currentlySetWord);
        changeWordStyle(element, true);
    } else {
        var previousElement = document.getElementById(currentlySetWord);
        currentlySetWord = word;
        var newElement = document.getElementById(currentlySetWord);

        changeWordStyle(previousElement, false);
        changeWordStyle(newElement, true);
    }

    solveCipher();
}

function solveCipher() {
    var wordSelected = wordList[currentlySetWord];    
    
    if (solution_list.length != 0) {
        solution_list = [];
    }

    // How to read offset table
    // [Distance from Slappy Taffy (left side)]  [Position in Cipher]
    calculateOffsetTable();

    for (const letter in wordSelected) {        
        var letterNum = convertLetterToNum(wordSelected[letter]);        
        
        var single_combo = check1Combos(letterNum);
        if (single_combo.length != 0) {
            solution_list.push(single_combo);
            continue;
        }

        var two_combo = check2Combos(letterNum);
        if (two_combo.length != 0) {
            solution_list.push(two_combo);
            continue;
        }

        var three_combo = check3Combos(letterNum);
        if (three_combo.length != 0) {
            solution_list.push(three_combo);
            continue;
        }

        var four_combo = check4Combos(letterNum);
        if (four_combo.length != 0) {
            solution_list.push(four_combo);
            continue;
        }

        solution_list.push([-1]); // that ain't a proper letter S T U P I D.
    }

    displaySolution();    
}

function displaySolution() {
    var positionCount = 1;
    
    for (let i = 1; i < 65; i++) {
        var element = document.getElementById("s" + i.toString());

        element.src = "../../imgs/symbol_blank_space.png";
        element.alt = "";
    }

    if (solution_list.length != 0){
        positionCount = 1;

        for(let i = 0; i < solution_list.length; i++) {
            for (let j = 0; j < solution_list[i].length; j++) {
                var currentSolutionElement = document.getElementById("s" + positionCount);
                                
                if (solution_list[i][j] == -1) {                    
                    currentSolutionElement.src = "../../imgs/Empty_Circle.png";
                    currentSolutionElement.alt = "Error";
                    positionCount++;
                    continue;
                }

                currentSolutionElement.src = "../../imgs/cipher_symbols_sb/black/Symbol" + letters[solution_list[i][j]] + ".png";
                currentSolutionElement.alt = letters[solution_list[i][j]];
                positionCount++;
            }
            
            document.getElementById("s" + positionCount).src = "../../imgs/dash.png";
            document.getElementById("s" + positionCount).alt = "Dash";
            positionCount++;
        }
    }

    if (positionCount > 1) {        
        document.getElementById("s" + (positionCount-1).toString()).src = "../../imgs/symbol_blank_space.png";
        document.getElementById("s" + (positionCount-1).toString()).alt = "";
    }
}

function check1Combos(letter) {        
    for (let i = 0; i < 4; i++) {                
        if (letter == offset_list[i][0]) {
            return [i];
        }
    }
    
    return [];
}

function check2Combos(letter) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {            
            var symbol1 = offset_list[i][0];
            var symbol2 = offset_list[j][1];
            var comboLetter = (symbol1 + symbol2) % 26;
            
            if (comboLetter == 0) { comboLetter = 26; }
            
            if (letter == comboLetter) {
                return[i, j];
            }
        }
    }
    
    return [];
}

function check3Combos(letter) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                var symbol1 = offset_list[i][0];
                var symbol2 = offset_list[j][1];
                var symbol3 = offset_list[k][2];
                var comboLetter = (symbol1 + symbol2 + symbol3) % 26;
                
                if (comboLetter == 0) { comboLetter = 26; }
                
                if (letter == comboLetter) {
                    return [i, j, k];
                }
            }
        }
    }

    return [];
}

// Ideally, it don't get here, but this is about to be goofy looking
function check4Combos(letter) {    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                for (let l = 0; l < 4; l++) {
                    var symbol1 = offset_list[i][0];
                    var symbol2 = offset_list[j][1];
                    var symbol3 = offset_list[k][2];
                    var symbol4 = offset_list[l][3];
                    var comboLetter = (symbol1 + symbol2 + symbol3 + symbol4) % 26;
                    
                    if (comboLetter == 0) { comboLetter = 26; }
                    
                    if (letter == comboLetter) {
                        return [i, j, k, l];
                    }
                }                
            }      
        }
    }
    return [];
}

function setSolutionSquare(elementID, type, letter) {
    var element = document.getElementById(elementID)
    
    switch (type) {
        case "Letter":
            element.src = "../../imgs/cipher_symbols_sb/black/Symbol" + letter + ".png";
            element.alt = letter;
            break;
        case "Empty":
            element.src = "../../imgs/Empty_Circle.png";
            element.alt = "Error";
            break;
        case "Dash":
            element.src = "../../imgs/dash.png";
            element.alt = "Dash";
            break;
    }
}

function changeWordStyle(element, isSelected) {
    if (isSelected) {
        element.style.color = "red";
        element.style.fontWeight = "bold";
        element.style.className = "selected";
    } else {
        element.style.color = "black";
        element.style.fontWeight = "400";
        element.style.className = "";
    }
}

function calculateOffsetTable() {
    var offset = 3;

    letters.forEach((letter, index) => {
        var letterAsNumber = convertLetterToNum(letter);
        var currentOffsetCount = 0;

        for (let i = 0; i < 4; i++) {            
            if (i == 0) {
                currentOffsetCount = letterAsNumber;                
            } else {
                currentOffsetCount = currentOffsetCount + (offset * (index + 1));
            }

            offset_list[index][i] = currentOffsetCount;
        }
    });
}

function changeSymbolColor(element, letter, color, isSelected) {
    element.src = "../../imgs/cipher_symbols_sb/" + color + "/Symbol" + letter + ".png";

    if (isSelected) {
        element.alt = letter.toUpperCase() + "-Selected";
        element.className = "selected";
    } else {
        element.alt = letter;
        element.className = "";
    }
}

function convertLetterToNum(letter) {    
    var letterAsASCII = letter.charCodeAt(0);    

    if (letterAsASCII >= 65 && letterAsASCII <=90) {
        return letterAsASCII - 64;
    } else if (letterAsASCII >= 97 && letterAsASCII <= 122) {
        return letterAsASCII - 96;
    } else {
        return -1; // that ain't a letter stupid.
    }
}