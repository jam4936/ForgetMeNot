// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Patient } = initSchema(schema);

export {
  Patient
};