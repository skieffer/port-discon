This project demonstrates a difference between Firefox and Chrome, regarding the
lifecycle of the `Port`, in browser extensions. It was tested on Firefox Developer
Edition v107.0b9 and Chrome v107.0.5304.110, on macOS.

Suppose you have a browser extension, in which both the background script and the
options page call `browser.runtime.onConnect.addListener()`. In Firefox, when the
user closes the options page, any open `Port`s will be disconnected, even if the
background script is still running. In Chrome, this is not so.

To demonstrate the issue:

* `npm install`
* `npm run build:moz`
* In Firefox's `about:debugging`, load the extension from the generated `dist-mozilla` directory.
* Open any page on the internet, and have the dev console open.
* The extension's options page automatically opens. There, you should open the dev console as well.
* In the console for the first page, you'll see ports being opened, one every two seconds.
  A total of ten ports will be opened.
* After a couple of ports have been opened, go back to the options page, and click the
  "Start Listening" button. Now in the console you'll see that this page is hearing the
  connections.
* Finally, go back to the first page, and, while there, close the extension's options page,
  by clicking the "X" in its tab.
  In the console on this page you will see that those ports are now disconnected whose
  connections were heard by the options page.

To see that the behavior is different in Chromium-based browsers:

* `npm run build:chr`
* In Chrome's extensions page, load the extension from the generated `dist-chrome` directory.
* Proceed as above. This time, you'll see that the ports are not disconnected when the
  options page is closed.
