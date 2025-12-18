import { table, column, defineSchema } from '@firebase/dataconnect';

export const schema = defineSchema({
  tables: [
    table('action_items', {
      name: column.string(),
      uuid: column.string({ unique: true }),
      type: column.string(),
      recommendation_action: column.string(),
      date: column.string(),
      state: column.string(),
      cost: column.number(),
      id: column.int({ primaryKey: true }),
    }),
  ],
});
