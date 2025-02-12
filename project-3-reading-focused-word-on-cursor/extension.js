const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('extension-poc.GetWord', function () {

		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		const wordRange = editor.document.getWordRangeAtPosition(selection.active);

		if (wordRange) {
			const word = editor.document.getText(wordRange);
			vscode.window.showInformationMessage(`Focused Word: ${word}`);
		} else {
			// If no word is found under the cursor, show a different message.
			vscode.window.showInformationMessage("No word found under cursor.");
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
