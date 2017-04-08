watsn-conversation-tool
===========
An assortment of tools for working with conversation workspace files exported from IBM Watson Conversation Service

[![Build Status](https://travis-ci.org/wallali/watsn-conversation-tool.svg?branch=master)](https://travis-ci.org/wallali/watsn-conversation-tool)

Setup
-----
[![NPM](https://nodei.co/npm/watsn-conversation-tool.png)](https://npmjs.org/package/watsn-conversation-tool)

Install via npm:
```sh
npm install watsn-conversation-tool -g
```

Usage
-----
Run `watsncv --help` for full usage


Debugging
---------

`watsn-conversation-tool` uses the [debug module](https://github.com/visionmedia/debug) to output debug messages to the console. To output all debug messages, set the `DEBUG` environment variable:

```
DEBUG=app:watsncv
```
This will output debugging messages from the tool.

License
-------

[Apache 2.0](https://github.com/wallali/watsn-conversation-tool/blob/master/LICENSE)
