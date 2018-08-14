'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Helper } from './helper';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "gethelp" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let googleSearch = vscode.commands.registerCommand('extension.getHelpGoogle', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Searching Google...');
        
        let phrase = Helper.getSearchPhrase();
        const uriPhrase = encodeURI(phrase);
        // Open browser
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://google.com/search?q=${uriPhrase}`));
    });

    let stackOverflowSearch = vscode.commands.registerCommand('extension.getHelpSO', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Searching StackOverflow...');
        
        let phrase = Helper.getSearchPhrase();
        const uriPhrase = encodeURI(phrase);
        // Open browser
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://stackoverflow.com/search?q=${uriPhrase}`));
    });

    context.subscriptions.push(googleSearch);
    context.subscriptions.push(stackOverflowSearch);
}

// this method is called when your extension is deactivated
export function deactivate() {
}