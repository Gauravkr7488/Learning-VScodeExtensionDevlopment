"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const ymlExtractor_1 = require("./ymlExtractor");
function activate(context) {
    // Command for "-->{text}<:"
    const copyAsF2YamlReference = vscode.commands.registerCommand('f2toolinterface.CopyAsF2YamlReference', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        const position = editor.selection.active;
        const extractor = new ymlExtractor_1.YamlKeyExtractor(document, position);
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
        const extractor = new ymlExtractor_1.YamlKeyExtractor(document, position);
        await extractor.extractYamlKey();
        let fullPath = extractor.fullPath();
        vscode.window.showInformationMessage(`'${fullPath}' copied to your clipboard`);
        let formattedText = `$@${fullPath}@$`;
        vscode.env.clipboard.writeText(formattedText);
    });
    context.subscriptions.push(copyAsF2YamlReference, copyAsCustomFormat);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map