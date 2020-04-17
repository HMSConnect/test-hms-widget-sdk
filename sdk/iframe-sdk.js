var me = null;
var domain = null;

function isMe(scriptElem) {
  return scriptElem.getAttribute("src").includes("hms-widget-sdk");
}

var scripts = document.getElementsByTagName("script");
for (var i = 0; i < scripts.length; ++i) {
  if (isMe(scripts[i])) {
    me = scripts[i];
    const meArray = me.getAttribute("src").split("/");
    meArray.pop();
    domain = meArray.join("/");
  }
}

var loadJsFile = function(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = function() {
    if (callback) callback();
  };
  script.type = "text/javascript";
  script.async = false;
  script.defer = false;
  const oldScript = document.getElementsByTagName("script")[0];
  oldScript.parentNode && oldScript.parentNode.insertBefore(script, oldScript);
};

class MessageListenerServiceFactory {
  register = [];
  origin;
  extendMessageListener = null;
  registerMessage(iframeName, listener) {
    this.register.push({ iframeName, listener });
  }

  initialMessageListener() {
    window.addEventListener("message", event => {
      if (this.origin && event.origin !== this.origin) return;
      if (event.data.eventType === "embedded-widget") {
        const iframeName = event.data.iframeName;
        const listener = this.register.find(
          data => data.iframeName === iframeName
        );
        if (listener) {
          listener.listener(event.data);
        }
        if (this.extendMessageListener) {
          this.extendMessageListener();
        }
      }
    });
  }

  addExtendMessagelistener(callback) {
    this.extendMessageListener = callback;
  }

  setOrigin(origin) {
    this.origin = origin;
  }
}

var messageListenerService = new MessageListenerServiceFactory();
window.messageListenerService = messageListenerService;
messageListenerService.initialMessageListener();

class HmsWidgetFactory {
  iframeObject = {
    src: "",
    qs: "",
    name: "",
    selector: "",
    iframeElement: undefined,
    theme: undefined,
    customTheme: undefined,
    width: "300px",
    height: "300px",
    href: "https://hms-widget.bonmek.com",
    pathPrefix: "embedded-widget",
    isFirstRender: true,
    structure: {}
  };

  init = config => {
    const divElement = document.getElementById(config.selector);
    this.iframeObject.selector = config.selector;
    this.iframeObject.name = config.name;
    this.iframeObject.iframeElement = document.createElement("iframe");
    this.iframeObject.iframeElement.setAttribute(
      "width",
      config.width || this.iframeObject.width
    );
    this.iframeObject.iframeElement.setAttribute(
      "height",
      config.height || this.iframeObject.height
    );
    if (config.href) {
      this.iframeObject.href = config.href;
    }
    if (config.pathPrefix) {
      this.iframeObject.pathPrefix = config.pathPrefix;
    }
    this.iframeObject.src = `${this.iframeObject.href}/${this.iframeObject.pathPrefix}/${config.widgetPath}`;

    divElement.appendChild(this.iframeObject.iframeElement);
  };

  setParams = params => {
    const qs = queryStringify({
      ...params,
      isWaitForIframeLoaded: true
    });
    this.iframeObject.qs = qs;
    if (!this.iframeObject.isFirstRender) {
      this.render();
    }
  };

  setTheme = theme => {
    this.iframeObject.theme = theme;
    if (!this.iframeObject.isFirstRender) {
      this.render();
    }
  };

  setCustomizeTheme = (customTheme, themeName) => {
    this.iframeObject.customTheme = { themeObject: customTheme, themeName };
    if (!this.iframeObject.isFirstRender) {
      this.render();
    }
  };

  setStructure = structure => {
    this.iframeObject.structure = {
      ...this.iframeObject.structure,
      ...structure
    };
    if (!this.iframeObject.isFirstRender) {
      this.render();
    }
  };

  render = initSetup => {
    if (initSetup) {
      initSetup();
    }
    try {
      this.iframeObject.iframeElement.onload = () =>
        this.onIframeLoaded(this.iframeObject);
      const url = `${this.iframeObject.src}${
        this.iframeObject.qs ? `?${this.iframeObject.qs}` : ""
      }`;
      console.info(
        "this.iframeObject.src :",
        `${this.iframeObject.src}${
          this.iframeObject.qs ? `?${this.iframeObject.qs}` : ""
        }`
      );
      this.iframeObject.iframeElement.setAttribute("src", `${url}`);
      this.iframeObject.isFirstRender = false;
    } catch (e) {
      console.error("error: ", e);
    }
  };

  onIframeLoaded = iframeObject => {
    const actions = [
      "finishIframeLoading",
      "setTheme",
      "setCustomTheme",
      "setIframeName",
      "setStructure"
    ];
    const messageEvent = createMessageEvents(
      iframeObject.iframeElement,
      actions
    );
    messageEvent.setIframeName(iframeObject.selector);
    if (iframeObject.theme) {
      messageEvent.setTheme(iframeObject.theme);
    }
    if (iframeObject.customTheme) {
      messageEvent.setCustomTheme(iframeObject.customTheme);
    }
    messageEvent.setStructure(this.iframeObject.structure);
    messageEvent.finishIframeLoading();
  };

  onMessage = callback => {
    messageListenerService.registerMessage(
      this.iframeObject.selector,
      callback
    );
  };
}

window.hmsWidgetAsyncInit = function(callback) {
  const hmswidgetObject = new HmsWidgetFactory();
  loadJsFile(`${domain}/message-utils.min.js`);
  loadJsFile(`${domain}/stringify.min.js`, () => {
    hmswidgetObject.render(function() {
      callback(hmswidgetObject);
    });
  });
  return hmswidgetObject;
};
