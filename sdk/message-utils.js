function createMessageEvents(iframeElement, actions) {
    if (actions && actions.length > 0) {
      return actions.reduce((acc, action) => {
        return {
          ...acc,
          [action]: data => generateMessageEvent(iframeElement, action, data)
        };
      }, {});
    }
    return [];
  }
  function generateMessageEvent(iframeElement, action, data) {
    iframeElement.contentWindow.postMessage({ action, data }, "*");
  }
  