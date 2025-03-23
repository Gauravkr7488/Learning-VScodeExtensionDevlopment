import * as vscode from 'vscode';

export class SR_templateGenerator {
    async insertTemplate() {
        const editor= vscode.window.activeTextEditor;
        if (editor) {
            const position: vscode.Position = editor.selection.active;
            editor.edit((editBuilder: vscode.TextEditorEdit) => {
                editBuilder.insert(position, 'hi');
            });
        }
    }
}
