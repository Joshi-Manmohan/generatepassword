// Select the elements
const passwordBox = document.getElementById("password");
const customStringBox = document.getElementById("customString");
const descriptionBox = document.getElementById("passwordDescription");
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+~|}{[]></-=";

const allChars = upperCase + lowerCase + number + symbol;

// Function to generate a password based on the custom string
function createPassword() {
    let customString = customStringBox.value.trim();
    let password = "";

    // If custom string is provided, use it as a base
    if (customString) {
        for (let i = 0; i < customString.length; i++) {
            password += customString[i % allChars.length];
        }
    }

    // Ensure at least one character from each category is included
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    // Fill the rest of the password length with random characters
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    // Set the generated password into the input field
    passwordBox.value = password;

    // Provide a simple meaning of the password
    providePasswordDescription(password);
}

// Function to provide a simple description of the password
function providePasswordDescription(password) {
    let description = "This password contains: ";
    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let hasNumber = /\d/.test(password);
    let hasSymbol = /[@#$%^&*()_+~|}{[\]><\/\-=\-]/.test(password);

    if (hasUpperCase) description += "uppercase letters, ";
    if (hasLowerCase) description += "lowercase letters, ";
    if (hasNumber) description += "numbers, ";
    if (hasSymbol) description += "symbols, ";

    // Remove trailing comma and space
    description = description.replace(/, $/, ".");

    descriptionBox.textContent = description;
}

// Function to copy the password to the clipboard
async function copyPassword() {
    // Select the password text
    passwordBox.select();
    passwordBox.setSelectionRange(0, 99999); // For mobile devices

    try {
        // Use the Clipboard API to copy the text
        await navigator.clipboard.writeText(passwordBox.value);
        alert("Password copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy password: ", err);
        alert("Failed to copy password. Please try again.");
    }
}