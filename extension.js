const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let kconfigContent = [];
let disposableProvider = null;

function activate(context) {
    const fileName = 'sconfig.js';
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders && workspaceFolders.length > 0) {
        const firstWorkspaceFolder = workspaceFolders[0];
        const filePath = path.join(firstWorkspaceFolder.uri.fsPath, fileName);
        const watcher = vscode.workspace.createFileSystemWatcher(filePath);

        const updateKconfigContent = (filePath) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    vscode.window.showErrorMessage(`Failed to read ${filePath}: ${err.message}`);
                    return;
                }
                const newContent = JSON.parse(data);
                if (!arraysAreEqual(kconfigContent, newContent)) {
                    kconfigContent = newContent;
                    registerCompletionProviders();
                    console.log(`Conteúdo do arquivo ${filePath}:`, kconfigContent);
                }
            });
        };

        updateKconfigContent(filePath);

        watcher.onDidChange((uri) => {
            console.log("Escrevi em kconfig.js");
            vscode.window.showInformationMessage("Escrevi em kconfig.js");
            updateKconfigContent(uri.fsPath);
            console.log(uri.fsPath);
        });

        context.subscriptions.push(watcher);

    } else {
        vscode.window.showErrorMessage('No workspace folder found.');
    }
}

function registerCompletionProviders() {
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
    const range = document.getWordRangeAtPosition(position);
    const inputText = document.getText(range);

    const suggestions = [];
    for (let i = 0; i < kconfigContent.length; i++) {
        const key = Object.keys(kconfigContent[i])[0];
        const value = kconfigContent[i][key];
        
        if (inputText === key) {
            suggestions.push(
                createCompletionItem(
                    `${key}\n${value}`,
                    'component react'
                )
            );
        }
    }

    return suggestions;
}

function createCompletionItem(label, detail) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
    item.detail = detail;
    item.insertText = new vscode.SnippetString(label);
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

