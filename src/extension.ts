import * as vscode from "vscode";

type MenuItem = {
  label: string;
  command: string;
  args?: string | object;
  description?: string;
};

type Menu = {
  id: string;
  items: Array<MenuItem>;
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const menusFromConfig = vscode.workspace
    .getConfiguration("extension")
    .get<Array<Menu>>("menuBuilder");

  if (menusFromConfig === undefined) {
    console.error("Menu Builder requires configuration in your settings.json");
    return;
  }

  let disposable = vscode.commands.registerCommand(
    "extension.menuBuilder",
    (menuId) => {
      // Abort if menu name is not specified in keybind's `args` property
      if (menuId == null) {
        console.error(
          "calling extension.menuBuilder requires an `args` property with the menu name"
        );
        return;
      }

      // Get the menu
      const menu = menusFromConfig.find((menu) => menu.id === menuId);
      if (menu === undefined) {
        console.error(
          `could not find "${menuId}" in your "extension.menuBuilder" configuration of settings.json`
        );
        return;
      }

      // Show the menu
      vscode.window.showQuickPick(menu.items).then((item) => {
        if (item == null) return;

        // Execute selected command
        vscode.commands.executeCommand(item.command, item.args);
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
