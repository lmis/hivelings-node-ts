export type Position = [number, number];
export enum EntityType {
  HIVELING = "HIVELING",
  FOOD = "FOOD",
  OBSTACLE = "OBSTACLE",
  TRAIL = "TRAIL",
  HIVE_ENTRANCE = "HIVE_ENTRANCE"
}

export enum DecisionType {
  TURN = "TURN",
  MOVE = "MOVE",
  PICKUP = "PICKUP",
  DROP = "DROP",
  WAIT = "WAIT"
}

export type Decision =
  | { type: DecisionType.TURN; degrees: number }
  | { type: DecisionType.DROP }
  | { type: DecisionType.MOVE; distance: number }
  | { type: DecisionType.PICKUP }
  | { type: DecisionType.WAIT };

export interface Output {
  decision: Decision;
  memory64: string;
}

export interface EntityBase {
  position: Position;
  zIndex: number;
}

export interface HivelingDetails {
  type: EntityType.HIVELING;
  hasFood: boolean;
}
export interface CurrentHivelingDetails extends HivelingDetails {
  memory64: string;
}

export type Hiveling = EntityBase & HivelingDetails;
export type CurrentHiveling = EntityBase & CurrentHivelingDetails;

export interface TrailDetails {
  type: EntityType.TRAIL;
  lifetime: number;
  orientation: number;
}
export type Trail = EntityBase & TrailDetails;

export type Entity = EntityBase &
  (
    | Hiveling
    | Trail
    | { type: EntityType.FOOD }
    | { type: EntityType.HIVE_ENTRANCE }
    | { type: EntityType.OBSTACLE }
  );

export const isHiveling = (e: Entity): e is Hiveling =>
  e.type === EntityType.HIVELING;

export interface Input {
  maxMoveDistance: number;
  interactableEntities: Entity[];
  visibleEntities: Entity[];
  currentHiveling: CurrentHiveling;
  randomSeed: string;
}
