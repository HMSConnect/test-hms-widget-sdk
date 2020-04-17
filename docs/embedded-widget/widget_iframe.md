# Getting started with HMS Widget

# **How to use widget with iframe**

1. Set attribute `src` from `<iframe>` tag to choose widget from `https://hms-widget.bonmek.com/embeded-widget` such as if you want to use Patient Search Result Widget. set `src` attribute to `https://hms-widget.bonmek.com/embeded-widget/patient-search-result`

```html
<iframe
  src="https://hms-widget.bonmek.com/embeded-widget/patient-search-result"
  width="1000"
  height="720"
/>
```

2. (Optional if you want to listen event from widget) Apply `eventListener` with `message` type to your `<script>`

```html
<script>
  window.addEventListener("message", function(event) {
    if (event.origin !== "https://hms-widget.bonmek.com") return;
    if(event.data.eventType !== 'embedded-widget') return

    console.log("message received:  ", event.data.message);
    console.log("action received:  ", event.data.action);
    console.log("params received:  ", event.data.params);
    console.log("path received:  ", event.data.path);
    console.log("eventType received:  ", event.data.eventType);
  });
</script>
```
object response 
  | key       | type/format     | description                                                          |
  | --------- | --------------- | -------------------------------------------------------------------- |
  | eventType | embedded-widget | Event type to identify that event is called from our embedded-widget |
  | message   | string          | Name of event such as `handleSelectPatient`                          |
  | params    | string          | Parameters is send from widget iframe  as `{patientId: '000001'}`    |
  | path      | string          | Next path that widget will navigate such as `patient-info`           |
  | result    | object          | Result of loading                                                    |
  | action    | object          | Action to `window.router` such as `REPLACE_ROUTE`                    |

3. Finally, your html source code will be

```html
<html>
  <body>
    <iframe
      src="https://hms-widget.bonmek.com/embeded-widget/patient-search-result"
      width="1000"
      height="720"
    ></iframe>
  </body>

<script>
  window.addEventListener("message", function(event) {
    if (event.origin !== "https://hms-widget.bonmek.com") return;
    if(event.data.eventType !== 'embedded-widget') return

    console.log("message received:  ", event.data.message);
    console.log("action received:  ", event.data.action);
    console.log("params received:  ", event.data.params);
    console.log("path received:  ", event.data.path);
    console.log("eventType received:  ", event.data.eventType);
  });
</script>
</html>
```

4. You can apply `iframe` tag to anywhere in `html body`

```html
<html>
  <head>
    Test Widget
  </head>
  <body>
    <div style="border: 2px solid black;background-color: teal; height: 50px;">
      <p>
        Header
      </p>
    </div>
    <br />
    <div style="display: flex;">
      <div style="flex: 1;text-align: center;">
        <iframe
          src="https://hms-widget.bonmek.com/embeded-widget/patient-search-result"
          name="iframe_a"
          width="1000"
          height="720"
        ></iframe>
      </div>
    </div>
    <br />
    <div
      style="border: 2px solid black;background-color: skyblue; height: 50px;"
    >
      <p>
        Footer
      </p>
    </div>
  </body>
</html>
```


<!-- WidgetEventResponse -->


