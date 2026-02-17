function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Demo login (replace with backend later)
  if (email && password) {
    localStorage.setItem("user", JSON.stringify({ email }));
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function signupUser(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Save user (demo purpose)
  const user = { name, email, password };
  localStorage.setItem("registeredUser", JSON.stringify(user));

  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}
