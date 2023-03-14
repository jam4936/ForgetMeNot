// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Section = {
    "ABOUTYOU": "ABOUTYOU",
    "ABOUTLIFE": "ABOUTLIFE",
    "INTERESTS": "INTERESTS",
    "DAILYSCHED": "DAILYSCHED"
};

const QuesType = {
    "SINGLELINE": "SINGLELINE",
    "MULTILINE": "MULTILINE",
    "OPTIONSELECT": "OPTIONSELECT",
    "CHECKBOXES": "CHECKBOXES"
};

const Size = {
    "FULL": "FULL",
    "SMALL": "SMALL"
};

const { Patient, Response, Question } = initSchema(schema);

export {
    Patient,
    Response,
    Question,
    Section,
    QuesType,
    Size
};