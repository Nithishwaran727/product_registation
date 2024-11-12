const userEmail = document.getElementById('userEmail');
const password = document.getElementById('userPassword');
const checkbox = document.getElementById("checkbox");
const EmailErr = document.getElementById('userEmailError');
const passwordErr = document.getElementById('passwordError');
const loginvalue = document.getElementById('loginvalue')
const Emailpatten = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passpattern = /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
let userdata;
let ispresent = false;
userEmail.value="";
password.value = "";
loginvalue.addEventListener("keydown",function(e){
    if(e.keyCode==13){
        checkuserExist()
    }
})

async function checkuserExist() {
    try {
        // Email validation
        if (userEmail.value === "" || userEmail.value == null) {
            EmailErr.innerHTML = 'Email is required';
            EmailErr.style.color = "red";
            userEmail.focus();
            ispresent = true;
        } else if (!Emailpatten.test(userEmail.value)) {
            EmailErr.innerHTML = 'Enter a valid Email';
            EmailErr.style.color = "red";
            userEmail.value = '';
            userEmail.focus();
            ispresent = true;
        } else {
            EmailErr.innerHTML = '';
            ispresent = false;
        }

        // Fetch existing users from API
        const response = await fetch(`https://6704f3c3031fd46a830e07d0.mockapi.io/user`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let data = await response.json();

        // Check if the user exists in the data
        userdata = data.find(user => user.Email == userEmail.value);
        console.log(userdata);
        if (userdata==undefined) {
            EmailErr.innerHTML = 'Incorrect email id';
            EmailErr.style.color = "red";
            ispresent = true;
        } else {
            EmailErr.innerHTML = '';
            ispresent = false;
        }

        // Password validation
        if (password.value === "" || password.value == null) {
            passwordErr.innerHTML = 'Password is required';
            passwordErr.style.color = "red";
            password.focus();
            ispresent = true;
        } else if (!password.value.match(passpattern)) {
            passwordErr.innerHTML = 'Invalid password format';
            passwordErr.style.color = "red";
            password.value = '';
            password.focus();
            ispresent = true;
        } else if (password.value !== userdata.password) {
            passwordErr.innerHTML = 'Incorrect password';
            passwordErr.style.color = "red";
            password.value = '';
            password.focus();
            ispresent = true;
        } else {
            passwordErr.innerHTML = '';
            ispresent = false;
        }

        // If no validation errors, redirect to dashboard
        if (!ispresent) {
            window.location.href=`dashboard.html?name=${userdata.Name}`;
            userEmail.value="";
            password.value="";
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function registerUser(){
    window.location.href=`regitation.html`
}
function loader() {
    
    document.querySelector(".containerL").style.visibility = "visible";

    setTimeout(()=>{document.querySelector(".containerL").style.display = "none"},5000)
};

loader();

const togglePassword = document.querySelector('#togglePassword');
        togglePassword.addEventListener('click', () => {
            // Toggle the type attribute using
            // getAttribure() method
            const type = password.getAttribute('type') === 'password' ?'text' : 'password';
            password.setAttribute('type', type);
            // Toggle the eye and bi-eye icon
            if (type=="text"){
            togglePassword.classList='bi bi-eye';
            }
            else{
            togglePassword.classList='bi bi-eye-slash';
            }
        });