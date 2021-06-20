import { Op } from 'sequelize'

export async function getObjectByIdFromSequelizeModel(id: number, sequelizeModel: any): Promise<any> {
  const object = await sequelizeModel.findOne({
    where: {
      id
    }
  })
  return object.toJSON()
}

export async function getObjectsByIdsFromSequelizeModel(ids: number[], sequelizeModel: any): Promise<any[]> {
  const objects: any[] = await sequelizeModel.findAll({
    where: {
      id: {
        [Op.in]: ids
      }
    }
  })
  return objects.map((object) => object.toJSON())
}
