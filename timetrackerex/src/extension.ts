import * as vscode from 'vscode';
import { SR_templateGenerator } from './SR_TemplateGenerator'
import { TimeTracker } from './TimeTracker'

export function activate(context: vscode.ExtensionContext) {
    const templateDisposable = vscode.commands.registerCommand('timetrackerex.insertTemplate', () => {
        const templateMaker = new SR_templateGenerator();
        templateMaker.insertTemplate();
    });
   
    const timeTrackerDisposable = vscode.commands.registerCommand('timetrackerex.timeTracker', () => {
        const timeTracker = new TimeTracker();
        timeTracker.timeTrackerStart();
    });

    // Push both disposables to the subscriptions array
    context.subscriptions.push(templateDisposable, timeTrackerDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}