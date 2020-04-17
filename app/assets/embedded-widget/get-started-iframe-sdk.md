# Getting started with HMS Widget Iframe SDK

# **How to use widget with iframe with**

1. Add javascript to your html file by use tag `<script>` with src `https://hms-widget.bonmek.com/`

```html
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@eb2f898e993bbbf30e2fa54593dab266e37045ee/sdk/iframe-sdk.min.js"
></script>
```

**Reference Iframe-API**
- hmsWidget api

| api name          | type/format                                                                   | description                                      |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| init              | IInitObject                                                                   | Initial for create iframe                        |
| setParams         | any                                                                           | params for selected widget                       |
| setStructure      | any                                                                           | structure for render widget                      |
| setTheme          | `normal` `dark` or `invert`                                                   | theme for render                                 |
| setCustomizeTheme | [ThemeOptions](https://v4-8-3.material-ui.com/customization/theming/), string | Name of widget for emit event                    |
| onMessage         | function                                                                      | Function callback when iframe got event response |


- window.messageListenerService api

| api name                 | type/format | description                                          |
| ------------------------ | ----------- | ---------------------------------------------------- |
| addExtendMessagelistener | function    | Function call when window.eventmessage has been call |

**Interfaces**
- IInitObject

| key        | require | type/format | default                       | description                                      |
| ---------- | ------- | ----------- | ----------------------------- | ------------------------------------------------ |
| selector   | true    | string      | -                             | div element id for create iframe                 |
| widgetPath | true    | string      | -                             | path for render widget from `href`               |
| width      | false   | string      | 300px                         | width of iframe                                  |
| height     | false   | string      | 300px                         | height of iframe                                 |
| href       | false   | string      | https://hms-widget.bonmek.com | href for point to server that serve widget       |
| pathPrefix | false   | string      | embedded-widget               | pathPrefix for point to server that serve widget |


2. Add script to initialize iframe-sdk by use `window.hmsWidgetAsyncInit`. it receive callback function and will call when ready
```html
<script>
    const widget2 = window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example2",
          widgetPath: "patient-summary",
          width: "1600px",
          height: "720px",
          href: "http://localhost:3000",
          pathPrefix: "embedded-widget"
        });

        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
          encounterId: "3898f0f9-385e-478d-be25-5f05719e80af"
        });

        hmsWidget.setTheme("dark"); // use default theme name dark
        hmsWidget.setCustomizeTheme(  // use theme name dark with custom
          {
            palette: {
              primary: { main: "#03a9f4" },
              secondary: { main: "#00bfa5" },
              nonary: { main: "#00bfa5" }
            }
          },
          "dark"
        );
        hmsWidget.setStructure({
          patientDemographic: { 
            nameField: false,
            ageField: false
          }
        });
      });

</script>
```

object response 
  | key       | type/format     | description                                                          |
  | --------- | --------------- | -------------------------------------------------------------------- |
  | eventType | embedded-widget | Event type to identify that event is called from our embedded-widget |
  | name      | string          | Name of widget such as `patientDemographic`                          |
  | message   | string          | Name of event such as `handleSelectPatient`                          |
  | params    | string          | Parameters is send from widget iframe  as `{patientId: '000001'}`    |
  | path      | string          | Next path that widget will navigate such as `patient-info`           |
  | result    | object          | Result of loading                                                    |
  | action    | object          | Action to `window.router` such as `REPLACE_ROUTE`                    |


3. Finally, your html source code will be

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@eb2f898e993bbbf30e2fa54593dab266e37045ee/sdk/iframe-sdk.min.js"
    ></script>

  </head>
  <body>
    <div style="display: flex;">
      <div id="widget-example1">
        --- iframe rendered here 1 ---
        <br />
      </div>
    </div>
    <div id="widget-example2">
      --- iframe rendered here 2 ---
      <br />
    </div>
    <button id="test-button">
      Test
    </button>
    <script>

      const widget1 = window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-info/patient-demographic",
          width: "500px",
          height: "400px",
          href: "http://localhost:3000",
          pathPrefix: "embedded-widget"
        });
        hmsWidget.setTheme("dark");
        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5"
        });
      });

      const widget2 = window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: "widget-example2",
          widgetPath: "patient-summary",
          width: "1600px",
          height: "720px",
          href: "http://localhost:3000",
          pathPrefix: "embedded-widget"
        });

        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
          encounterId: "3898f0f9-385e-478d-be25-5f05719e80af"
        });
        hmsWidget.setCustomizeTheme(
          {
            palette: {
              primary: { main: "#03a9f4" },
              secondary: { main: "#00bfa5" },
              nonary: { main: "#00bfa5" }
            }
          },
          "dark"
        );
        hmsWidget.setStructure({
          patientDemographic: { 
            nameField: false,
            ageField: false
          }
        });
      });

      window.messageListenerService.addExtendMessagelistener(() => {
        console.log("event CALl :");
      });
    </script>
  </body>
</html>

```
