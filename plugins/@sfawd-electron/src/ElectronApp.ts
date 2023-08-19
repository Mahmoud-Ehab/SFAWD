import { UIApp } from "sfawd";
import { BrowserWindow, app } from "electron";
import { ElectronScreen } from "./ElectronScreen";

export class ElectronApp implements UIApp<ElectronScreen> {
    private rootDir: string;
    private screens: ElectronScreen[];
    private window: BrowserWindow;

    addScreen(screen: ElectronScreen): void {
        screen.setRootDir(this.rootDir);
        screen.create();
        this.screens.push(screen);
    }

    loadScreenByName(screenName: string) {
        for (let screen of this.screens) {
            if (screen.getName() === screenName) {
                this.loadScreen(screen);
                return;
            }
        }
        throw Error(`Error: no screen has the name ${screenName}.`);
    }

    loadScreen(screen: ElectronScreen) {
        if (!this.window)
            throw Error("Error: you shall start the app first.");
        this.window.loadFile(`${this.rootDir}/${screen.getName()}.html`);
    }

    start(callback: Function, windowOptions?: Electron.BrowserWindowConstructorOptions): void {
        this.window = new BrowserWindow(windowOptions);

        app.on("ready", () => {
            const screen = this.screens[0];
            if (screen)
                this.loadScreen(screen);
        });

        app.on("browser-window-created", () => callback());
    }

    close(callback: Function): void {
        app.on("will-quit", () => callback());
        app.quit();
    }
}

export { ElectronScreen };
