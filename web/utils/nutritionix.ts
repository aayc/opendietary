import axios from "axios";

type NutritionItemResult = {
  brandName: string | undefined;
  brandId: string | undefined;
  itemId: string | undefined;
  foodName: string;
  servingQuantity: number;
  servingUnit: string;
  servingWeightGrams: number;
  calories: number;
  fat: number;
  saturated_fat: number;
  cholesterol: number;
  sodium: number;
  carbs: number;
  fiber: number;
  sugar: number;
  protein: number;
  potassium: number;
  updatedAt: string;
};

type NutritionSearchResult = {
  brandName: string | undefined;
  brandId: string | undefined;
  fullName: string | undefined;
  foodName: string;
  calories: number | undefined;
  itemId: string | undefined;
  photo: { thumb: string };
  servingQuantity: number;
  servingUnit: string;
};

function parseNutritionItem(response: any): NutritionItemResult {
  return {
    brandId: response.nix_brand_id,
    itemId: response.nix_item_id,
    foodName: response.food_name,
    brandName: response.brand_name,
    servingQuantity: response.serving_qty,
    servingUnit: response.serving_unit,
    servingWeightGrams: response.serving_weight_grams,
    calories: response.nf_calories,
    fat: response.nf_total_fat,
    saturated_fat: response.nf_saturated_fat,
    cholesterol: response.nf_cholesterol,
    sodium: response.nf_sodium,
    carbs: response.nf_total_carbohydrate,
    fiber: response.nf_dietary_fiber,
    sugar: response.nf_sugars,
    protein: response.nf_protein,
    potassium: response.nf_potassium,
    updatedAt: response.updated_at,
  };
}

function parseNutritionSummary(response: any): NutritionSearchResult {
  return {
    brandName: response.brand_name,
    fullName: response.brand_name_item_name,
    foodName: response.food_name,
    calories: response.nf_calories,
    brandId: response.nix_brand_id,
    itemId: response.nix_item_id,
    photo: response.photo,
    servingQuantity: response.serving_qty,
    servingUnit: response.serving_unit,
  };
}

const nutritionIxHeaders = {
  headers: {
    "x-app-id": process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID,
    "x-app-key": process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY,
  },
};

async function getNutritionByUPC(upc: string): Promise<NutritionItemResult | null | undefined> {
  try {
    // TODO look up cached value in firestore using query where upc = upc
    const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`, nutritionIxHeaders);
    const results = response.data["foods"];
    return results.length > 0 ? parseNutritionItem(results[0]) : null;
  } catch (err) {
    console.log("API Error: " + err);
    return undefined;
  }
}

async function getNutritionByItemId(itemId: string): Promise<NutritionItemResult | null | undefined> {
  try {
    const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${itemId}`, nutritionIxHeaders);
    const results = response.data["foods"];
    return results.length > 0 ? parseNutritionItem(results[0]) : null;
  } catch (err) {
    console.log("API Error: " + err);
    return undefined;
  }
}

async function searchFood(query: string): Promise<NutritionSearchResult[] | null | undefined> {
  try {
    const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, nutritionIxHeaders);
    const results = [];
    if (response.data["common"]) {
      for (const item of response.data["common"]) {
        results.push(parseNutritionSummary(item));
      }
    }
    if (response.data["branded"]) {
      for (const item of response.data["branded"]) {
        results.push(parseNutritionSummary(item));
      }
    }
    return results
  } catch (err) {
    console.log("API Error: " + err);
    return undefined;
  }
}

export { getNutritionByUPC, getNutritionByItemId, searchFood };
export type { NutritionItemResult, NutritionSearchResult };
