// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TimeOfDay = {
  "MORNING": "MORNING",
  "AFTERNOON": "AFTERNOON",
  "EVENING": "EVENING",
  "BEDTIME": "BEDTIME"
};

const PersonalityTrait = {
  "EXT1": "EXT1",
  "EXT2": "EXT2",
  "FRI1": "FRI1",
  "FRI2": "FRI2",
  "HAP1": "HAP1",
  "HAP2": "HAP2",
  "INT1": "INT1",
  "INT2": "INT2",
  "RES1": "RES1",
  "RES2": "RES2",
  "SER1": "SER1",
  "SER2": "SER2",
  "SUS1": "SUS1",
  "SUS2": "SUS2",
  "TIM1": "TIM1",
  "TIM2": "TIM2",
  "CAR1": "CAR1",
  "CAR2": "CAR2",
  "CLE1": "CLE1",
  "CLE2": "CLE2",
  "CLV1": "CLV1",
  "CLV2": "CLV2",
  "CRE1": "CRE1",
  "CRE2": "CRE2",
  "CUR1": "CUR1",
  "CUR2": "CUR2",
  "DAR1": "DAR1",
  "DAR2": "DAR2",
  "ADV1": "ADV1",
  "ADV2": "ADV2",
  "AGR1": "AGR1",
  "AGR2": "AGR2",
  "COU1": "COU1",
  "COU2": "COU2",
  "PER1": "PER1",
  "PER2": "PER2",
  "ROM1": "ROM1",
  "ROM2": "ROM2",
  "SOC1": "SOC1",
  "SOC2": "SOC2",
  "EMO1": "EMO1",
  "EMO2": "EMO2",
  "OUT1": "OUT1",
  "OUT2": "OUT2",
  "COM1": "COM1",
  "COM2": "COM2",
  "PLA1": "PLA1",
  "PLA2": "PLA2"
};

const Education = {
  "GRADESCHOOL": "GRADESCHOOL",
  "HIGHSCHOOL": "HIGHSCHOOL",
  "TECHSCHOOL": "TECHSCHOOL",
  "HIGHGRAD": "HIGHGRAD",
  "COLLEGEGRAD": "COLLEGEGRAD",
  "COLLEGE": "COLLEGE",
  "GRADSCHOOL": "GRADSCHOOL"
};

const Relationship = {
  "MOM": "MOM",
  "DAD": "DAD",
  "WIFE": "WIFE",
  "HUSBAND": "HUSBAND",
  "SON": "SON",
  "DAUGHTER": "DAUGHTER",
  "GRANDDAUGHTER": "GRANDDAUGHTER",
  "GRANDSON": "GRANDSON",
  "GRANDCHILD": "GRANDCHILD",
  "CHILD": "CHILD",
  "PARENT": "PARENT",
  "SPOUSE": "SPOUSE",
  "SISTER": "SISTER",
  "BROTHER": "BROTHER",
  "SIBLING": "SIBLING"
};

const Locations = {
  "UNITY": "UNITY",
  "BROOKDALE": "BROOKDALE",
  "MAPLE": "MAPLE"
};

const { Question, Routine, Relative, Patient } = initSchema(schema);

export {
  Question,
  Routine,
  Relative,
  Patient,
  TimeOfDay,
  PersonalityTrait,
  Education,
  Relationship,
  Locations
};