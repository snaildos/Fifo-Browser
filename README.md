<p align="center">
  <a href="https://fifo.snaildos.com"><img src="https://github.com/snaildos/Fifo-Browser/blob/main/static/icons/icon.png" width="256"></a>
</p>

<div align="center">
  <h1>Fifo Browser</h1>
  
[![Build CI](https://github.com/snaildos/Fifo-Browser/actions/workflows/build.yml/badge.svg)](https://github.com/snaildos/Fifo-Browser/actions/workflows/build.yml)
  
[![Downloads](https://img.shields.io/github/downloads/snaildos/Fifo-Browser/total.svg?style=flat-square)](https://fifo.snaildos.com)

[Join Our Discord](https://dsc.gg/snaildos)

Fifo is a modern web browser, built on top of modern web technologies such as `Electron` and `React` that is mean't to be secure. This browser is meant for office work, gaming, research and is a secure private browser. Fifo aims to be cross platform. 
FIFO (Fly In Fly Out for your data.)


# Table of Contents:
- [Motivation](#motivation)
- [Features](#features)
- [Screenshots](#screenshots)
- [Downloads](#downloads)
- [Contributing](#contributing)
- [Development](#development)
  - [Running](#running)
- [Documentation](#documentation)
- [License](#license)

# Motivation

Building a custom browser would be way to hard, therefor, we forked Wexond as our base, we are theng going to extend from there.
Fifo has branched off Wexond and we are on our way of desiging our own graphics and icons.

# Features

- **AntiAd** - Browse the web without any ads and don't let websites to track you. Thanks to the 'AntiAd' (Fifo Service) powered by [Cliqz](https://github.com/cliqz-oss/adblocker), websites can load even 8 times faster!
- **Chromium without Google services and low resources usage** - Since Fifo uses Electron under the hood which is based on only several and the most important Chromium components, it's not bloated with redundant Google tracking services and others.
- **Fast and fluent UI** - The animations are really smooth and their timings are perfectly balanced.
- **Highly customizable new tab page** - Customize almost an every aspect of the new tab page!
- **Customizable browser UI** - Choose whether Fifo should have compact or normal UI.
- **Tab groups** - Easily group tabs, so it's hard to get lost.
- **Scrollable tabs** - Scroll between your tabs.
- **Support Chrome extensions** - From version < 1.2.0 80% of chrome extenions are compatible and work with Fifo.

## Other basic features

- Downloads popup with currently downloaded items
- History manager
- Simple menu
- Perfect Incognito Mode!
- Bookmarks bar & manager
- Settings
- Find in page
- Dark and light theme
- Omnibox with autocomplete algorithm similar to Chromium
- State of the art tab system
- Newest code
- Optimization
- Extensions
- Updates
- Security Security SECURITY!

## What can I expect to see in future updates?

- More security Features
- AutoComplete
- AutoFill

# Screenshots


## These images are from =>0.1.0 and are outdated.
![alt text](https://github.com/SnailDOS/Fifo-Browser/blob/main/image-preview/image.jpg?raw=true)

UI normal variant:
![image](https://user-images.githubusercontent.com/11065386/81024186-f40b0400-8e72-11ea-976e-cd1ca1b43ad8.png)

UI compact variant:
![image](https://user-images.githubusercontent.com/11065386/81024222-13099600-8e73-11ea-9fc9-3c63a034403d.png)
![image](https://user-images.githubusercontent.com/11065386/81024252-2ddc0a80-8e73-11ea-9f2f-6c9a4a175c60.png)

# Downloads
- [Stable Versions](https://github.com/snaildos/Fifo-Browser/releases)

# Contributing

If you have found any bugs or just want to see some new features in Fifo, feel free to open an issue. Every suggestion is very valuable for us, as they help us improve the browsing experience. Also, please don't hesitate to open a pull request. This is really important to us and for the further development of this project.

By opening a pull request, you agree to the conditions of the [Contributor License Agreement](cla.md).

# Development

## Running (Development)

Before running Fifo, please ensure you have **latest** [`Node.js`](https://nodejs.org/en/) and [`YARN`] installed on your machine. You can use NPM but it IS NOT recommended.

### Windows

Make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
$ npm i -g windows-build-tools
```

Yarn:
```bash
$ yarn install # Install node modules
$ yarn build # Compile Fifo code and rebuild modules.
$ yarn dev # Run Fifo in development mode
```

NPM: Not recommended
```bash
$ npm install --save --legacy-peer-deps # Install needed depedencies. If you can, please, use yarn install.
$ npm run build # Compile Fifo code and rebuild modules.
$ npm run dev # Run Fifo in development mode
```

### More commands

```bash
$ yarn compile-win32 # Package Fifo for Windows
$ yarn compile-linux # Package Fifo for Linux
$ yarn compile-darwin # Package Fifo for macOS
$ yarn lint # Runs linter
$ yarn lint-fix # Runs linter and automatically applies fixes
$ yarn copyright # Generates auto headers for copyright.
```

More commands can be found in [`package.json`](package.json).

## Running (Without Development Mode (Stable))

Before running Fifo, please ensure you have **latest** [`Node.js`](https://nodejs.org/en/) and [`YARN`] installed on your machine. You can use NPM but it IS NOT recommended.

### Windows

Make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
$ npm i -g windows-build-tools
```

Yarn:
```bash
$ yarn install # Install node modules
$ yarn build # Compile Fifo code and rebuild modules.
$ yarn start # Run Fifo in development mode
```

NPM: Not recommended
```bash
$ npm install --save --legacy-peer-deps # Install needed depedencies. If you can, please, use yarn install.
$ npm run build # Compile Fifo code and rebuild modules.
$ npm run start # Run Fifo in development mode
```

# Documentation

Guides and the API reference are located in [`docs`](docs) directory.

# License
This browser isn't mean to be rebranded/redistrubted, please follow the LICENSE.MD. 
Never remove credits in headers.
(sentialx@gmail.com) wrote original base code. (Wexond).
By sending a Pull Request, you agree that your code may be relicensed or sublicensed.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsnaildos%2FFifo-Browser.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsnaildos%2FFifo-Browser?ref=badge_large)
</div>
