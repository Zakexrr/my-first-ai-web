// Tiny page logic for Homework 01, Exercise 1.2.
// No external dependencies: plain DOM APIs only.

const MESSAGES = [
  "Hello from the AI-built page.",
  "The button works. This is message two.",
  "Third message: the page is alive.",
  "You can keep clicking; the message keeps changing."
];

const DEFAULT_TEXT = "The message has not changed yet.";

const messageEl = document.getElementById("message");
const changeButton = document.getElementById("change-button");
const resetButton = document.getElementById("reset-button");

let index = -1;

function render() {
  messageEl.textContent = index === -1 ? DEFAULT_TEXT : MESSAGES[index];
  // Reset is only useful once the message has actually changed.
  resetButton.disabled = index === -1;
}

changeButton.addEventListener("click", () => {
  index = (index + 1) % MESSAGES.length;
  render();
});

resetButton.addEventListener("click", () => {
  index = -1;
  render();
});

render();
