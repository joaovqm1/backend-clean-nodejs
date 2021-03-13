import { INTEGER, DATE } from 'sequelize'

export const defaultFieldsMigrations = {
  createrId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  },
  updaterId: {
    type: INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
  deletedAt: {
    type: DATE,
  },
  officeId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'offices',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}