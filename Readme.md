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

This will make the command `watsncv` available on your console.


Usage
-----
Run `watsncv --help` for list of commands.

Run `watsncv <command> -h` for help on a specific command.

For example to output a conversation having only intents with the word 'hello' and pretty print the output:

`watsncv search --only --intents --pretty car_workspace.json hello`

`watsncv search -h` will show you all search options.


Debugging
---------
`watsn-conversation-tool` uses the [debug module](https://github.com/visionmedia/debug) to output debug messages to the console. To output all debug messages, set the `DEBUG` environment variable:

```
DEBUG=app:watsncv
```
This will output debugging messages from the tool.


Contributing
------------
Contributions are welcome and the tool is designed to accept contributions for new commands.
New commands can be placed inside the `src/cassettes` folder and will be loaded automatically.
See the `src/cassettes` folder for more information on how to create a cassette.


License
-------

[Apache 2.0](https://github.com/wallali/watsn-conversation-tool/blob/master/LICENSE)
