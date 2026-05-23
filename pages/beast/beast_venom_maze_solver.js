const canvas = document.getElementById("venom-solver-canvas");

canvas.width = 370;
canvas.height = 370;
canvas.style.left = '10px';
canvas.style.top = '10px';

const ctx = canvas.getContext("2d");

const venom_starting_midpoint = 31;
const venom_midpoint_offset = 62;

const pathways = [
    {
        "start_point" : [3, 4],
        "end_point" : [2, 1],
        "path_points" : [[3, 4], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [4, 1], [4, 2], [3, 2], [2, 2], [2, 1]]
    },
    {
        "start_point" : [3, 1],
        "end_point" : [1, 2],
        "path_points" : [[4, 1], [4, 2], [5, 2], [5, 3], [4, 3], [4, 4], [3, 4], [3, 5], [2, 5], [2, 4], [2, 3], [3, 3], [3, 2], [2, 2], [2, 1], [1, 1], [1, 2]]
    },
    {
        "start_point" : [0, 1],
        "end_point" : [5, 3],
        "path_points" : [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [2, 2], [2, 3], [3, 3], [4, 3], [5, 3]]
    },
    {
        "start_point" : [2, 0],
        "end_point" : [2, 3],
        "path_points" : [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5], [2, 4], [1, 4], [1, 3], [1, 2], [2, 2], [3, 2], [3, 3], [2, 3]]
    },
    {
        "start_point" : [4, 5],
        "end_point" : [3, 3],
        "path_points" : [[4, 5], [3, 5], [2, 5], [1, 5], [1, 4], [2, 4], [2, 3], [2, 2], [3, 2], [3, 3]]
    },
    {
        "start_point" : [1, 4],
        "end_point" : [5, 0],
        "path_points" : [[1, 4], [1, 3], [2, 3], [2, 4], [2, 5], [3, 5], [3, 4], [3, 3], [4, 3], [4, 4], [5, 4], [5, 3], [5, 2], [5, 1], [5, 0]]
    },
    {
        "start_point" : [4, 4],
        "end_point" : [2, 2],
        "path_points" : [[4, 4], [4, 3], [5, 3], [5, 2], [5, 1], [5, 0], [4, 0], [3, 0], [2, 0], [2, 1], [2, 2]]
    },
    {
        "start_point" : [3, 2],
        "end_point" : [4, 1],
        "path_points" : [[3, 2], [3, 3], [2, 3], [2, 2], [2, 1], [1, 1], [1, 2], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1]]
    },
    {
        "start_point" : [1, 2],
        "end_point" : [4, 4],
        "path_points" : [[1, 2], [0, 2], [0, 1], [0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [4, 3], [5, 3], [5, 4], [5, 5], [4, 5], [4, 4]]
    },
    {
        "start_point" : [1, 2],
        "end_point" : [5, 3],
        "path_points" : [[1, 2], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [1, 4], [1, 3], [2, 3], [2, 2], [3, 2], [3, 3], [4, 3], [4, 4], [5, 4], [5, 3]]
    },
    {
        "start_point" : [0, 5],
        "end_point" : [3, 4],
        "path_points" : [[0, 5], [0, 4], [1, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [4, 1], [4, 2], [4, 3], [3, 3], [3, 4]]
    },
    {
        "start_point" : [0, 4],
        "end_point" : [4, 2],
        "path_points" : [[0, 4], [0, 5], [1, 5], [1, 4], [1, 3], [0, 3], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [4, 2]]
    },
    {
        "start_point" : [3, 1],
        "end_point" : [0, 4],
        "path_points" : [[3, 1], [2, 1], [1, 1], [1, 2], [2, 2], [2, 3], [1, 3], [1, 4], [2, 4], [2, 5], [1, 5], [0, 5], [0, 4]]
    },
    {
        "start_point" : [1, 1],
        "end_point" : [4, 3],
        "path_points" : [[1, 1], [2, 1], [2, 2], [3, 2], [3, 1], [4, 1], [4, 2], [5, 2], [5, 3], [5, 4], [5, 5], [4, 5], [4, 4], [4, 3]]
    },
    {    
        "start_point" : [0, 5],
        "end_point" : [4, 0],
        "path_points" : [[0, 5], [0, 4], [1, 4], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1], [2, 1], [2, 2], [2, 3], [3, 3], [4, 3], [4, 2], [4, 1], [4, 0]]
    }
]

