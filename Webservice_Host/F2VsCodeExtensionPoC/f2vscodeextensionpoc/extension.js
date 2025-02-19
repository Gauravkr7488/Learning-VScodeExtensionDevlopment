const vscode = require('vscode');
const { StartServer, eventEmitter  } = require('./server.js');
// const { Message } = require('./server.js');
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

	eventEmitter.on('messageUpdated', (newMessage) => {
		vscode.window.showInformationMessage(newMessage);
	});

	const disposable = vscode.commands.registerCommand('f2vscodeextensionpoc.helloWorld', function () {
		
		// vscode.window.showInformationMessage(getMessage());
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
