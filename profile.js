var database = firebase.database();
var currentUser;
google.charts.load('current', {packages: ['corechart', 'bar']});
//google.charts.setOnLoadCallback(drawBasic);
var sugValue;

$( document ).ready(function() {
	
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
		getSugarValue();
	} else {
			$("#sugarValue").html("Sign in First");
	}
	});

});



function getSugarValue(){
	var starCountRef = firebase.database().ref('data/sugar/' + currentUser.uid+'/sugarValue');
		starCountRef.on('value', function(snapshot) {
			$("#sugarValue").html("Your current sugar is "+ snapshot.val()+ " %");
			sugValue = snapshot.val();
			drawBasic();
		});
	
	
}

function drawBasic() {

      var data = google.visualization.arrayToDataTable([
        ['', 'Sugar %',],
        ['Your Value', sugValue],
        ['Normal Value', 10 ],
      ]);

      var options = {
       
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'Sugar'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }