  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBqrUqR5c4pC1Kfp4TC8JjNvY2HXPDHshk",
    authDomain: "fir-tutorial-44e62.firebaseapp.com",
    databaseURL: "https://fir-tutorial-44e62.firebaseio.com",
    projectId: "fir-tutorial-44e62",
    storageBucket: "fir-tutorial-44e62.appspot.com",
    messagingSenderId: "1096238686346",
    appId: "1:1096238686346:web:e283e3c960b332a9fb0d73"
};
firebase.initializeApp(firebaseConfig);
var ref = firebase.database().ref('transactions');
//ref.on('value', showData);

function addData() {
  firebase.database().ref("transactions").push({
    transaction: document.getElementById("tran").value});
 // showData(firebase.database().ref("transactions"));
  let pending = document.getElementById('pending');
  ref.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
   // var key = childSnapshot.key;
    var childData = childSnapshot.val();              
    
    pending.innerHTML += childData.transaction + "<br>"
   // console.log(childData.transaction);
    });
  });
 // let pending = document.getElementById('pending');
  //var keys = Object.keys(data);

  //for (var i = 0; i<keys.length; i++) {
   // var k = keys[i];
   // pending.innerHTML += "\n" + data[k[i]].transaction + "\n";
 // }

}

function showData() {
  let pending = document.getElementById('pending');
  ref.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
   // var key = childSnapshot.key;
    var childData = childSnapshot.val();              
    
    pending.innerHTML += childData.transaction + "<br>"
   // console.log(childData.transaction);
    });
  });
}

function gotData() {
  d3.csv("fantasy_board.csv").then(function(data) {
    console.log(data[0]);

  let keys = Object.keys(data);
  let li = document.getElementById('score');
  //var myItem = document.createElement("li");
 

  for (let i = 0; i<keys.length - 1; i++) {
      
      li.innerHTML += (i+1) + "." + " " + data[keys[i]].Team_Name  + 
     ": " + data[keys[i]].Score + "<br/><br/>";
    //+ "\n" + data[keys[i]].orgname);
  }
  

  });
  
};

function trampsData() {
  d3.csv("AmirTramps.csv").then(function(data) {
    console.log(data[0]);

  let keys = Object.keys(data);
  let playerPts = document.getElementById('players_tramps');
  let fullList = document.getElementById('fullTramp');
  let player = document.getElementById('allTramp');
  
  
  //var myItem = document.createElement("li");
 

  for (let i = 0; i<3; i++) {
    if (data[keys[i]].Points > 0) {
      playerPts.innerHTML += "<br/>" + data[keys[i]].Player_Name  + 
      ": " + data[keys[i]].Points +"<br/>" + '<img style="width: 50%; height: 50%" src="' + data[keys[i]].Image + '" />';
    }


    
    //+ "\n" + data[keys[i]].orgname);
  }

  for (let i = 0; i<keys.length; i++) {
    if (data[keys[i]].Points > 0) {
      fullList.innerHTML +=  data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>";
    }
    player.innerHTML += data[keys[i]].Player_Name + ": " +
      data[keys[i]].Points + "<br/>";
    
  }
  

  });
};

function beggarData() {
  d3.csv("RingBeggars.csv").then(function(data) {
    console.log(data[0]);

  let keys = Object.keys(data);
  let playerPts = document.getElementById('players_beggars');
  let fullList = document.getElementById('fullBeggar');

  //var myItem = document.createElement("li");
 

  for (let i = 0; i<3; i++) {
    if (data[keys[i]].Points > 0) {
      playerPts.innerHTML += "<br/>" + data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>" + '<img style="width: 50%; height: 50%" src="' + data[keys[i]].Image + '" />';
    }
    
    //+ "\n" + data[keys[i]].orgname);
  }

  for (let i = 0; i<keys.length; i++) {
    if (data[keys[i]].Points > 0) {
      fullList.innerHTML += data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>";
    }
    
  }
  

  });
};

function slougieData() {
  d3.csv("SlougiePopNation.csv").then(function(data) {
    console.log(data[0]);

  let keys = Object.keys(data);
  let playerPts = document.getElementById('players_slougie');
  let fullList = document.getElementById('fullSlougie');

  //var myItem = document.createElement("li");
 

  for (let i = 0; i<3; i++) {
    if (data[keys[i]].Points > 0) {
      playerPts.innerHTML += "<br/>" + data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>" + '<img style="width: 50%; height: 50%" src="' + data[keys[i]].Image + '" />';
    }
    
    //+ "\n" + data[keys[i]].orgname);
  }

  for (let i = 0; i<keys.length; i++) {
    if (data[keys[i]].Points > 0) {
      fullList.innerHTML += data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>";
    }
    
  }
  

  });
};

function sqData() {
  d3.csv("TheSquirters.csv").then(function(data) {
    console.log(data[0]);

  let keys = Object.keys(data);
  let playerPts = document.getElementById('players_sq');
  let fullList = document.getElementById('fullSq');
  //var myItem = document.createElement("li");
 

  for (let i = 0; i<3; i++) {
    if (data[keys[i]].Points > 0) {
      playerPts.innerHTML += "<br/>" + data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>" + '<img style="width: 50%; height: 50%" src="' + data[keys[i]].Image + '" />';
    }
    
    //+ "\n" + data[keys[i]].orgname);
  }

  for (let i = 0; i<keys.length; i++) {
    if (data[keys[i]].Points > 0) {
      fullList.innerHTML += data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>";
    }
    
  }
  

  });
};

