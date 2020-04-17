# Demo app implement with iframe

Example code
```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@befa56d14ee566e7c3e92244e4c585c336a76dda/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div style="display: flex;">
      <div id="widget-example1">
        --- iframe rendered here 1 ---
        <br />
      </div>
      <div id="widget-example2">
        --- iframe rendered here 2 ---
        <br />
      </div>
    </div>

    <script>
      window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: 'widget-example1',
          widgetPath: 'patient-info/encounter-timeline',
          width: '500px',
          height: '400px',
        })

        hmsWidget.setParams({
          patientId: '0debf275-d585-4897-a8eb-25726def1ed5',
          max: 20,
          isRouteable: false,
        })
        hmsWidget.setTheme('invert')
        hmsWidget.setCustomizeTheme({
          typography: {
            h4: {
              fontSize: '3.5rem',
              color: 'blue',
            },
            body2: {
              fontSize: '1rem',
              color: 'red',
            },
          },
          palette: {
            primary: { main: '#03a9f4' },
            secondary: { main: '#00bfa5' },
            nonary: { main: '#00bfa5' },
          },
        })

        hmsWidget.onMessage(data => {
          const summaryCardsIframeElement = document.getElementById(
            'widget-example3-iframe-sdk',
          )
          if (data.message === 'handleEncounterSelect') {
            widget2.setParams({
              patientId: '0debf275-d585-4897-a8eb-25726def1ed5',
              encounterId: data.params.encounterId,
            })
          }
        })
      })

      const widget2 = window.hmsWidgetAsyncInit(function(hmsWidget) {
        hmsWidget.init({
          selector: 'widget-example2',
          widgetPath: 'patient-info/summary-cards',
          width: '500px',
          height: '400px',
        })

        hmsWidget.setParams({
          patientId: '0debf275-d585-4897-a8eb-25726def1ed5',
          encounterId: '3898f0f9-385e-478d-be25-5f05719e80af',
        })
        hmsWidget.setTheme('dark')
        hmsWidget.onMessage(data => {
          console.log('data :', data)
        })
      })

      window.messageListenerService.addExtendMessagelistener(() => {
        console.log('event CALl :')
      })
    </script>
  </body>
</html>

```
Description code
1. If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)
2. If user iteract with HMS-widget it will post message throug window message listener. User can use that event to interact with another HMS-widget