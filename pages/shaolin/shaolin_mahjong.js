var mahjongTileImgPath = "../../imgs/mahjong_tiles/";
var mahjongEmptyTileImg = "../../imgs/mahjong_tiles/blank_tile.png";

var mahjongTileSelectorSection = document.getElementById("MahjongTileSelect");
var mahjongTilesSelectedSection = document.getElementById("MahjongSelected");
var mahjongSolutionDisplay = document.getElementById("MahjongSolution");

var selectedTiles = [];

function addTile(id) {        
    if (selectedTiles.length < 14) {
        selectedTiles.push(id);        
    }

    displaySelectedTiles();

    if (selectedTiles.length == 14) {
        getMahjongSolution();
    }
}

function removeTile(id, index) {    
    selectedTiles.splice(index, 1);    
    displaySelectedTiles();
}


function displaySelectedTiles() {
    for(let i = 1; i <= 14; i++) {
        var selectedElement = document.getElementById("selected_tile_" + i);
        
        if (i-1 in selectedTiles){            
            selectedElement.src = mahjongTileImgPath + selectedTiles[i-1] + ".png";
            selectedElement.alt = selectedTiles[i-1] + "Selected";
        } else {
            selectedElement.src = mahjongEmptyTileImg;
            selectedElement.alt = "emptyTileSelected";
        }
    }
}

function getMahjongSolution() {    
    var tileCounts = getTileCounts();    

    var streaks = getNumberOfPossibleStreaks(tileCounts);
    var triplets = getNumberOfPossibleTriplets(tileCounts);

    var possibleMelds = [...triplets, ...streaks];
    var allMeldCombinations = getAllMeldCombinations(possibleMelds);    

    var solution = determineSolution(allMeldCombinations, tileCounts);    
    displaySolution(solution); 
}

function determineSolution(meldCombos, tileCounts) {

    var isMeldValid = true;
    var solution = [];    

    for (let i = 0; i < meldCombos.length; i++) {        
        var tileCountCopy = Array.from(tileCounts);    
        isMeldValid = true;        

        if (meldCombos[i].length > 0) {   
            for (let j = 0; j < meldCombos[i].length; j++) {
                var meld = meldCombos[i][j];

                for (let k = 0; k < meld.length; k++) {
                    tileCountCopy = decrementTileCounter(meld[k], tileCountCopy);
                }                            

                if(!areTileCountsValid(tileCountCopy)) {                    
                    isMeldValid = false;                    
                    continue;
                }                
            }
        }
        

        if (isMeldValid) {                                    
            for (let j = 0; j < tileCountCopy.length; j++) {
                if(tileCountCopy[j] == 2) {                                        
                    solution.push(...meldCombos[i], '' + (j+1) + (j+1) + '');
                    break;
                }                
            }
        }

        if (solution.length > 0) {
            break;
        }
    }

    return solution;    
}

function displaySolution(solution) {
    if (solution.length > 1) {        
        mahjongTileSelectorSection.hidden = true;
        mahjongTilesSelectedSection.hidden = true;
        mahjongSolutionDisplay.hidden = false;

        var solutionTileCount = 1;

        // fill the display
        for(let i = 0; i < solution.length; i++) {            
            for (let j = 0; j < solution[i].length; j++) {                   
                var solutionElement = document.getElementById(`solution_tile_${solutionTileCount}`);
                solutionElement.src = `${mahjongTileImgPath}${solution[i][j]}_tile.png`;
                solutionElement.alt = `solutionTile${solutionTileCount}_${solution[i][j]}Tile`;

                solutionTileCount++;
            }
        }
    }
}

function areTileCountsValid(tileCounts) {
    for (let i = 0; i < tileCounts.length; i++) {
        if (tileCounts[i] < 0) {
            return false;
        }
    }

    return true;
}

function decrementTileCounter(tile, tileCounts) {
    switch(tile) {
        case '1':
            tileCounts[0]--;
            break;
        case '2':
            tileCounts[1]--;
            break;
        case '3':
            tileCounts[2]--;
            break;
        case '4':
            tileCounts[3]--;
            break;
        case '5':
            tileCounts[4]--;
            break;
        default:
            break;
    }

    return tileCounts;
}

