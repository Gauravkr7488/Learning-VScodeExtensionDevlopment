import * as vscode from 'vscode';

export class SR_templateGenerator {
    async insertTemplate() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const position: vscode.Position = editor.selection.active;
            
            // Get current date in yyyymmdd format
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateString = `${year}${month}${day}`;
            
            // Get username from configuration
            const config = vscode.workspace.getConfiguration('timetrackerex');
            const userName = config.get('userName')
            
            const template = `SR${dateString}${userName}:
  Was:
  #-->Backlog.ComputingTheQuestion.MyTask<: [42m, Lorem ipsum]
  Next:
  AIOB:`;
            
            editor.edit((editBuilder: vscode.TextEditorEdit) => {
                editBuilder.insert(position, template);
            });
        }
    }
}