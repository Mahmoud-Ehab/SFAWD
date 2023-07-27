import { Entity } from "./Storage/Entity";
import { AppState } from "./Storage/AppState";
import { ListState } from "./ListState";

// substitutes to Enitity<...> for more readability.
type AnyEntity = Entity<any, any, any>;
type RootEntity = Entity<string, AppState<AnyEntity>, {}>;

export const StateManager = new ListState<RootEntity>();
