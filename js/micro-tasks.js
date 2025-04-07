// here i'm doing some testing with micro tasks! 
// i also want to understand async local storage

// Cool example from this doc :
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
const messageQueue = [];

let sendMessage = (message) => {
  messageQueue.push(message);

  if (messageQueue.length === 1) {
    queueMicrotask(() => {
      const json = JSON.stringify(messageQueue);
      messageQueue.length = 0;
      fetch("url-of-receiver", json);
    });
  }
};
