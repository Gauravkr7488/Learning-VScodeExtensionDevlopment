const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('extension-poc.GetWord', async function () {

		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		const wordRange = editor.document.getWordRangeAtPosition(selection.active);

		if (wordRange) {
			const word = editor.document.getText(wordRange);
			vscode.window.showInformationMessage(`Focused Word: ${word}`);

			let url = "http://localhost:5229/api/string"; // add the url

			try {
				const response = await axios.post(url, { word });
				vscode.window.showInformationMessage(`Response: ${response.data}`);
			} catch (error) {
				vscode.window.showErrorMessage(`API Error: ${error.message}`);
			}

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
