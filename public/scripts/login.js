async function sendReq(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const user = {
        email: username,
        password: password
    }
    const response = await fetch('http://localhost:5000/users/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(user)
    });

    const json = await response.json();


    if (response.status === 200) {
        window.location.replace('..views/homepage.ejs');
        window.localStorage.setItem("token", json.token);
        window.localStorage.setItem("username", username);
    } else {
        errorMsg();
    }
};

function errorMsg() {
    let error_msg = document.getElementById('error-msg');
    let text = document.createTextNode("Invalid credentials ");
    error_msg.appendChild(text);
}