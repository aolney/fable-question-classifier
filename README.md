# Question Classifier 2003 Reboot

[![DOI](https://zenodo.org/badge/162049270.svg)](https://zenodo.org/badge/latestdoi/162049270)

This code is a reimplementation of [work from 2003](https://olney.ai/category/2003/01/01/Olney-A-Louwerse-M-Mathews-E-M.html) written in `tcl`.
The goal here is not to improve upon that work but to get as reasonably close to it as possible. 
Any improvements will appear in other repositories.

The history of this code is somewhat unfortunate, as this was pre-PhD code with poor development organization. 
So it is rather difficult for me to say this code exactly replicates the [work from 2003](https://olney.ai/category/2003/01/01/Olney-A-Louwerse-M-Mathews-E-M.html).
The primary reasons are:

- I'm not 100% sure if I even found the correct original `tcl` code
- The code has been translated from `tcl` native regex to `f#`
- The original code used the [Brill Tagger](https://en.wikipedia.org/wiki/Brill_tagger) as a preprocessing step, and I have replaced that with [a javascript implementation](https://github.com/NaturalNode/natural) that may perform differently, affecting my program's results.

However, because the reimplementation's regular expressions are basically the same and because tests comparing the `tcl` code above to this reimplementation have largely similar results, I believe this code is a valid reimplementation. 

Accordingly, please cite the [work from 2003](https://olney.ai/category/2003/01/01/Olney-A-Louwerse-M-Mathews-E-M.html) when using this code as well as the citation for the latest code release [provided by Zenodo](https://zenodo.org/badge/latestdoi/162049270).

More recent work has used these ideas [within a machine learning framework](https://olney.ai/category/2018/11/05/kellyer.html).

A live demonstration is available at https://olney.ai/question-classifier-2003-reboot/

------------------------------

## Development requirements

* [dotnet SDK](https://www.microsoft.com/net/download/core) 2.1 or higher
* [node.js](https://nodejs.org) with [npm](https://www.npmjs.com/)
* An F# editor like Visual Studio, Visual Studio Code with [Ionide](http://ionide.io/) or [JetBrains Rider](https://www.jetbrains.com/rider/).

## Building and running the app

* Install JS dependencies: `npm install`
* Install .NET dependencies: `mono .paket/paket.exe install`
* Start Webpack dev server: `npx webpack-dev-server` or `npm start`
* After the first compilation is finished, in your browser open: http://localhost:8080/

Any modification you do to the F# code will be reflected in the web page after saving.

## Building and running the tests

* Build: `npm pretest`
* Run: `npm test`

## Project structure

### npm/yarn

JS dependencies are declared in `package.json`, while `package-lock.json` is a lock file automatically generated.

### paket

[Paket](https://fsprojects.github.io/Paket/) 

> Paket is a dependency manager for .NET and mono projects, which is designed to work well with NuGet packages and also enables referencing files directly from Git repositories or any HTTP resource. It enables precise and predictable control over what packages the projects within your application reference.

.NET dependencies are declared in `paket.dependencies`. The `src/paket.references` lists the libraries actually used in the project. Since you can have several F# projects, we could have different custom `.paket` files for each project.

Last but not least, in the `.fsproj` file you can find a new node: `	<Import Project="..\.paket\Paket.Restore.targets" />` which just tells the compiler to look for the referenced libraries information from the `.paket/Paket.Restore.targets` file.

### Fable-splitter

[Fable-splitter]() is a standalone tool which outputs separated files instead of a single bundle. Here all the js files are put into the `test-build` or `node-build`  dir. And the main entry point is our `App.js` file.

### Webpack

[Webpack](https://webpack.js.org) is a JS bundler with extensions, like a static dev server that enables hot reloading on code changes. Fable interacts with Webpack through the `fable-loader`. Configuration for Webpack is defined in the `webpack.config.js` file. Note this sample only includes basic Webpack configuration for development mode, if you want to see a more comprehensive configuration check the [Fable webpack-config-template](https://github.com/fable-compiler/webpack-config-template/blob/master/webpack.config.js). Deployment uses Webpack to populate the `deploy` directory and then pushes that directory to `gh-pages`.

### Web assets

The `index.html` file and other assets like an icon can be found in the `public` folder.
