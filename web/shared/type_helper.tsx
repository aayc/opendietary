
type DietParameters = {
  protein: number;
  fat: number;
  carbs: number;
  allergies: string[];
  numMeals: number;
  allowFastFood: boolean;
  budget: number;
};

type DailyDietPlan = {
    meals: Meal[];
    parameters: DietParameters;
}

type Meal = {
    items: MealItem[];
}

type MealItem = {
    name: string;
    description: string;
    cookingTime: number;
    cost: number;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}

export type { DietParameters, DailyDietPlan, Meal, MealItem }