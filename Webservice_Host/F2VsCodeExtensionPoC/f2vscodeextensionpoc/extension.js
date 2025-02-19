const vscode = require('vscode');
const { StartServer } = require('./server.js');
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	try {
		await StartServer(); // Ensure server starts before proceeding
		console.log("Server started successfully");
	} catch (error) {
		console.error("Failed to start server:", error);
	}
	const disposable = vscode.commands.registerCommand('f2vscodeextensionpoc.helloWorld', function () {

		vscode.window.showInformationMessage('Hello World from F2VsCodeExtensionPoC!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
