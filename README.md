# VSCode Extension: Menu Builder

Build custom command menus from your settings.json.

## Features

Credit for this extension's functionality and API go to **@maruruh** and [Quick Menu Builder](https://marketplace.visualstudio.com/items?itemName=maruruh.vscode-quick-menu-builder)!

I wrote this replacement extension for two reasons:

- Add modern VSCode extension enhancements (like settings.json intellisense)
- Open Source
  - [maruruh/vscode-quick-menu-builder](https://github.com/maruruh/vscode-quick-menu-builder) is curretly not public, and I don't like to rely on extensions that I can not make a fork/backup of. (I.e. I don't want the unpublishing of an extension from the VSCode Marketplace to affect me.)

![Custom Menu](https://raw.githubusercontent.com/kylpo/vscode-menu-builder/main/assets/Custom-Menu.jpg)

## Extension Settings

Example [settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations):

```json5
"extension.menuBuilder": [
    {
        "id": "textMenu",
        "items": [
            {
                "label": "To Upper case",
                "command": "editor.action.transformToUppercase"
            },
            {
                "label": "To Lower case",
                "command": "editor.action.transformToLowercase"
            },
            {
                "label": "Comment Line",
                "description": "Switch comment lines",
                "command": "editor.action.commentLine"
            },
            // Note: this opens another menu (as a submenu)! 😎
            {
                "label": "Indent Submenu",
                "command": "extension.menuBuilder",
                "args": "indentSubmenu"
            }
        ]
    },
    {
        "id": "indentSubmenu",
        "items": [
            {
                "label": "Indent To Tabs",
                "command": "editor.action.indentationToTabs"
            },
            {
                "label": "Indent To Spaces",
                "command": "editor.action.indentationToSpaces"
            }
        ]
    }
],
```

And [keybindings.json](https://code.visualstudio.com/docs/getstarted/keybindings#_advanced-customization) to use the menu:

```json
{
  "key": "ctrl+cmd+t",
  "command": "extension.menuBuilder",
  "args": "textMenu",
  "when": "editorTextFocus"
}
```

## Release Notes

### 1.0.0

Initial release
