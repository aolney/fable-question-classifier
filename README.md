# Fable Speech Act Classifier

## STATUS: IN PROGRESS/NOT FUNCTIONAL

This code is a reimplementation of [work from 2003](https://olney.ai/category/2003/01/01/Olney-A-Louwerse-M-Mathews-E-M.html) written in `tcl`.

Ideas from this work have been [used recently but within a machine learning framework](https://olney.ai/category/2018/11/05/kellyer.html).

The history of this code is somewhat unfortunate, as this was pre-PhD code with poor development organization. 
So it is rather difficult for me to say that this code would replicate the [work from 2003](https://olney.ai/category/2003/01/01/Olney-A-Louwerse-M-Mathews-E-M.html).
The primary reasons are:

- I'm not 100% sure if I even found the correct original `tcl` code
- The code has been translated from `tcl` native regex to `f#`
- The original code used the [Brill Tagger](https://en.wikipedia.org/wiki/Brill_tagger) as a preprocessing step, and I have replaced that with [a javascript implementation](https://github.com/NaturalNode/natural) that may perform differently, affecting my program's results.

All that being said, please cite the [work from 2003](https://olney.ai/category/2003/01/01/Olney-A-Louwerse-M-Mathews-E-M.html) when using this code but also please state that it is a reimplementation. 


------------------------------


## Requirements

* [dotnet SDK](https://www.microsoft.com/net/download/core) 2.0.0 or higher
* [node.js](https://nodejs.org) 4.8.2 or higher
* npm5: JS package manager

Although is not a Fable requirement, on macOS and Linux you'll need [Mono](http://www.mono-project.com/) for other F# tooling like Paket or editor support.

## Editor

The project can be used by editors compatible with the new .fsproj format, like VS Code + [Ionide](http://ionide.io/), Emacs with [fsharp-mode](https://github.com/fsharp/emacs-fsharp-mode) or [Rider](https://www.jetbrains.com/rider/). **Visual Studio for Mac** is also compatible but in the current version the package auto-restore function conflicts with Paket so you need to disable it: `Preferences > Nuget > General`.

## Building and running the app

* Install JS dependencies: `yarn install`
* **Move to `src` folder**: `cd src`
* Install F# dependencies: `dotnet restore`
* Start Fable daemon and [Webpack](https://webpack.js.org/) dev server: `dotnet fable yarn-start`
* In your browser, open: http://localhost:8080/

> `dotnet fable yarn-start` (or `npm-start`) is used to start the Fable daemon and run a script in package.json concurrently. It's a shortcut of `yarn-run [SCRIP_NAME]`, e.g. `dotnet fable yarn-run start`.

If you are using VS Code + [Ionide](http://ionide.io/), you can also use the key combination: Ctrl+Shift+B (Cmd+Shift+B on macOS) instead of typing the `dotnet fable yarn-start` command. This also has the advantage that Fable-specific errors will be highlighted in the editor along with other F# errors.

Any modification you do to the F# code will be reflected in the web page after saving. When you want to output the JS code to disk, run `dotnet fable yarn-build` (or `npm-build`) and you'll get a minified JS bundle in the `public` folder.

## Project structure

### Paket

[Paket](https://fsprojects.github.io/Paket/) is the package manager used for F# dependencies. It doesn't need a global installation, the binary is included in the `.paket` folder. Other Paket related files are:

- **paket.dependencies**: contains all the dependencies in the repository.
- **paket.references**: there should be one such a file next to each `.fsproj` file.
- **paket.lock**: automatically generated, but should committed to source control, [see why](https://fsprojects.github.io/Paket/faq.html#Why-should-I-commit-the-lock-file).
- **Nuget.Config**: prevents conflicts with Paket in machines with some Nuget configuration.

> Paket dependencies will be installed in the `packages` directory. See [Paket website](https://fsprojects.github.io/Paket/) for more info.

### npm

- **package.json**: contains the JS dependencies together with other info, like development scripts.
- **package-lock.json**: is the lock file created by npm5.

> JS dependencies will be installed in `node_modules`. See [npm](https://www.npmjs.com/) website for more info.

### Webpack

[Webpack](https://webpack.js.org) is a bundler, which links different JS sources into a single file making deployment much easier. It also offers other features, like a static dev server that can automatically refresh the browser upon changes in your code or a minifier for production release. Fable interacts with Webpack through the `fable-loader`.

- **webpack.config.js**: is the configuration file for Webpack. It allows you to set many things: like the path of the bundle, the port for the development server or [Babel](https://babeljs.io/) options. See [Webpack website](https://webpack.js.org) for more info.

### F# source files

The template only contains two F# source files: the project (.fsproj) and a source file (.fs) in `src` folder.
