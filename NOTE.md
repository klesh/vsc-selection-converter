
## Development

1. Start Debugging with `F5`, a new vscode window will pop up
2. Run you command with `Ctrl+Shift+p`, set breakpoint, etc ...


## Publish/Update

1. Login into `<username>.visualstudio.com`
2. Navigate to **Personal Access Token**
3. Follow [vscode publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) to create a token
4. Install vcse by running `npm install -g vsce`
5. Login into vcse: `vcse login <username>`, enter the token you just created
6. Packaging: `vsce package`
7. Publishing: `vsce publish`