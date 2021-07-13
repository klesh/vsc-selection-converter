// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "selection-converter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('selection-converter.convertSelectedText', async () => {
		// The code you place here will be executed every time your command is executed

		if (!vscode.workspace.workspaceFolders) {
			return vscode.window.showErrorMessage(
				"Convert Selection Text works on workspace only, please use [Open Folder] to create one"
			);
		}

		if (!vscode.window.activeTextEditor) {
			return;
		}

		const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		const dotVscode = path.join(rootPath, '.vscode');
		const convertersPath =  path.join(dotVscode, 'selection-convert.js');

		const openConverters = async () => {
			const document = await vscode.workspace.openTextDocument(convertersPath);
			vscode.window.showTextDocument(document);
			vscode.window.showErrorMessage('Please define your custom converters first.');
		};

		let converters: any;
		try {
			delete require.cache[require.resolve(convertersPath)];
			converters = require(convertersPath);
		} catch (e) {
			if (!fs.existsSync(convertersPath)) {
				fs.mkdirSync(dotVscode, {recursive: true});
		 		const examplePath = path.join(__dirname, 'selection-convert.js');
				fs.copyFileSync(examplePath, convertersPath);
				await openConverters();
			} else {
				vscode.window.showErrorMessage(e);
			}
			return;
		}

		const converterKeys = Object.getOwnPropertyNames(converters)
																.filter(k => typeof converters[k] === 'function');

		if (converterKeys.length === 0) {
			await openConverters();
			return;
		}

		const selectedConvertKey = await vscode.window.showQuickPick(converterKeys);

		if (!selectedConvertKey) {
			return;
		}

		const converter = converters[selectedConvertKey];
		const editor = vscode.window.activeTextEditor;
		for (const selection of editor.selections) {
			const selectedText = editor.document.getText(selection);
			editor.edit(builder => {
				try {
					const result = converter(selectedText);
					builder.replace(selection, result);
				} catch (e) {
					vscode.window.showErrorMessage(e);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
