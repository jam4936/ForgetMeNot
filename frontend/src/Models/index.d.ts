import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum Section {
    ABOUTYOU = "ABOUTYOU",
    ABOUTLIFE = "ABOUTLIFE",
    INTERESTS = "INTERESTS",
    DAILYSCHED = "DAILYSCHED"
}

export enum QuesType {
    SINGLELINE = "SINGLELINE",
    MULTILINE = "MULTILINE",
    OPTIONSELECT = "OPTIONSELECT",
    CHECKBOXES = "CHECKBOXES"
}

export enum Size {
    FULL = "FULL",
    SMALL = "SMALL"
}

type PatientMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResponseMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuestionMetaData = {
    readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Patient {
    readonly id: string;
    readonly firstName?: string | null;
    readonly lastName?: string | null;
    readonly birthDate?: string | null;
    readonly Responses?: (Response | null)[] | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
    constructor(init: ModelInit<Patient, PatientMetaData>);
    static copyOf(source: Patient, mutator: (draft: MutableModel<Patient, PatientMetaData>) => MutableModel<Patient, PatientMetaData> | void): Patient;
}

export declare class Response {
    readonly id: string;
    readonly userResponse?: string | null;
    readonly patientID: string;
    readonly questionID: string;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
    constructor(init: ModelInit<Response, ResponseMetaData>);
    static copyOf(source: Response, mutator: (draft: MutableModel<Response, ResponseMetaData>) => MutableModel<Response, ResponseMetaData> | void): Response;
}

export declare class Question {
    readonly id: string;
    readonly prompt?: string | null;
    readonly size?: Size | keyof typeof Size | null;
    readonly type?: QuesType | keyof typeof QuesType | null;
    readonly section?: Section | keyof typeof Section | null;
    readonly Responses?: (Response | null)[] | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
    constructor(init: ModelInit<Question, QuestionMetaData>);
    static copyOf(source: Question, mutator: (draft: MutableModel<Question, QuestionMetaData>) => MutableModel<Question, QuestionMetaData> | void): Question;
}