# Requirments

- There should be a test console app created which hosts 1 webservice, accepting 1 string parameter. Whenever this service is called, it should write the received string to the console.          
- The PoC should be able to call this webservice if the context menu entry is clicked with the word under the cursor as parameter.

# Work Flow
- Given:
	- There's an extension ("F2VsCodeExtensionPoC") installed and enabled in VS Code which registers a keyboard shortcut "KeyShortcut"
	- There's a console app ("F2ConsolePoC") started and running, hosting the above mentioned webservice
- When:                
	 - In VS Code, the cursor is on on a word ("CurrentWord")
	 - The keyboard shortcut KeyShortcut is pressed
- Then:
	 - The F2VsCodeExtensionPoC extension calls the webservice hosted by F2ConsolePoC app and sends CurrentWord as the parameter
	- The F2ConsolePoC app prints this received word - which should be the "CurrentWord" - to the console