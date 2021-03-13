import { INTEGER } from 'sequelize'

export const createrIdSchema = {
  type: INTEGER,
  allowNull: false,
}

export const updaterIdSchema = {
  type: INTEGER,
  allowNull: true,
}

interface ForeignKeyOptions {
  as?: string
  foreignKey?: string
  onDelete: string
  onUpdate: string
  hooks: boolean
}

export const createrIdForeignKeyOptions: ForeignKeyOptions = {
  as: 'creater',
  foreignKey: 'createrId',
  onUpdate: 'CASCADE',
  onDelete: 'NO ACTION',
  hooks: true,
}

export const updaterIdForeignKeyOptions: ForeignKeyOptions = {
  as: 'updater',
  foreignKey: 'updaterId',
  onUpdate: 'CASCADE',
  onDelete: 'NO ACTION',
  hooks: true,
}

export const getForeignKeyOptions = (
  onDelete = 'NO ACTION',
  onUpdate = 'CASCADE'
): ForeignKeyOptions => {
  return {
    onDelete,
    onUpdate,
    hooks: true,
  }
}

export const getSalesmanForeignKeyOptions = (
  onDelete = 'NO ACTION',
  onUpdate = 'CASCADE'
): ForeignKeyOptions => {
  return {
    as: 'salesman',
    foreignKey: 'salesmanId',
    onDelete,
    onUpdate,
    hooks: true,
  }
}

export const getOfficeForeignKeyOptions = (
  onDelete: string,
  onUpdate: string
): ForeignKeyOptions => {
  return getForeignKeyOptions(onDelete, onUpdate)
}

export const officeIdSchema = {
  type: INTEGER,
  allowNull: false,
}

export const defaultFieldsSchema = {
  createrId: createrIdSchema,
  updaterId: updaterIdSchema,
  officeId: officeIdSchema
}
