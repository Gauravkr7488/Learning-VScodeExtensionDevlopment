import * as vscode from 'vscode';

export class TimeTracker {
    async timeTrackerStart() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const position = editor.selection.active;
            const line = document.lineAt(position.line);
            const endPosition = line.range.end;

            editor.edit(editBuilder => {
                editBuilder.insert(endPosition, ' hi');
            });
        }
    }
}