var currentSquareSelected = [1, 1];
var solutionLists = [
    '15863724', '16837425', '17468253', '17582463', '24683175',
    '25713864', '25741863', '26174835', '26831475', '27368514',
    '27581463', '28613574', '31758246', '35281746', '35286471',
    '35714286', '35841726', '36258174', '36271485', '36275184',
    '36418572', '36428571', '36814752', '36815724', '36824175',
    '37285146', '37286415', '38471625', '41582736', '41586372',
    '42586137', '42736815', '42736851', '42751863', '42857136',
    '42861357', '46152837', '46827135', '46831752', '47185263',
    '47382516', '47526138', '47531682', '48136275', '48157263',
    '48531726', '51468273', '51842736', '51863724', '52468317',
    '52473861', '52617483', '52814736', '53168247', '53172864',
    '53847162', '57138642', '57142863', '57248136', '57263148',
    '57263184', '57413862', '58413627', '58417263', '61528374',
    '62713584', '62714853', '63175824', '63184275', '63185247',
    '63571428', '63581427', '63724815', '63728514', '63741825',
    '64158273', '64285713', '64713528', '64718253', '68241753',
    '71386425', '72418536', '72631485', '73168524', '73825164',
    '74258136', '74286135', '75316824', '82417536', '82531746',
    '83162574', '84136275'
];
var isSolutionCurrentlyShowing = false;
var chessSquareSize = 75;


function chooseStarting(row, column) {
    if(isSolutionCurrentlyShowing) {
        clearDisplay();
    }

    var currentSquareElement = document.getElementById(`${currentSquareSelected[0]}${currentSquareSelected[1]}`);
    var newSquareElement = document.getElementById(`${row}${column}`);

    currentSquareElement.innerHTML = '';
    newSquareElement.innerHTML = '<img src="../../imgs/queen_piece.png" class="img-fluid">';    

    currentSquareSelected[0] = row;
    currentSquareSelected[1] = column;    
}

function solve8Queens() {    
    var selectedRow = currentSquareSelected[0];
    var selectedColumnIndex = currentSquareSelected[1] - 1;
    var matchedSolutionIndex = getSolutionIndex(selectedColumnIndex, selectedRow);

    if (matchedSolutionIndex != -1) {        
        displaySolution(solutionLists[matchedSolutionIndex]);
        isSolutionCurrentlyShowing = true;
    }
}

function getSolutionIndex(columnIndex, rowToFind) {
    for (let i = 0; i < solutionLists.length; i++) {        
        if (solutionLists[i][columnIndex] == rowToFind) {
            return i;
        }
    }

    return -1;
}

function displaySolution(solutionString) {    
    for (let i = 0; i < solutionString.length; i++) {
        var column = i+1;
        var row = solutionString[i];
        var solutionElement = document.getElementById(`${row}${column}`);

        solutionElement.innerHTML = '<img src="../../imgs/queen_piece.png" class="img-fluid">';
    }
}

function resetDisplay() {
    clearDisplay();
    currentSquareSelected = [1, 1];
    document.getElementById('11').innerHTML = '<img src="../../imgs/queen_piece.png" class="img-fluid">';
}

function clearDisplay() {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            var solutionElement = document.getElementById(`${i}${j}`);
            solutionElement.innerHTML = '';
        }
    }

    isSolutionCurrentlyShowing = false;
}

function changeBoardSize(upOrDown) {
    switch(upOrDown) {
        case 0: // Increase size (up to 75)
            if (chessSquareSize < 75) {
                chessSquareSize += 10;
                setBoardSize(chessSquareSize);
            }
            break;
        case 1: // decrease size (down to 45)
            if (chessSquareSize > 35) {
                chessSquareSize -= 10;
                setBoardSize(chessSquareSize);
            }
            break;
        default:
            break;
    }
}

function setBoardSize(size) {
    for(let i = 1; i <= 8; i++) {
        for(let j = 1; j <= 8; j++) {
            var currentElement = document.getElementById(`${i}${j}`);

            currentElement.style.width = `${chessSquareSize}px`;
            currentElement.style.height = `${chessSquareSize}px`;
        }
    }
}