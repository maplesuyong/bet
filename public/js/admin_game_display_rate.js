"use strict";
function updateDisplayRateOriginal(str){
    if(str == "축구"){
        document.getElementById("football").style.display = "";
        document.getElementById("football_handy").style.display = "";
        document.getElementById("homeRate_original_football").removeAttribute("disabled");
        document.getElementById("drawRate_original_football").removeAttribute("disabled");
        document.getElementById("awayRate_original_football").removeAttribute("disabled");
        document.getElementById("homeRate_handy_football").removeAttribute("disabled");
        document.getElementById("drawRate_handy_football").removeAttribute("disabled");
        document.getElementById("awayRate_handy_football").removeAttribute("disabled");  
        document.getElementById("nofootball").style.display = "none";
        document.getElementById("nofootball_handy").style.display = "none";
        document.getElementById("homeRate_original_nofootball").setAttribute("disabled","disabled");
        document.getElementById("awayRate_original_nofootball").setAttribute("disabled","disabled");
        document.getElementById("homeRate_handy_nofootball").setAttribute("disabled","disabled");
        document.getElementById("awayRate_handy_nofootball").setAttribute("disabled","disabled");
        
    } else {
        document.getElementById("nofootball").style.display = "";
        document.getElementById("nofootball_handy").style.display = "";
        document.getElementById("homeRate_original_nofootball").removeAttribute("disabled");
        document.getElementById("awayRate_original_nofootball").removeAttribute("disabled");
        document.getElementById("homeRate_handy_nofootball").removeAttribute("disabled");
        document.getElementById("awayRate_handy_nofootball").removeAttribute("disabled");
        document.getElementById("football").style.display = "none";
        document.getElementById("football_handy").style.display = "none";
        document.getElementById("homeRate_original_football").setAttribute("disabled","disabled");
        document.getElementById("drawRate_original_football").setAttribute("disabled","disabled");
        document.getElementById("awayRate_original_football").setAttribute("disabled","disabled");
        document.getElementById("homeRate_handy_football").setAttribute("disabled","disabled");
        document.getElementById("drawRate_handy_football").setAttribute("disabled","disabled");
        document.getElementById("awayRate_handy_football").setAttribute("disabled","disabled");
    }
}