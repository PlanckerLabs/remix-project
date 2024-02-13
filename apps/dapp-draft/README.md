# Remix DappDraft Plugin

## Available Scripts

In the project directory, you can run:

### `npm run serve:plugin --plugin=dapp-draft`

Runs the app in the development mode.\
Open [http://localhost:2025](http://localhost:2025) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build:plugin --plugin=dapp-draft`

Builds the app for production to the `dist/apps/dapp-draft` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Loading the plugin in remix

When testing with localhost you should use the HTTP version of either REMIX or REMIX ALPHA. Click on the plugin manager icon and
add the plugin 'Connect to a local plugin'. Your plugin will be at http://localhost:2025/.
