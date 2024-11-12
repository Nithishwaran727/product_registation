const userName = document.getElementById('userName');
const Email = document.getElementById('Email');
const Password = document.getElementById('Password');
const conformpass = document.getElementById('compass');
const nameError = document.getElementById('UnameVaildate');
const EmailError = document.getElementById('EmailVaildate');
const PasswordError = document.getElementById('PasswordValidate');
const compassError = document.getElementById('compassvalidate');
const regvalue = document.getElementById("regvalue");
const Emailpatten = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passpattern = /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
let isname = false;
let isemail = false;
let ispass = false;
let iscompass = false;
let data = [];

regvalue.addEventListener("keydown",function(e){
        if(e.keyCode==13){
             registerUser()
        }
})

async function registerUser() {
    // Username validation
    if (userName.value === '' || userName.value == null) {
        nameError.innerHTML = 'User name is required'; 
        nameError.style.color = "red";
    } else if (userName.value.length < 4) {
        nameError.style.color = "red";
        nameError.innerHTML = 'User name must have at least 4 characters';
        userName.value = "";
        userName.focus();
    } else {
        nameError.innerHTML = '';
        isname = true;
    }

    // Fetch existing users to check email uniqueness
    try {
        const response = await fetch(`https://6704f3c3031fd46a830e07d0.mockapi.io/user`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        data = await response.json();
        console.log(data);

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email regex pattern
        if (Email.value === '' || Email.value == null) {
            EmailError.innerHTML = 'Email is required';
            EmailError.style.color = "red";
            Email.focus();
        } else if (!emailPattern.test(Email.value)) {
            EmailError.style.color = "red";
            EmailError.innerHTML = 'Enter a valid Email';
            Email.focus();
        } else if (data.some(user => user.Email === Email.value)) {
            EmailError.style.color = "red";
            EmailError.innerHTML = 'Email id already exists';
            Email.value = "";
            Email.focus();
        } else {
            EmailError.innerHTML = '';
            isemail = true;
        }

    } catch (error) {
        console.error('Error fetching users:', error);
    }

    console.log(isemail);

    // Password validation
    const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;  // Example pattern for strong password
    if (Password.value === '' || Password.value == null) {
        PasswordError.innerHTML = 'Password is required';
        PasswordError.style.color = "red";
        Password.focus();
    } else if (!Password.value.match(passPattern)) {
        PasswordError.style.color = "red";
        PasswordError.innerHTML = 'Password must be at least 8 characters long, include uppercase, lowercase, and a number';
        Password.value = '';
        Password.focus();
    } else {
        PasswordError.innerHTML = '';
        ispass = true;
    }

    // Confirm password validation
    if (conformpass.value === '' || conformpass.value == null) {
        compassError.style.color = "red";
        compassError.innerHTML = 'Confirm password is required';
    } else if (conformpass.value !== Password.value) {
        compassError.style.color = "red";
        compassError.innerHTML = 'Passwords must match';
        conformpass.value = '';
    } else {
        compassError.innerHTML = '';
        iscompass = true;
    }

    console.log(isname, isemail, ispass, iscompass);

    // If all validations pass, send user data
    if (isname && isemail && ispass && iscompass) {
        const userData = {
            Name: userName.value,
            Email: Email.value,
            password: Password.value,
            conformpass:conformpass.value,
        };

        const api = 'https://6704f3c3031fd46a830e07d0.mockapi.io/user';

        try {
            // Fetch request to send data
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Register successfully');
            window.location.href='login.html';

        } catch (error) {
            console.error('Error:', error);
        }
    }
}


function userExit(){
    window.location.href='login.html';
}
    

function loader() {
    
    document.querySelector(".containerL").style.visibility = "visible";
    setTimeout(()=>{document.querySelector(".containerL").style.display = "none"},3000);
};

loader();


const togglePassword = document.querySelector('#togglePassword');
        togglePassword.addEventListener('click', () => {
            // Toggle the type attribute using
            // getAttribure() method
            const type = Password.getAttribute('type') === 'password' ?'text' : 'password';
            Password.setAttribute('type', type);
            // Toggle the eye and bi-eye icon
            if (type=="text"){
            togglePassword.classList='bi bi-eye';
            }
            else{
            togglePassword.classList='bi bi-eye-slash';
            }
        });

    
 const togglecomPass = document.querySelector('#togglecomPass');
        togglecomPass.addEventListener('click', () => {
            // Toggle the type attribute using
            // getAttribure() method
            const type = conformpass.getAttribute('type') === 'password' ?'text' : 'password';
            conformpass.setAttribute('type', type);
            // Toggle the eye and bi-eye icon
            if (type=="text"){
            togglecomPass.classList='bi bi-eye';
            }
            else{
            togglecomPass.classList='bi bi-eye-slash';
            }
        });


