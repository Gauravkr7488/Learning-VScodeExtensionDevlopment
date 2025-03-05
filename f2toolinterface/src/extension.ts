import * as vscode from 'vscode';
import { YamlKeyExtractor } from './ymlExtractor';

export function activate(context: vscode.ExtensionContext) {
    
    // Command for "-->{text}<:"
    const copyAsF2YamlReference = vscode.commands.registerCommand('f2toolinterface.CopyAsF2YamlReference', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const position = editor.selection.active;
        const extractor = new YamlKeyExtractor(document, position);
        await extractor.extractYamlKey();
        let fullPath = extractor.fullPath();
        vscode.window.showInformationMessage(`'${fullPath}' copied to your clipboard`);
        let formattedText = `-->${fullPath}<:`;
        vscode.env.clipboard.writeText(formattedText);
    });

    // Command for "$@{text}@$"
    const copyAsCustomFormat = vscode.commands.registerCommand('f2toolinterface.CopyAsF2YamlLink', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const position = editor.selection.active;
        const extractor = new YamlKeyExtractor(document, position);
        await extractor.extractYamlKey();
        let fullPath = extractor.fullPath();
        vscode.window.showInformationMessage(`'${fullPath}' copied to your clipboard`);
        let formattedText = `$@${fullPath}@$`;
        vscode.env.clipboard.writeText(formattedText);
    });

    context.subscriptions.push(copyAsF2YamlReference, copyAsCustomFormat);
}

export function deactivate() { }
