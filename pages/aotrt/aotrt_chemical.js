// Chemical Step Shortcuts Explained

/**
 * How to quickly get the O Number
 * ================================
 * - Need the TTT number
 * - Need the Lower bound for the TV
 * 
 * - Since O x TTT = Eye Number, we can reverse engineer to O with just TTT and Eye
 * - Using the Lower Bound from the TV the range of numbers to test is as follows
 *      - [Lower Bound - 2] through [Lower Bound + 4]
 * - Then using the TTT number, go through each number in the range and % TTT. If its
 *   its = 0, then that eye number / TTT is your O number
 * 
 * - Edge Case where TTT = 1. If this is the case, there are some instances where multiple O
 *   numbers can be produced. If this is case, then the player will need to find the O number manually.  
 * 
 */

/**
 * How to quickly get the Chemical Heat & Pressure combinations
 * ============================================================
 * This is a bit more complicated and requires using an external source to compile the data. 
 * 
 * - Using the spreadsheet (https://drive.google.com/file/d/1PiTb2DKulBKywIdutWBUc32gJQw97rzG/view) there are multiple 
 *   groups (represented by letters). These groups are actually the set groups of heat & pressure combinations.
 *   Turns out, there's only 12 groups to choose from, so using one of the chemicals, we get the player to view the
 *   Chemical in their color, and based on the number given, this will determine the group we need to give the player.
 *  
 *   - Edge case: There's an edge case where the number given may appear in multiple groups for that chemical, in this
 *     case, we get the user to input the number for another chemical. This will further narrow it down giving us the
 *     group.
 * 
 * - At this point, we have the element heat & pressure combinations & O Number, which is all that's need to give the 
 *   user all of there chemical formulas. However, the last thing we'll need from the user is their chemical for the bomb.
 *   With that in hand, present the chemical formulas for the easter egg. 
 */