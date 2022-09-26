if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");



var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
