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

export interface Hiveling {
  position: Position;
  zIndex: number;
  type: EntityType.HIVELING;
  hasFood: boolean;
}

export interface CurrentHiveling extends Hiveling {
  memory64: string;
}

export interface Trail {
  position: Position;
  zIndex: number;
  type: EntityType.TRAIL;
  lifetime: number;
  orientation: number;
}

export interface Food {
  position: Position;
  zIndex: number;
  type: EntityType.FOOD;
}

export interface Obstacle {
  position: Position;
  zIndex: number;
  type: EntityType.OBSTACLE;
}

export interface HiveEntrance {
  position: Position;
  zIndex: number;
  type: EntityType.HIVE_ENTRANCE;
}

export type Entity = Hiveling | Trail | Food | HiveEntrance | Obstacle;

export const isHiveling = (e: Entity): e is Hiveling =>
  e.type === EntityType.HIVELING;

export interface Input {
  maxMoveDistance: number;
  interactableEntities: Entity[];
  visibleEntities: Entity[];
  currentHiveling: CurrentHiveling;
  randomSeed: string;
}
