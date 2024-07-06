const vscode = require('vscode');
const arrayConfigContent = require('./arrayConfigContent');


let disposableProvider = null;

function activate(context) {
    console.log('Extension activated');
    vscode.window.showInformationMessage('Kconfig extension activated');
    registerCompletionProviders(context);
}

function registerCompletionProviders(context) {
    console.log('Registering completion providers');
    disposeCompletionProviders();

    disposableProvider = vscode.languages.registerCompletionItemProvider(
        { language: '*', scheme: 'file' },
        {
            provideCompletionItems: provideCompletionItems
        }
    );

    context.subscriptions.push(disposableProvider);
}

function provideCompletionItems(document, position) {
    console.log('Providing completion items');
    const linePrefix = document.lineAt(position).text.substr(0, position.character);
    console.log('Line prefix:', linePrefix);
    
    const suggestions = [];
    for (let i = 0; i < arrayConfigContent.length; i++) {
        const key = Object.keys(arrayConfigContent[i])[0];
        const value = arrayConfigContent[i][key];
        
        if (key.startsWith(linePrefix)) {
            suggestions.push(
                createCompletionItem(
                    key,
                    value
                )
            );
        }
    }
    console.log('Suggestions:', suggestions);
    return suggestions;
}

function createCompletionItem(label, detail) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
    item.detail = detail;
    item.insertText = new vscode.SnippetString(detail); // Adjusted to insert the value
    return item;
}

function disposeCompletionProviders() {
    if (disposableProvider) {
        disposableProvider.dispose();
        disposableProvider = null;
    }
}

function deactivate() {
    disposeCompletionProviders();
    console.log('Extension deactivated');
}

module.exports = {
    activate,
    deactivate
};

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
    }
    return true;
}
