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

    $("#trainTable").append(added); 
      trainCounter++; 

  },function(errorObject) {
    console.log("Errors handled: " + errorObject.code); 
  })