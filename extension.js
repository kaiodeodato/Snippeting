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
        console.log("refresh")
        delete require.cache[require.resolve(filePath)];
        fs.readFile(filePath, 'utf8', (err, data) => {
            console.log("data")
            console.log(data)
          if (err) {
            vscode.window.showErrorMessage(`Failed to read ${filePath}: ${err.message}`);
            return; // Exit the function if there's an error
          }
          try {
            kconfigContent = require(filePath);
            console.log("kconfigContent")
            console.log(kconfigContent)
          } catch (error) {
            vscode.window.showErrorMessage(`Error parsing ${filePath}: ${error.message}`);
            kconfigContent = []; // Set kconfigContent to empty array on parsing error
          }
          registerCompletionProviders();
        });
      };

    updateKconfigContent(filePath);
    watcher.onDidChange(() => {
        console.log(kconfigContent)
        updateKconfigContent(filePath);
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
