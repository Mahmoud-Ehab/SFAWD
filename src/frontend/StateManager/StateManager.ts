import { Entity } from "./Storage/Entity";
import { ListState } from "./ListState";
import { AppState } from "./Storage/AppState";
import { StateLoader } from "./StateLoader";

// substitutes to Enitity<...> for more readability.
type AnyEntity = Entity<any, any, any>;
type RootEntity = Entity<string, AppState<AnyEntity>, {}>;

export class StateManager extends ListState<RootEntity> {
    private loader: StateLoader;

    setStateLoader(loader: StateLoader) {
        this.loader = loader;
    }

    save() {
        if (!this.loader)
            throw Error("Error: you shall first use setStateLoader() method.");
        this.loader.save(this);
    }

    load() {
        if (!this.loader)
            throw Error("Error: you shall first use setStateLoader() method.");
        this.loader.load(this);
    }
}

export const stateManager = new StateManager();
