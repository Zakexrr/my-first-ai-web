// Tiny page logic for Homework 01, Exercise 1.2.
// No external dependencies: plain DOM APIs only.

const MESSAGES = [
  "Hello from the AI-built page.",
  "The button works. This is message two.",
  "Third message: the page is alive.",
  "You can keep clicking; the message keeps changing."
];

const messageEl = document.getElementById("message");
const changeButton = document.getElementById("change-button");

let index = -1;

changeButton.addEventListener("click", () => {
  index = (index + 1) % MESSAGES.length;
  messageEl.textContent = MESSAGES[index];
});
