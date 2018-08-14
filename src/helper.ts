import * as vscode from 'vscode';

export class Helper {

    constructor() {
    }

    public static getSearchPhrase(): string {
        let editor = vscode.window.activeTextEditor;           
        if (!editor) {
            vscode.window.showInformationMessage('Google Search: Open an editor and select a word / highlight some text to search.');
            return '';
        }
        let text = editor.document.getText();
        if (!text) {
            return '';
        }
        let selStart, selEnd;
        if (editor.selection.isEmpty) {
            selStart = editor.document.offsetAt(editor.selection.anchor);
            // the next or previous character at the caret must be a word character
            var i=selStart-1;
            if (!((i < text.length-1 && /\w/.test(text[i+1])) || (i > 0 && /\w/.test(text[i])))){
                return '';
            }
            for (; i >= 0; i--) {
                if (!/\w/.test(text[i])) {
                    break;
                }
            }
            if (i < 0) {
                i = 0;
            }
            for (; i < text.length; i++) {
                if (/\w/.test(text[i])) {
                    break;
                }
            }
            let wordMatch = text.slice(i).match(/^\w+/);
            selStart = i;
            selEnd = selStart + (wordMatch ? wordMatch[0].length : 0);
        } else {
            selStart = editor.document.offsetAt(editor.selection.start);
            selEnd = editor.document.offsetAt(editor.selection.end);
        }
        let phrase = text.slice(selStart, selEnd).trim();
        phrase = phrase.replace(/\s\s+/g,' ');
        // limit the maximum searchable length to 100 characters
        phrase = phrase.slice(0, 100).trim();
        return phrase;
    }
}