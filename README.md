# This is how to allow third party cookies in chrome with puppeteer

I searched this vast internet and found **NOTHING** that would solve this **CRAP** problem. But I found a **DUMB** solution because my deadlines are tight and I just need to solve the problem, maybe you are like me too

`SitePermissionsManager` is a class designed to manage the permissions of sites in a browser, specifically allowing the addition of a site to the list of allowed sites for third-party cookies in Chrome.

This class interacts with the browser's settings page to perform actions, such as navigating to the `chrome://settings/cookies` page, selecting relevant elements from the settings UI, and adding the provided site to the allowed sites list.

## Installation

To use this class, you need to have a browser automation framework like [Puppeteer](https://pptr.dev/) installed, which allows interaction with the browser programmatically.

```bash
yarn add puppeteer
```

# Usage

### Example: 

```js
const puppeteer = require('puppeteer');
const { SitePermissionsManager } = require('./SitePermissionsManager');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Launching browser in non-headless mode
    const manager = new SitePermissionsManager(browser);

    const result = await manager.addAllowedSite('https://example.com');

    if (result) {
        console.log('Site added to allowed list.');
    } else {
        console.log('Failed to add site.');
    }

    await browser.close();
})();
```

## **Methods**

`addAllowedSite(site)`

This method allows a site to be added to the list of allowed sites for third-party cookies. It performs the following actions:

Opens the Chrome settings page (`chrome://settings/cookies`).

Clicks on the "Add Site" button.
Fills in the URL of the site to be added.
Verifies whether the "Add" button is enabled and clicks it.
Returns `true` if the site is successfully added, or `false` if an error occurs.

**Parameters:**

- `site` --> A string representing the URL of the site to be added.


## **Returns:**

- `true` if the site is successfully added to the list.
- `false` if an error occurs during the process.

## **Error Handling**

If the site cannot be added due to any error, it will be logged in the console. Common reasons for failure include:

- Issues accessing the settings page.
- The "Add" button is disabled.
- Other unexpected errors during interaction with the browser UI.

## **Dependencies**
Puppeteer (or another compatible browser automation framework).
Make sure you have Puppeteer (or a similar framework) installed to ensure this class works as expected.
