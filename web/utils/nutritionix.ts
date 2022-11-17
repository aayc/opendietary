import { config } from "dotenv";
import axios from "axios";
config();

type Nutrition = {
  brand_id: string;
  item_id: string;
  food_name: string;
  brand_name: string;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
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
  updated_at: string;
};

function parseNutritionData(response: any) {
  return {
    brand_id: response.nix_brand_id,
    item_id: response.nix_item_id,
    food_name: response.food_name,
    brand_name: response.brand_name,
    serving_qty: response.serving_qty,
    serving_unit: response.serving_unit,
    serving_weight_grams: response.serving_weight_grams,
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
    updated_at: response.updated_at,
  };
}

async function getNutritionByUPC(upc: string) {
  //axios.get('https://trackapi.nutritionix.com/v2/search/instant?query=beans', {
  try {
    const response = await axios.get(
      `https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`,
      {
        headers: {
          "x-app-id": process.env.NUTRITIONIX_APP_ID,
          "x-app-key": process.env.NUTRITIONIX_API_KEY,
        },
      }
    );
    const results = response.data["foods"];
    return (results.length > 0) ? parseNutritionData(results[0]) : null;
  } catch (err) {
    console.log("API Error: " + err);
    return undefined;
  }
}

async function getNutritionByItemId(itemId: string) {
  try {
    const response = await axios.get(
      `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${itemId}`,
      {
        headers: {
          "x-app-id": process.env.NUTRITIONIX_APP_ID,
          "x-app-key": process.env.NUTRITIONIX_API_KEY,
        },
      }
    );
    const results = response.data["foods"];
    return (results.length > 0) ? parseNutritionData(results[0]) : null;
  } catch (err) {
    console.log("API Error: " + err);
    return undefined;
  }
}

async function searchFood(query: string) {
  try {
    const response = await axios.get(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
      {
        headers: {
          "x-app-id": process.env.NUTRITIONIX_APP_ID,
          "x-app-key": process.env.NUTRITIONIX_API_KEY,
        },
      }
    );
    return response.data["common"];
  } catch (err) {
    console.log("API Error: " + err);
    return undefined;
  }
}

export { getNutritionByUPC, getNutritionByItemId, searchFood };
export type { Nutrition };