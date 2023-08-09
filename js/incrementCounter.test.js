// Mock the Document object for Jest since it doesn't have access to a DOM by default
document.body.innerHTML = `
  <div id="counter">0</div>
`;

// Import the functions you want to test 
const { incrementCounter } = require('./script.js'); // Replace 'path-to-your-js-file' with the actual path

test('incrementCounter should increase count by 1', () => {
  incrementCounter();
  const counterElement = document.getElementById("counter");
  expect(counterElement.textContent).toBe('1');
});
