const { DATE, INTEGER } = require('sequelize')

const officeId = {
  type: INTEGER,
  allowNull: false,
  references: {
    model: 'offices',
    key: 'id',
  },
  onDelete: 'CASCADE',
}

const createrId = {
  type: INTEGER,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id',
  },
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
}

const updaterId = {
  type: INTEGER,
  references: {
    model: 'users',
    key: 'id',
  },
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
}

const createdAt = {
  type: DATE
}

const updatedAt = {
  type: DATE
}

const deletedAt = {
  type: DATE
}

module.exports = {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  stateId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'states',
      key: 'id'
    }
  },
  cityId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'cities',
      key: 'id'
    }
  },
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
    type: DATE
  },
  updatedAt: {
    type: DATE
  },
  deletedAt: {
    type: DATE
  },
  defaultFields: {
    createrId,
    updaterId,
    createdAt,
    updatedAt,
    deletedAt,
    officeId
  },
  officeId,
  customerSupplierId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'customerssuppliers',
      key: 'id',
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  }
}
