import { StateManager, StateLoader } from "sfawd";

export class HTMLStateLoader extends StateLoader {
    getData(): object {
        const data = localStorage.getItem("app-data") || {};
        return data;
    }

    save(appState: StateManager): void {
        localStorage.setItem("app-data", appState.toObject());
    }

    load(appState: StateManager): void {
        super.load(appState, this.getData());
    }
}
