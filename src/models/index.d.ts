import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum TimeOfDay {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
  BEDTIME = "BEDTIME"
}

export enum PersonalityTrait {
  EXT1 = "EXT1",
  EXT2 = "EXT2",
  FRI1 = "FRI1",
  FRI2 = "FRI2",
  HAP1 = "HAP1",
  HAP2 = "HAP2",
  INT1 = "INT1",
  INT2 = "INT2",
  RES1 = "RES1",
  RES2 = "RES2",
  SER1 = "SER1",
  SER2 = "SER2",
  SUS1 = "SUS1",
  SUS2 = "SUS2",
  TIM1 = "TIM1",
  TIM2 = "TIM2",
  CAR1 = "CAR1",
  CAR2 = "CAR2",
  CLE1 = "CLE1",
  CLE2 = "CLE2",
  CLV1 = "CLV1",
  CLV2 = "CLV2",
  CRE1 = "CRE1",
  CRE2 = "CRE2",
  CUR1 = "CUR1",
  CUR2 = "CUR2",
  DAR1 = "DAR1",
  DAR2 = "DAR2",
  ADV1 = "ADV1",
  ADV2 = "ADV2",
  AGR1 = "AGR1",
  AGR2 = "AGR2",
  COU1 = "COU1",
  COU2 = "COU2",
  PER1 = "PER1",
  PER2 = "PER2",
  ROM1 = "ROM1",
  ROM2 = "ROM2",
  SOC1 = "SOC1",
  SOC2 = "SOC2",
  EMO1 = "EMO1",
  EMO2 = "EMO2",
  OUT1 = "OUT1",
  OUT2 = "OUT2",
  COM1 = "COM1",
  COM2 = "COM2",
  PLA1 = "PLA1",
  PLA2 = "PLA2"
}

export enum Education {
  GRADESCHOOL = "GRADESCHOOL",
  HIGHSCHOOL = "HIGHSCHOOL",
  TECHSCHOOL = "TECHSCHOOL",
  HIGHGRAD = "HIGHGRAD",
  COLLEGEGRAD = "COLLEGEGRAD",
  COLLEGE = "COLLEGE",
  GRADSCHOOL = "GRADSCHOOL"
}

export enum Relationship {
  MOM = "MOM",
  DAD = "DAD",
  WIFE = "WIFE",
  HUSBAND = "HUSBAND",
  SON = "SON",
  DAUGHTER = "DAUGHTER",
  GRANDDAUGHTER = "GRANDDAUGHTER",
  GRANDSON = "GRANDSON",
  GRANDCHILD = "GRANDCHILD",
  CHILD = "CHILD",
  PARENT = "PARENT",
  SPOUSE = "SPOUSE",
  SISTER = "SISTER",
  BROTHER = "BROTHER",
  SIBLING = "SIBLING"
}

export enum Locations {
  UNITY = "UNITY",
  BROOKDALE = "BROOKDALE",
  MAPLE = "MAPLE"
}

type QuestionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RoutineMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RelativeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PatientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Question {
  readonly id: string;
  readonly prompt?: string | null;
  readonly response?: string | null;
  readonly patientID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Question, QuestionMetaData>);
  static copyOf(source: Question, mutator: (draft: MutableModel<Question, QuestionMetaData>) => MutableModel<Question, QuestionMetaData> | void): Question;
}

export declare class Routine {
  readonly id: string;
  readonly timeOfDay?: TimeOfDay | keyof typeof TimeOfDay | null;
  readonly routineExplanation?: string | null;
  readonly patientID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Routine, RoutineMetaData>);
  static copyOf(source: Routine, mutator: (draft: MutableModel<Routine, RoutineMetaData>) => MutableModel<Routine, RoutineMetaData> | void): Routine;
}

export declare class Relative {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly relationship?: Relationship | keyof typeof Relationship | null;
  readonly patientID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Relative, RelativeMetaData>);
  static copyOf(source: Relative, mutator: (draft: MutableModel<Relative, RelativeMetaData>) => MutableModel<Relative, RelativeMetaData> | void): Relative;
}

export declare class Patient {
  readonly id: string;
  readonly location: Locations | keyof typeof Locations;
  readonly firstName: string;
  readonly lastName: string;
  readonly birthPlace?: string | null;
  readonly dateOfBirth: string;
  readonly Relatives?: (Relative | null)[] | null;
  readonly education?: (Education | null)[] | keyof typeof Education | null;
  readonly personalityTraits?: (PersonalityTrait | null)[] | keyof typeof PersonalityTrait | null;
  readonly notes?: string | null;
  readonly Routines?: (Routine | null)[] | null;
  readonly familyEmails?: (string | null)[] | null;
  readonly Questions?: (Question | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Patient, PatientMetaData>);
  static copyOf(source: Patient, mutator: (draft: MutableModel<Patient, PatientMetaData>) => MutableModel<Patient, PatientMetaData> | void): Patient;
}