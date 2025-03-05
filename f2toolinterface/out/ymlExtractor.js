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
exports.YamlKeyExtractor = void 0;
const vscode = __importStar(require("vscode"));
class YamlKeyExtractor {
    document;
    position;
    extractedSymbols;
    constructor(document, position) {
        this.document = document;
        this.position = position;
        this.extractedSymbols = [];
    }
    async extractYamlKey() {
        let symbols = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', this.document.uri);
        if (symbols === undefined) {
            return;
        }
        this.cursorSymbols(symbols);
    }
    fullPath() {
        // Fetch separator and ignored words from settings
        const config = vscode.workspace.getConfiguration('yamlPathExtractor');
        const separator = config.get('pathSeparator', '.');
        const ignoreWords = config.get('ignoreWords', []);
        console.log('Separator:', separator);
        console.log('Ignore Words:', ignoreWords);
        console.log('Extracted Symbols:', this.extractedSymbols);
        // Filter out ignored words from extracted YAML keys
        let filteredSymbols = this.extractedSymbols.map(symbol => {
            ignoreWords.forEach(word => {
                symbol = symbol.replace(new RegExp(`\\b${word}\\b`, 'g'), '').trim();
            });
            return symbol;
        }).filter(symbol => symbol !== '');
        return filteredSymbols.join(separator);
    }
    cursorSymbols(symbols) {
        for (const symbol of symbols) {
            if (!symbol.range.contains(this.position)) {
                continue;
            }
            if (this.shouldAddSymbol(symbol)) {
                this.extractedSymbols.push(symbol.name);
            }
            if (!symbol.children) {
                return;
            }
            this.cursorSymbols(symbol.children);
        }
    }
    shouldAddSymbol(symbol) {
        const config = vscode.workspace.getConfiguration('yamlPathExtractor');
        const ignoreFilenameRoot = config.get('ignoreFilenameRoot', false);
        if (!ignoreFilenameRoot) {
            return true;
        }
        let fileName = this.document.fileName;
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        return (this.extractedSymbols.length > 0 ||
            symbol.name !== fileName.substring(0, fileName.lastIndexOf('.')));
    }
}
exports.YamlKeyExtractor = YamlKeyExtractor;
//# sourceMappingURL=ymlExtractor.js.map