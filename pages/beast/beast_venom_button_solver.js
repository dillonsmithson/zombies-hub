let numOfButtons = 3;

const min = 3;
const max = 6;

const valueDisplay = document.getElementById("counterValue");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");

updateCounter();

const buttonRows = [
    // [red, blue, yellow, black, white, green]
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0]
];

displaySolution(solveFusePuzzle());

function updateCounter() {
    valueDisplay.textContent = numOfButtons;

    decreaseBtn.disabled = numOfButtons <= min;
    increaseBtn.disabled = numOfButtons >= max;
}

decreaseBtn.addEventListener("click", () => {
    if (numOfButtons > min) {
        numOfButtons--;
        updateCounter();
        updateButtonRows();
    }
});

increaseBtn.addEventListener("click", () => {
    if (numOfButtons < max) {
        numOfButtons++;
        updateCounter();
        updateButtonRows();
    }
});

function selectButton(row, color) {
    var rowIndex = row - 1;
    var colorIndex = getColorAsIndex(color);

    var previousButtonIndex = buttonRows[rowIndex].indexOf(1);

    var previouslySelectedButton = document.getElementById(`row${row}${getIndexAsColor(previousButtonIndex)}`);
    var newButton = document.getElementById(`row${row}${color}`);

    previouslySelectedButton.classList.add('disabled');
    newButton.classList.remove('disabled');

    buttonRows[rowIndex][previousButtonIndex] = 0;
    buttonRows[rowIndex][colorIndex] = 1;

    // console.log(`Button Row ${row} | ${buttonRows[rowIndex]}`);    
    displaySolution(solveFusePuzzle());
}

function getColorAsIndex(color) {
    switch (color) {
        case 'red':
            return 0;
        case 'blue':
            return 1;
        case 'yellow':
            return 2;
        case 'black':
            return 3;
        case 'white':
            return 4
        case 'green':
            return 5
        default:
            return -1;
    }
}

function getIndexAsColor(index) {
    switch(index) {
        case 0:
            return 'red';
        case 1:
            return 'blue';
        case 2:
            return 'yellow';
        case 3:
            return 'black';
        case 4:
            return 'white';
        case 5:
            return 'green';
        default:
            return '';
    }
}

function updateButtonRows() {
    for (let i = 4; i <= 6; i++) {
        var element = document.getElementById(`fuse_row_${i}`);
        if (i <= numOfButtons) {        
            element.hidden = false;
        } else {
            element.hidden = true;
            selectButton(i, 'red');
        }
    }
}

// [red, blue, yellow, black, white, green]
function solveFusePuzzle() {    
    const X = numOfButtons;
    const S = getS();
    const W = getW();
    const bottomRow = buttonRows[numOfButtons-1];

    switch(X) {        
        case 3:
            // Case 1: No Black Buttons
            if (W[3] == 0) {                
                return "Push Button 3";
            }

            // Case 2: Bottom Button is Green
            if (bottomRow[5] == 1) { 
                return "Push Button 1";
            }

            // Case 3: More than 1 red
            if (W[0] >= 2) { 
                return "Push Bottom Red Button";
            }

            // Any other case
            return "Push Button 2";
        case 4:

            // Case 1: More than 1 yellow and S >= 2 
            if (W[2] >= 2 && S >= 2){
                return "Push Bottom Yellow Button";
            }
            
            // Case 2: Bottom Button is White and No Blue Button
            if (bottomRow[4] == 1 && W[1] == 0) {
                return "Push Button 1";
            }
                
            // Case 3: More than one black button
            if (W[3] > 1) {
                return "Push Button 4";
            }
                
            // Any other case
            return "Push Button 3";
        case 5:

            // Case 1: No Button count >= 3
            if (doesRangeExist(3, W)) {
                return "Push Button 1";
            }
            
            // Case 2: One White Button and More than 1 Blue Button
            if (W[4] > 1 && W[1] > 1) {
                return "Push Button 2";
            }
                
            // Case 3: No Red Button and W contains an even number and S < 4
            if (W[0] == 0 && checkEven(W) && S < 4) {
                return "Push Button 5";
            }
                
            // Any other case
            return "Push Button 1"
        case 6:

            // Case 1: Yellow Button exists
            if (W[2] >= 1) {
                return "Push Button 3";
            }
            
            // Case 2: Atleast one Black Button and More than One White Button
            if (W[3] >= 1 && W[4] >= 2) {
                return "Hit Button 4";
            }
            
            // Case 3: S >= 1 and More than 1 red button
            if (S >= 1 && W[0] > 1) {
                return "Hit Button 5";
            }

            // Any other case
            return "Hit Button 6";
        default:
            break;
    }
}

function displaySolution(solution) {
    var solutionElement = document.getElementById('fuse-solution-text');
    solutionElement.innerHTML = solution;
}

function getS() {
    var uniques = [0, 0, 0, 0, 0, 0];
    var S = 0;

    for (let i = 0; i < numOfButtons; i++) {
        var color = buttonRows[i].indexOf(1);

        if (uniques[color] == 0) {
            uniques[color] = 1;
            S++;
        }
    }

    return S;
}

function getW() {
    var buttonCounts = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < numOfButtons; i++) {
        var color = buttonRows[i].indexOf(1);
        buttonCounts[color]++;
    }

    return buttonCounts;
}

function doesRangeExist(lowerBound, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > lowerBound) {
            return true;
        }
    }

    return false;
}

function checkEven(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 0){
            return true;
        }
    }

    return false;
}