function getAllMeldCombinations(possibleMelds) {
    var results = [];

    function helper(start, currentCombo) {
        if (currentCombo.length === 4) {
            results.push([...currentCombo]);
            return;
        }

        for (let i = start; i < possibleMelds.length; i++) {
            currentCombo.push(possibleMelds[i]);
            helper(i + 1, currentCombo);
            currentCombo.pop();
        }
    }

    helper(0, []);
    
    return results;
}

function getTileCounts() {
    var tileCounts = [0, 0, 0, 0, 0];

    if (selectedTiles.length == 14) {
        for (let i = 0; i < selectedTiles.length; i++) {
            switch(selectedTiles[i]) {
                case "1_tile":
                    tileCounts[0] += 1;
                    break;
                case "2_tile":
                    tileCounts[1] += 1;
                    break;
                case "3_tile":
                    tileCounts[2] += 1;
                    break;
                case "4_tile":
                    tileCounts[3] += 1;
                    break;
                case "5_tile":
                    tileCounts[4] += 1;
                    break;
                default:
                    console.log("eh? eh. eh. Ehhhhhhhhh?");
                    break;
            }
        }
    }

    return tileCounts;
}

function getNumberOfPossibleStreaks(tileCount) {
    var possibleStreaks = [0, 0, 0];
    var streaks = [];

    var possible123Streaks = Math.min(tileCount[0], tileCount[1], tileCount[2]);
    var possible234Streaks = Math.min(tileCount[1], tileCount[2], tileCount[3]);
    var possible345Streaks = Math.min(tileCount[2], tileCount[3], tileCount[4]);

    if (possible123Streaks > 0) {
        possibleStreaks[0] = possible123Streaks;
    }

    if (possible234Streaks > 0) {
        possibleStreaks[1] = possible234Streaks;
    }

    if (possible345Streaks > 0) {
        possibleStreaks[2] = possible345Streaks;
    }

    for (let i = 0; i < possibleStreaks.length; i++) {
        switch(i) {
            case 0: 
                streaks.push(...Array(possibleStreaks[i]).fill("123"));
                break;
            case 1:
                streaks.push(...Array(possibleStreaks[i]).fill("234"));
                break;
            case 2:
                streaks.push(...Array(possibleStreaks[i]).fill("345"));
                break;
            default:
                break;
        }
    }

    return streaks;
}

function getNumberOfPossibleTriplets(tileCount) {
    var possibleTriplets = [0, 0, 0, 0, 0];
    var triplets = [];

    for (let i = 0; i < tileCount.length; i++) {
        if(tileCount[i] >= 3) {
            possibleTriplets[i] = Math.trunc(tileCount[i] / 3); 
        }
    }

    for (let i = 0; i < possibleTriplets.length; i++) {
        switch(i) {
            case 0:
                triplets.push(...Array(possibleTriplets[i]).fill("111"));
                break;
            case 1:
                triplets.push(...Array(possibleTriplets[i]).fill("222"));
                break;
            case 2:
                triplets.push(...Array(possibleTriplets[i]).fill("333"));
                break;
            case 3:
                triplets.push(...Array(possibleTriplets[i]).fill("444"));
                break;
            case 4:
                triplets.push(...Array(possibleTriplets[i]).fill("555"));
                break;
            default:
                break;
        }
    }

    return triplets;
}

function mousedSelector(id){
    var element = document.getElementById(id);
        
    element.classList.remove('border-dark');
    element.classList.add('border-primary');    
}

function unmousedSelector(id) {
    var element = document.getElementById(id);
        
    element.classList.remove('border-primary');
    element.classList.add('border-dark');
}

function mousedSelected(id){
    var element = document.getElementById(id);
             
    element.classList.remove('border-secondary');
    element.classList.add('border-danger');    
}

function unmousedSelected(id) {
    var element = document.getElementById(id);
    
    element.classList.remove('border-danger');
    element.classList.add('border-secondary');
}

function resetTool() {    
    resetPanel('solution_tile_');
    resetPanel('selected_tile_');

    mahjongTileSelectorSection.hidden = false;
    mahjongTilesSelectedSection.hidden = false;
    mahjongSolutionDisplay.hidden = true;

    selectedTiles = [];
}

function resetPanel(elementBase) {    
    for (let i = 1; i <= 14; i++) {
        var element = document.getElementById(elementBase + `${i}`);

        element.src = mahjongEmptyTileImg;
        element.alt = "Empty Mahjong Tile";
    }
}