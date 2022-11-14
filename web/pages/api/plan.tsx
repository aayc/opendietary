// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DietParameters, DailyDietPlan } from '../../shared/type_helper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DailyDietPlan>
) {
    const parameters: DietParameters = req.body
    // Sleep for 3 seconds for testing
    await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({ 
        meals: [], 
        parameters: parameters 
    })
}
