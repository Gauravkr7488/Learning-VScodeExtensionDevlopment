import * as vscode from 'vscode';

export class TimeTracker {
    private static startTime: Date | null = null;
    private static activeTaskLine: number | null = null;
    
    async timeTrackerStart() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        
        const document = editor.document;
        const position = editor.selection.active;
        const lineNumber = position.line;
        const line = document.lineAt(lineNumber);
        const endPosition = line.range.end;
        
        // If there's no active timer, start one
        if (TimeTracker.startTime === null) {
            // Get current time
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            
            // Convert to 12-hour format
            const hour12 = hours % 12 || 12;
            const ampm = hours >= 12 ? 'pm' : 'am';
            
            // Format the start time string
            const timeString = `[Task Started at -> ${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}]`;
            
            // Store the start time and line number
            TimeTracker.startTime = now;
            TimeTracker.activeTaskLine = lineNumber;
            
            // Insert the start time marker
            editor.edit(editBuilder => {
                editBuilder.insert(endPosition, ` ${timeString}`);
            });
            
            // Inform the user that time tracking has started
            vscode.window.showInformationMessage('Time tracking started');
        } 
        // If there's already an active timer, end it
        else {
            const now = new Date();
            const endHours = now.getHours();
            const endMinutes = now.getMinutes();
            
            // Convert to 12-hour format for display
            const endHour12 = endHours % 12 || 12;
            const endAmpm = endHours >= 12 ? 'pm' : 'am';
            
            // Calculate elapsed time
            const elapsedMs = now.getTime() - TimeTracker.startTime.getTime();
            const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
            const elapsedHours = Math.floor(elapsedMinutes / 60);
            const remainingMinutes = elapsedMinutes % 60;
            
            // Format the elapsed time
            let elapsedTimeStr = '';
            if (elapsedHours > 0) {
                elapsedTimeStr = `${elapsedHours}h ${remainingMinutes}m`;
            } else {
                elapsedTimeStr = `${elapsedMinutes}m`;
            }
            
            // Format the end time string
            const endTimeString = ` [Task Ended at -> ${endHour12}:${endMinutes.toString().padStart(2, '0')} ${endAmpm}] [Duration: ${elapsedTimeStr}]`;
            
            // Insert the end time marker
            editor.edit(editBuilder => {
                editBuilder.insert(endPosition, endTimeString);
            });
            
            // Reset the timer
            TimeTracker.startTime = null;
            TimeTracker.activeTaskLine = null;
            
            // Inform the user that time tracking has ended
            vscode.window.showInformationMessage(`Time tracking ended. Duration: ${elapsedTimeStr}`);
        }
    }
}