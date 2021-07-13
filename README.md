# VSC Selection Converter

Convert selected text by your custom script.

## Getting started

1. Install `selection-converter`
2. Open `Command Palette`, and type `Convert Selected Text`
3. A file named `.vscode/selection-convert.js` will be created and opened automatically.
4. Write your custom converting script.
5. Select the text which you want to convert.
6. Redo step 2, this time your custom converters shoud show up.
7. Pick the one your want to run, and selected text will be replaced.


## Development

1. Start Debugging with `F5`, a new vscode window will pop up
2. Run you command with `Ctrl+Shift+p`, set breakpoint, etc ...


## Publish/Update

1. Login into `<username>.visualstudio.com`
2. Navigate to **Personal Access Token**
3. Follow [vscode publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) to create a token
4. Install vcse by running `npm install -g vsce`
5. Login into vcse: `vcse login <username>`, enter the token you just created