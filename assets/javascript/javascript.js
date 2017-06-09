  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCL_2hwG50g-uX1-Cs8oE5Nt-tgEgc7qjo",
    authDomain: "train-scheduler-2-8fec7.firebaseapp.com",
    databaseURL: "https://train-scheduler-2-8fec7.firebaseio.com",
    projectId: "train-scheduler-2-8fec7",
    storageBucket: "train-scheduler-2-8fec7.appspot.com",
    messagingSenderId: "861945462700"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "00:00"
  var frequency = 0; 

  var trainCounter = 0; 
  $("#add-train").on("click", function(){

    event.preventDefault();

    trainName = $("#trainName-input").val().trim(); 
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim(); 

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

      database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot){
    
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().dateAdded); 

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("TIME CONVERTED: " + firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var timeRemaining = diffTime % frequency;
    console.log("TIME REMAINING " + timeRemaining);

    var minAway = frequency - timeRemaining;
    console.log("MINUTES TILL TRAIN: " + minAway);

    var nextTrain = moment().add(nextTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var added = $("<tr>"); 

    var nameTrain = $("<td>");
    nameTrain.text(trainName);
    added.append(nameTrain); 

    var nameDest = $("<td>");
    nameDest.text(destination); 
    added.append(nameDest);

    var trainFreq = $("<td>");
    trainFreq.text(frequency);
    added.append(trainFreq);

    var trainTime = $("<td>");
    trainTime.text(moment(nextTrain).format("HH:mm"));
    trainTime.text(nextTrain);
    added.append(trainTime);

    var awayMin = $("<td>");
    awayMin.text(minAway);
    added.append(awayMin);

    // var trainStorage = added.prop('outerHTML');
    // console.log(trainStorage);
    // database.setItem("data-train-" + trainCounter, trainStorage);

    // trainName = $("#trainName-input").val();
    // destination = $("#destination-input").val();
    // firstTrain = $("#firstTrain-input").val();
    // frequency = $("#frequency-input").val(); 

    $("#trainTable").append(added); 
      trainCounter++; 

    return false; 

  },function(errorObject) {
    console.log("Errors handled: " + errorObject.code); 
  })

//   $(document).ready(function() {

//     for(var i = 0; i < database.length; i++)
//     {
//         $('#trainTable').append(database.getItem("data-train-" + trainCounter));
//         trainCounter++;
//     }
// });

//-----------------------example----------------------------------------------------------------

//      var trainCounter = 0;
// $(document).on("click", '#addTrain', function() {

//     var nameGiven = $('#trainName').val().trim();
//     var placeGiven = $('#place').val().trim();
//     var timeGiven = $('#trainTime').val().trim();
//     var freqGiven = $('#freq').val().trim();
//     freqGiven = parseInt(freqGiven);

//     console.log("Name/Place/Time/Frequency: " + nameGiven + "|" + placeGiven + "|" + timeGiven + "|" + freqGiven);

//     var firstTimeConverted = moment(timeGiven, "HH:mm").subtract(1, "years");
//     console.log("TIME CONVERTED: " + firstTimeConverted);

//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     var timeRemaining = diffTime % freqGiven;
//     console.log(timeRemaining);

//     var minTilTrain = freqGiven - timeRemaining;
//     console.log("MINUTES TILL TRAIN: " + minTilTrain);

//     var nextTrain = moment().add(minTilTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

//     var row = $('<tr>');

//     var trainName = $('<td>');
//     trainName.text(nameGiven);
//     row.append(trainName);

//     var trainPlace = $('<td>');
//     trainPlace.text(placeGiven);
//     row.append(trainPlace);

//     var trainTime = $('<td>');
//     trainTime.text(moment(nextTrain).format("HH:mm"));
//     trainTime.text(nextTrain);
//     row.append(trainTime);

//     var trainFreq = $('<td>');
//     trainFreq.text(freqGiven);
//     row.append(trainFreq);

//     var minutesUntilNext = $('<td>');
//     minutesUntilNext.text(minTilTrain);
//     row.append(minutesUntilNext);

//     var trainLocalStorage = row.prop('outerHTML');
//     console.log(trainLocalStorage);
//     localStorage.setItem("data-train-" + trainCounter, trainLocalStorage);

//     nameGiven = $('#trainName').val("");
//     placeGiven = $('#place').val("");
//     timeGiven = $('#trainTime').val("");
//     freqGiven = $('#freq').val("");

//     $('#trainTable').append(trainLocalStorage);
//     trainCounter++;

//     return false;

// });

// $(document).ready(function() {

//     for(var i = 0; i < localStorage.length; i++)
//     {
//         $('#trainTable').append(localStorage.getItem("data-train-" + trainCounter));
//         trainCounter++;
//     }
// });