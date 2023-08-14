// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

const form = document.getElementById("form");
const loginform = document.getElementById("login-form");
if(form)

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const firstNameInput = document.getElementById("firstNameInput").value;
  if (!firstNameInput || firstNameInput.trim() === "") {
    alert("Please enter a first name.");
    return;
  }
  if (!/^[a-zA-Z]{2,25}$/.test(firstNameInput.trim())) {
    alert("Please enter a valid first name.");
    return;
  }

  const lastNameInput = document.getElementById("lastNameInput").value;
  if (!lastNameInput || lastNameInput.trim() === "") {
    alert("Please enter a last name.");
    return;
  }
  if (!/^[a-zA-Z]{2,25}$/.test(lastNameInput.trim())) {
    alert("Please enter a valid last name.");
    return;
  }

  const emailAddressInput = document.getElementById("emailAddressInput").value;
  if (!emailAddressInput || emailAddressInput.trim() === "") {
    alert("Please enter an email address.");
    return;
  }
  if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddressInput.trim())) {
    alert("Please enter a valid email address.");
    return;
  }

  const passwordInput = document.getElementById("passwordInput").value;
  if (!passwordInput || passwordInput.trim() === "") {
    alert("Please enter a password.");
    return;
  }
  if (!/^[a-zA-Z0-9!@#$%^&*()_+{}:"<>?\|,./;'[\]\\]{}`~]{8,}$/.test(passwordInput.trim())) {
    alert("Please enter a valid password.");
    return;
  }

  const confirmPasswordInput = document.getElementById("confirmPasswordInput").value;
  if (!confirmPasswordInput || confirmPasswordInput.trim() === "") {
    alert("Please confirm your password.");
    return;
  }
  if (!/^[a-zA-Z0-9!@#$%^&*()_+{}:"<>?\|,./;'[\]\\]{}`~]{8,}$/.test(confirmPasswordInput.trim())) {
    alert("Please enter a valid confirm password.");
    return;
  }

  if (passwordInput !== confirmPasswordInput) {
    alert("The passwords do not match.");
    return;
  }

  event.target.submit();
});
