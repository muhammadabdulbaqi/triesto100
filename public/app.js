// Initialize the current score and tries counter
let currentScore = 1;
let tries = 0;

// Function to update the UI with the current score, tries, and last operand
function updateUI(randomOperand) {
    document.getElementById('currentScore').innerText = currentScore;
    document.getElementById('triesCount').innerText = tries;
    if (randomOperand !== undefined) {
        document.getElementById('operandValue').innerText = randomOperand;
    }
}

// Function to apply the selected operation with a random operand
function applyOperation() {
    const operation = document.getElementById('operation').value;
    const randomOperand = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10

    switch (operation) {
        case 'add':
            currentScore += randomOperand;
            break;
        case 'subtract':
            currentScore -= randomOperand;
            break;
        case 'multiply':
            currentScore *= randomOperand;
            break;
        case 'divide':
            // Ensure we don't divide by zero
            if (randomOperand !== 0) {
                currentScore = Math.floor(currentScore / randomOperand);
            }
            break;
    }

    tries++; // Increment the tries counter
    updateUI(randomOperand); // Update the UI with the new score, tries, and last operand

    // Update user progress on the server
    updateProgress(currentScore, tries);
}

// Function to update user progress
async function updateProgress(score, tries) {
    const token = localStorage.getItem('token');
    if (!token) return; // Do nothing if there's no token

    const response = await fetch('http://localhost:5000/api/progress/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ score, tries })
    });

    const result = await response.json();
    console.log('Progress updated:', result);
}

// Function to load user progress
async function loadUserProgress() {
    const token = localStorage.getItem('token');
    if (!token) return; // Do nothing if there's no token

    const response = await fetch('http://localhost:5000/api/progress/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (result.score !== undefined) {
        currentScore = result.score;
        tries = result.tries;
        updateUI(); // Update the UI with the loaded progress
    }
}

// Event listener for the "Generate Random Operand" button
document.getElementById('generate').addEventListener('click', applyOperation);

// // Registration form handling
// document.getElementById('registerForm').addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const username = document.getElementById('registerUsername').value;
//     const password = document.getElementById('registerPassword').value;
//     const submitButton = document.querySelector('#registerForm button[type="submit"]');

//     // Disable the submit button to prevent double submission
//     submitButton.disabled = true;

//     try {
//         const response = await fetch('http://localhost:5000/api/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//             alert('Registration successful! You can now log in.');
//         } else {
//             alert(data.error || 'Registration failed.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred during registration.');
//     } finally {
//         // Re-enable the submit button
//         submitButton.disabled = false;
//     }
// });




// document.getElementById('loginForm').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;

//     try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password })
//         });
//         const result = await response.json();
//         console.log(result); // Check the response in the console
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });


// Initial UI update when the page loads
if (localStorage.getItem('token')) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    loadUserProgress(); // Load user progress if already logged in
} else {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('game').style.display = 'none';
}
