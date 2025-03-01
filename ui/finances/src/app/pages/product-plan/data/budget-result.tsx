


export class BudgetResult {

    constructor(public productPurchases: Record<string, number>, public productPortions: Record<string, number>, public totalCost: number, public portions: number,
        public averageQuality: number
    ) {

    }


}
