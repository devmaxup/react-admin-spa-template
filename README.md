
## Project setup

1. Replace `app-name` with your real app name

1. Install NodeJS (above the 12.18 version is recommended, edit .nvmrc and package.json if yoy want to use different version)
   https://nodejs.org/en/download/package-manager/
    ```bash
    nvm install 12.18
    nvm use
    ```

1. Open terminal in a current directory and put commands here
    ```bash
    npm install -g yarn
    yarn install
    yarn start
    ```

1. Clean-up *modules*, *folders* and *comments* what you not needed, verify the app is still running without the errors, execute `yarn && git add yarn.lock` and commit the changes you made.


## Development

### Code verification
Choose your NodeJS version and enable ESlint and Prettier support in your IDE.

### Performance optimization
Mark `node_modules` and `build` folders as excluded in your IDE to prevent unnecessary indexing.


## Available Scripts

### Development

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn locales:extract`
Extracting texts to be translated.

#### `yarn lint`
Verify code style with ES-Lint.

#### `yarn lint:fix`
Verify code style with autofixing.\
Also will be runned automatically on every commit.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
