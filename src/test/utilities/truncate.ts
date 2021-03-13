import { Office } from '@/infra/database/models'
import { Op } from 'sequelize'

export default async function(officesNames: string[]): Promise<void> {
  await Office.destroy({
    where: {
      name: {
        [Op.in]: officesNames
      }
    }
  })
}
