import * as vscode from 'vscode';

export class TimeTracker {
    async timeTrackerStart() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const position = editor.selection.active;
            const line = document.lineAt(position.line);
            const endPosition = line.range.end;
            
            // Get current time in hh:mm am/pm format
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            
            // Convert to 12-hour format
            const hour12 = hours % 12 || 12; // 0 should be converted to 12
            const ampm = hours >= 12 ? 'pm' : 'am';
            
            // Format the time string (with leading zeros for minutes)
            const timeString = `[Task Started at -> ${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}]`;
            
            editor.edit(editBuilder => {
                editBuilder.insert(endPosition, ` ${timeString}`);
            });
        }
    }
}