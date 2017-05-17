var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var currentUser;

$( document ).ready(function() {
	
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
		showWelcome();
	} else {
		$("#welcome").hide();
		$(".upload-group").hide();
		$("#login").show();
	//document.getElementById("upload").addEventListener('change', handleFileSelect, false);
	}
	});
	

});


function signOut(){
	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
	}, function(error) {
		console.error('Sign Out Error', error);
	});
	
}

function signIn() {
	  firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credntial.accessToken;
	  // The signed-in user info.
	  currentUser = result.user;
	  
		
	  showWelcome();
	 
		
	 
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
};

function writeUserData(uid, name, email, imageUrl,providerId,team) {
	firebase.database().ref('newusers/' + uid).set({
		name: name,
		email: email,
		photoUrl : imageUrl,
		providerId: providerId,
		team : team
  });
}
function writeUser(team) {
	firebase.database().ref('newusers/').set({
		team : team
  });
}


function showWelcome(){
	$("#login").hide();
	$("#welcome").show();
	//$("#welcomeText").html("Welcome "+ currentUser.displayName);
	
		var starCountRef = firebase.database().ref('users/' + currentUser.uid+'/name');
		starCountRef.on('value', function(snapshot) {
			$("#welcomeText").html("Welcome "+ snapshot.val());
			 
		});
		var starCountRef1 = firebase.database().ref('users/' + currentUser.uid+'/email');
		starCountRef1.on('value', function(snapshot) {
			$("#emailText").html("Email "+ snapshot.val());
			 
		});
		
		var starCountRef3 = firebase.database().ref('users/' + currentUser.uid+'/team');
		starCountRef3.on('value', function(snapshot) {
			$("#teamText").html("Team "+ snapshot.val());
			 
		});
		
		var starCountRef2 = database.ref('users/' + currentUser.uid + '/photoUrl');
		starCountRef2.on('value', function(snapshot) {
			$(".imageDoge").attr("src",snapshot.val());
		});
		
	
	
};


