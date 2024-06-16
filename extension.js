const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// only one time 
	console.log('Congratulations, your extension "kaioextension" is now active!');

	const disposable = vscode.commands.registerCommand('kaioextension.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from kaioExtension!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
