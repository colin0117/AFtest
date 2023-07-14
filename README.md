# Animal Friends Insurance Test Automation challenge

To run, first:

```
npm install
```

Then to run from the command-line:

```
npm run cypress:run
```

or from the Cypress UI:

```
npm run cypress:open
```

# Notes

1. When running on the command-line, it reloads the tests after the first step. I couldn't work out why in the timeframe of the test (3 hours)
* Ignore this one!!! I took a look the following day out of interest and realised it was just because the test wasn't setting `baseUrl`

2. I changed the product name from that in the spec to include the registered trademark symbol. I assumed that was permitted - if not, I would've used a regex to find the product name instead.