var currentlySelectedPiece = -1;

var errorMessagePanel = document.getElementById("venom-error-panel");
var errorMessageElement = document.getElementById("venom-maze-error");

var startPieceButtonElement = document.getElementById("start_piece_select");
var endPieceButtonElement = document.getElementById("end_piece_select");

var startPieceCurrent = [-1, -1];
var endPieceCurrent = [-1, -1];


const path_object = JSON.parse(JSON.stringify(pathways));


function drawSolution(start, end, path) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.moveTo(
        (venom_starting_midpoint + ((start[1]) * venom_midpoint_offset)), 
        (venom_starting_midpoint + ((start[0]) * venom_midpoint_offset))
    );

    for (let i = 0; i < path.length; i++) {
        var x = venom_starting_midpoint + ((path[i][1]) * venom_midpoint_offset);
        var y = venom_starting_midpoint + ((path[i][0]) * venom_midpoint_offset);

        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;

    ctx.stroke();
}

function setCurrentPiece(piece) {
    currentlySelectedPiece = piece;
    switch(piece) {
        case 0:
            startPieceButtonElement.style.border = "4px solid lime";
            endPieceButtonElement.style.border = "none";
            break;
        case 1:
            startPieceButtonElement.style.border = "none";
            endPieceButtonElement.style.border = "4px solid lime";
            break;
        default:
            startPieceButtonElement.style.border = "none";
            endPieceButtonElement.style.border = "none";
            break;
    }
}

function setPiece(row, col) {
    var gridElement = document.getElementById(`${row}${col}`);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch(currentlySelectedPiece) {        
        case 0:
            if (!startPieceCurrent.includes(-1)) {
                clearPreviousPiece(startPieceCurrent);
            }

            if(gridElement.innerHTML !== ''){                
                clearPreviousPiece([row, col]);
                endPieceCurrent = [-1, -1];
            }

            gridElement.insertAdjacentHTML(
                "beforeend", 
                '<img src="../../imgs/venom_upgrade/start_square.png" class="venom-piece">'
            );

            startPieceCurrent = [row, col];
            break;
        case 1:
            if (!endPieceCurrent.includes(-1)) {
                clearPreviousPiece(endPieceCurrent);
            }

            if(gridElement.innerHTML !== ''){                
                clearPreviousPiece([row, col]);
                startPieceCurrent = [-1, -1];
            }

            gridElement.insertAdjacentHTML(
                "beforeend", 
                '<img src="../../imgs/venom_upgrade/ending_diamond.png" class="venom-piece">'
            );

            endPieceCurrent = [row, col];
            break;
        default:
            displayError(1);
            return;            
    }

    errorMessagePanel.hidden = true;

    var path = -1;

    if (!startPieceCurrent.includes(-1) && !endPieceCurrent.includes(-1)) {
        path = determineSolution();

        if (path == -1) {
            displayError(2);
            return;
        }

        drawSolution(startPieceCurrent, endPieceCurrent, path);
    }    
}

function determineSolution() {
    var path_selected = -1;

    for(let i = 0; i < path_object.length; i++) {
        var pathStart = path_object[i].start_point;
        var pathEnd = path_object[i].end_point;

        if (arraysEqual(pathStart, startPieceCurrent) && arraysEqual(pathEnd, endPieceCurrent)) {
            console.log("Solution found: Path | " + path_object[i].path_points);
            path_selected = path_object[i].path_points;
            break;
        }
    }

    return path_selected;
}

function displayError(error){
    switch (error) {
        case 1:
            errorMessageElement.innerHTML = '<b>Error:</b> You need to select a piece';
            errorMessagePanel.hidden = false;
            break;
        case 2:
            errorMessageElement.innerHTML = "<b>Error:</b> The Start and End pieces do not generate a solution. Please check to ensure you've placed them in the correct spots";
            errorMessagePanel.hidden = false;
            break;
        default:
            break;
    }
}

function clearPreviousPiece(piece){
    var gridElement = document.getElementById(`${piece[0]}${piece[1]}`);

    gridElement.innerHTML = '';
}

const arraysEqual = (a, b) => 
  a.length === b.length && a.every((val, index) => val === b[index]);
