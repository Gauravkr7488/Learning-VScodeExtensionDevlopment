import * as vscode from 'vscode';
import { SR_templateGenerator } from './SR_TemplateGenerator'


export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('timetrackerex.insertTemplate', () => {
		const templateMaker = new SR_templateGenerator;
		templateMaker.insertTemplate()
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
