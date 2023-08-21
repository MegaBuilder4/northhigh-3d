// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3X9yVRpaBwD-c4rL532CJZPD1zSaLTfk",
    authDomain: "website-c755d.firebaseapp.com",
    databaseURL: "https://website-c755d-default-rtdb.firebaseio.com",
    projectId: "website-c755d",
    storageBucket: "website-c755d.appspot.com",
    messagingSenderId: "796711305208",
    appId: "1:796711305208:web:90b9529e5fb5732e3d600d",
    measurementId: "G-F138G136GV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// let's code 
var datab  = firebase.database().ref('data');
function UserRegister(){
var email = document.getElementById('eemail').value;
var password = document.getElementById('lpassword').value;
firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    
}).catch(function (error){
    var errorcode = error.code;
    var errormsg = error.message;
});
}
const auth = firebase.auth();
function SignIn(){
    var email = document.getElementById('eemail').value;
    var password = document.getElementById('lpassword').value;
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch( e => alert(e.msg));
    window.open("https://www.google.com","_self");
}
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var userInfo = datab.push();
    userInfo.set({
        name: getId('fname'),
        email : getId('eemail'),
        password : getId('lpassword')
    });
    alert("Successfully Signed Up");
    console.log("sent");
    document.getElementById('form').reset();
    window.location.replace('shop.html');
});
function  getId(id){
    return document.getElementById(id).value;
}