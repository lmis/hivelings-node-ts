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
  | { type: DecisionType.PICKUP; index: number }
  | { type: DecisionType.WAIT };

export interface Hiveling {
  midpoint: Position;
  zIndex: number;
  type: EntityType.HIVELING;
  carriedType: EntityType | null;
}

export interface Trail {
  midpoint: Position;
  zIndex: number;
  type: EntityType.TRAIL;
  lifetime: number;
  orientation: number;
}

export interface Food {
  midpoint: Position;
  zIndex: number;
  type: EntityType.FOOD;
}

export interface Obstacle {
  midpoint: Position;
  zIndex: number;
  type: EntityType.OBSTACLE;
}

export interface HiveEntrance {
  midpoint: Position;
  zIndex: number;
  type: EntityType.HIVE_ENTRANCE;
}

export type Entity = Hiveling | Trail | Food | HiveEntrance | Obstacle;

export interface Input<T> {
  maxMoveDistance: number;
  interactableEntities: Entity[];
  visibleEntities: Entity[];
  carriedType: EntityType | null;
  memory: T | null;
  randomSeed: string;
}

export interface Output<T> {
  decision: Decision;
  memory: T;
  show?: string;
}