function vancouverData() {
  d3.csv("VancouverA's.csv").then(function(data) {
    console.log(data[0]);

  let keys = Object.keys(data);
  let playerPts = document.getElementById('players_van');
  let fullList = document.getElementById('fullVan');
  //var myItem = document.createElement("li");
 

  for (let i = 0; i<3; i++) {

      playerPts.innerHTML += "<br/>" + data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>" + '<img style="width: 50%; height: 50%" src="' + data[keys[i]].Image + '" />';
    
    //+ "\n" + data[keys[i]].orgname);
  }

  for (let i = 0; i<keys.length; i++) {
    if (data[keys[i]].Points > 0) {
      fullList.innerHTML += data[keys[i]].Player_Name  + 
        ": " + data[keys[i]].Points + "<br/>";
    }

    
  }
  

  });
};


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showTramp() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function showBeggar() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

function showSlougie() {
  document.getElementById("myDropdown3").classList.toggle("show");
}

function showSquirters() {
  document.getElementById("myDropdown4").classList.toggle("show");
}

function showVancouver() {
  document.getElementById("myDropdown5").classList.toggle("show");
}


// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

async function getNBA() {
  const api_url = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`;
  const response = await fetch(api_url);
  const resultsFromServer = await response.json();
 // let time = document.getElementById("time");
  let homeTeam = document.getElementById("Home");
  let awayTeam = document.getElementById("Away");
 //let Score = document.getElementById("GameScore");

  // events\0\competitors\0\score   events\0\competitors\0\score game 1 of day
  //for (int i = 0; i <)
  for (var i = 0; i<resultsFromServer.events.length; i++) {
     // time.innerHTML +=  '<br>' + resultsFromServer.events[i].competitions[0].status.type.shortDetail + '<br><br><br>';
      for(var j = 0; j < 2; j++) {
          if (j== 0) {
            homeTeam.innerHTML += '<img style="width: 17%; height: 8%" src=' + "'" + resultsFromServer.events[i].competitions[0].competitors[0].team.logo + "'" + '</img>' + '<br>'
           // if (resultsFromServer.events[i].competitions[0].competitors[0].score > resultsFromServer.events[i].competitions[0].competitors[1].score) {
              homeTeam.innerHTML += '<b>' +resultsFromServer.events[i].competitions[0].competitors[0].team.abbreviation + ' - ' + resultsFromServer.events[i].competitions[0].competitors[0].score + '</b>'  + '<br><br>' ;
           // }
            //else if (resultsFromServer.events[i].competitions[0].competitors[0].score <= resultsFromServer.events[i].competitions[0].competitors[1].score) {
            //  homeTeam.innerHTML += resultsFromServer.events[i].competitions[0].competitors[0].team.abbreviation + ' - ' + resultsFromServer.events[i].competitions[0].competitors[0].score + '<br><br>';
          //  }
//homeTeam.innerHTML +=  resultsFromServer.events[i].competitions[0].status.type.shortDetail;
           // Score.innerHTML += resultsFromServer.events[i].competitions[0].competitors[0].score + " - " + " " + resultsFromServer.events[i].competitions[0].competitors[1].score + "<br>";
            
          }
          if (j == 1) {
          //  awayTeam.innerHTML += '<img style="width: 1%; height: 1%" src=' + "'" + resultsFromServer.events[i].competitions[0].competitors[1].team.logo + "'" + '</img>' + '<br>';
            awayTeam.innerHTML += '<img style="width: 17%; height: 8%" src=' + "'" + resultsFromServer.events[i].competitions[0].competitors[1].team.logo + "'" + '</img>' + '<br>'
           // if (resultsFromServer.events[i].competitions[0].competitors[1].score > resultsFromServer.events[i].competitions[0].competitors[0].score) {
              awayTeam.innerHTML += '<b>' +resultsFromServer.events[i].competitions[0].competitors[1].team.abbreviation + ' - ' + resultsFromServer.events[i].competitions[0].competitors[1].score + '</b>'  + '<br><br>' ;
            //}
            //else if(resultsFromServer.events[i].competitions[0].competitors[1].score <=  resultsFromServer.events[i].competitions[0].competitors[0].score){
             // awayTeam.innerHTML += resultsFromServer.events[i].competitions[0].competitors[1].team.abbreviation + ' - ' + resultsFromServer.events[i].competitions[0].competitors[1].score + '<br><br>';
            //}
       //   awayTeam.innerHTML += resultsFromServer.events[i].competitions[0].competitors[1].team.abbreviation + " - " + resultsFromServer.events[i].competitions[0].competitors[1].score  + '<br><br>' ;
          }

          
         // console.log(resultsFromServer.events[i].competitions[0].competitors[0].team.logo );
         // console.log(resultsFromServer.events[i].competitions[0].competitors[j].team.abbreviation);
         // console.log(resultsFromServer.events[i].competitions[0].competitors[j].score);
         // if (j == 0) {
          //    console.log("  VS  ")
         // }
      }
      if (i == resultsFromServer.events.length -1) {
        time.innerHTML +=  '<br>' + resultsFromServer.events[i].competitions[0].status.type.shortDetail
      }
      else {
        time.innerHTML +=  '<br>' + resultsFromServer.events[i].competitions[0].status.type.shortDetail + '<br><br><br>';
      }

     // homeTeam.innerHTML+= '<hr>';
      //awayTeam.innerHTML+= '<hr>';
   //  console.log(resultsFromServer.events[i ].competitions[0].status.type.shortDetail);
  }
}


/* 

*/

getNBA();


gotData();
trampsData();
beggarData();
slougieData();
sqData();
vancouverData();
showData();

