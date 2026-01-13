Explained package.json for @cipherdcybersage/common

"main": The JavaScript entry point. When another service imports this, Node looks here to find the code.

"types": The TypeScript entry point. This is why we get autocomplete and "red squiggly lines" in VS Code.

"files": The Whitelist. It tells NPM: "Only upload the build folder; ignore my source code and config files."

"scripts.clean": Deletes the old build folder so no "ghost" files from old versions.

"scripts.build": Runs the clean script first, then runs tsc to create fresh JavaScript files.

"scripts.pub": The Automation Chain. It saves to Git, increases the version number, builds the code, and pushes it to NPM all in one go.

"devDependencies": Tools needed to build the project (like the TypeScript compiler).

"dependencies": Libraries the code needs to run (like Express or JSONWebToken).
