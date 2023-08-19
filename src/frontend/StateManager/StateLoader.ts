import { StateFactory } from "./StateFactory";
import { StateManager } from "./StateManager";

export abstract class StateLoader {
    getData(): object {
        throw Error("Error: method is not implemented.");
    }

    save(appState: StateManager) {
        throw Error("Error: method is not implemented.");
    }

    load(appState: StateManager, newData?: object) {
        const data = newData || this.getData();

        for (let entityKey in data) {
            const entityValue = data[entityKey];

            if (typeof entityValue === "object" && entityValue !== null) {
                if (this.includesObject(entityValue)) {
                    const State = new StateFactory<any>().createListState();
                    const listState = new State() as unknown as StateManager;
                    this.load(listState, entityValue);
                    appState.addEntity(entityKey, listState);
                    continue;
                }
            }

            const State = new StateFactory<typeof entityValue>().createSingleState();
            const singleState = new State(entityValue);
            appState.addEntity(entityKey, singleState);
        }
    }

    private includesObject(obj: object): boolean {
        for (let key in obj) {
            if (typeof obj[key] === "object" && obj[key] !== null)
                return true;
        }
        return false;
    }
}