export type Position = [number, number];

export enum Rotation {
  NONE = "NONE",
  CLOCKWISE = "CLOCKWISE",
  BACK = "BACK",
  COUNTERCLOCKWISE = "COUNTERCLOCKWISE"
}

export enum EntityType {
  HIVELING = "HIVELING",
  NUTRITION = "NUTRITION",
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
  | { type: DecisionType.TURN; rotation: Rotation }
  | { type: DecisionType.DROP }
  | { type: DecisionType.MOVE }
  | { type: DecisionType.PICKUP }
  | { type: DecisionType.WAIT };

export interface Input {
  visibleEntities: Entity[];
  currentHiveling: CurrentHiveling;
  randomSeed: string;
}

export interface Output {
  decision: Decision;
  memory64: string;
}

export type HivelingMind = (input: Input) => Promise<Output>;

export interface EntityBase {
  position: Position;
  zIndex: number;
}

export interface HivelingDetails {
  type: EntityType.HIVELING;
  hasNutrition: boolean;
}
export interface CurrentHivelingDetails extends HivelingDetails {
  memory64: string;
}

export type Hiveling = EntityBase & HivelingDetails;
export type CurrentHiveling = EntityBase & CurrentHivelingDetails;

export interface TrailDetails {
  type: EntityType.TRAIL;
  lifetime: number;
  orientation: Rotation;
}
export type Trail = EntityBase & TrailDetails;

export type Entity = EntityBase &
  (
    | Hiveling
    | Trail
    | { type: EntityType.NUTRITION }
    | { type: EntityType.HIVE_ENTRANCE }
    | { type: EntityType.OBSTACLE }
  );

export const isHiveling = (e: Entity): e is Hiveling =>
  e.type === EntityType.HIVELING;
