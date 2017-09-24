var database = firebase.database().ref();
var userEmail = document.getElementById('userEmail');
var password = document.getElementById('userPass');


document.getElementById('signin').addEventListener('submit',
    function submit(event) {
        event.preventDefault()
        var users = {
            Email: userEmail.value,
            Password: password.value
        }
        firebase.auth().signInWithEmailAndPassword(users.Email, users.Password).then(
                function(success) {
                    console.log(success.uid)
                    database.child('user/' + success.uid).once('value', function(snapshot) {
                        var convert = JSON.stringify(snapshot.val())
                        localStorage.setItem("loggedInUser", convert)
                        console.log(convert)
                        location = "dash/index.html"
                    })
                }
            )
            // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    })