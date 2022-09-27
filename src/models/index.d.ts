import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type PatientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Patient {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Patient, PatientMetaData>);
  static copyOf(source: Patient, mutator: (draft: MutableModel<Patient, PatientMetaData>) => MutableModel<Patient, PatientMetaData> | void): Patient;
}