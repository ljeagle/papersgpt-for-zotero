import { BasicTool } from "zotero-plugin-toolkit";
import Addon from "./addon";
import { config } from "../package.json";
import { MyToolkit } from "./ztoolkit"

const basicTool = new BasicTool();


if (!basicTool.getGlobal("Zotero")[config.addonInstance]) {
  // Set global variables
  let window: Window
  _globalThis.Zotero = basicTool.getGlobal("Zotero");
  _globalThis.ZoteroPane = basicTool.getGlobal("ZoteroPane");
  _globalThis.Zotero_Tabs = basicTool.getGlobal("Zotero_Tabs");
  _globalThis.window = window = basicTool.getGlobal("window");
  _globalThis.URL = basicTool.getGlobal("window").URL;
  _globalThis.URLSearchParams = basicTool.getGlobal("window").URLSearchParams;
  _globalThis.Headers = basicTool.getGlobal("window").Headers;
  _globalThis.AbortSignal = basicTool.getGlobal("window").AbortSignal;
  _globalThis.Request = basicTool.getGlobal("window").Request;
  _globalThis.AbortSignal.timeout = (ms: number) => {
    // @ts-ignore
    const controller = new window.AbortController();
    const timer = window.setTimeout(() => controller.abort(), ms);
    controller.signal.addEventListener("abort", () => {
      window.clearTimeout(timer);
    });
    return controller.signal;
  }

  _globalThis.document = basicTool.getGlobal("document");
  _globalThis.addon = new Addon();
  //_globalThis.ztoolkit = _globalThis.addon.data.ztoolkit//addon.data.ztoolkit;
  _globalThis.ztoolkit = _globalThis.addon.data.ztoolkit //addon.data.ztoolkit;
  /*  
  defineGlobal("ztoolkit", () => {
    return <MyToolkit>(_globalThis.addon.data.ztoolkit);
  });
  */ 
  ztoolkit.basicOptions.log.prefix = `[${config.addonName}]`;
  ztoolkit.basicOptions.log.disableConsole = addon.data.env === "production";
  ztoolkit.UI.basicOptions.ui.enableElementJSONLog = false
  ztoolkit.UI.basicOptions.ui.enableElementDOMLog = false
  ztoolkit.basicOptions.debug.disableDebugBridgePassword =
    addon.data.env === "development";
  Zotero[config.addonInstance] = addon;
  // Trigger addon hook for initialization
  addon.hooks.onStartup();
}

function defineGlobal(name: Parameters<BasicTool["getGlobal"]>[0]): void;
function defineGlobal(name: string, getter: () => any): void;
function defineGlobal(name: string, getter?: () => any) {
  Object.defineProperty(_globalThis, name, {
    get() {
      return getter ? getter() : basicTool.getGlobal(name);
    },
  });
}
 


