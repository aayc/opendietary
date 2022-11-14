# Import necessary functions for optimization
from scipy import optimize
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import math
from pulp import *

class constraint:
    def __init__(self, name, minvalue, maxvalue):
        self.name = name
        self.minvalue = minvalue
        self.maxvalue = maxvalue


# Define the function to be optimized
def calories(fat, protein, carbs):
    return 9*fat + 4*protein + 4*carbs

def getMeals(fatMin, fatMax, proteinMin, proteinMax, carbsMin, carbsMax):
    prob = LpProblem("Meal_Planning_Problem",LpMinimize)

    # Read the first few rows dataset in a Pandas DataFrame
    # Read only the nutrition info not the bounds/constraints
    df = pd.read_excel("diet.xls",nrows=64)

    # Create a list of the food items
    food_items = list(df['Foods'])
    # Create a dictionary of calories for all food items
    calories = dict(zip(food_items,df['Calories']))
    # Create a dictionary of total fat for all food items
    fat = dict(zip(food_items,df['Total_Fat g']))
    # Create a dictionary of carbohydrates for all food items
    carbs = dict(zip(food_items,df['Carbohydrates g']))
    # Create a dictionary of protein for all food items
    protein = dict(zip(food_items,df['Protein g']))

    # Corresponds to serving sizes
    food_vars = LpVariable.dicts("Food",food_items,lowBound=0,cat='Integer')

    # Fat
    prob += lpSum([fat[f] * food_vars[f] for f in food_items]) >= fatMin, "FatMinimum"
    prob += lpSum([fat[f] * food_vars[f] for f in food_items]) <= fatMax, "FatMaximum"

    # Carbs
    prob += lpSum([carbs[f] * food_vars[f] for f in food_items]) >= carbsMin, "CarbsMinimum"
    prob += lpSum([carbs[f] * food_vars[f] for f in food_items]) <= carbsMax, "CarbsMaximum"

    # Protein
    prob += lpSum([protein[f] * food_vars[f] for f in food_items]) >= proteinMin, "ProteinMinimum"
    prob += lpSum([protein[f] * food_vars[f] for f in food_items]) <= proteinMax, "ProteinMaximum"

    # Calories
    #prob += lpSum([calories[f] * food_vars[f] for f in food_items]) >= calories(fatMin, proteinMin, carbsMin), "CaloriesMinimum"
    #prob += lpSum([calories[f] * food_vars[f] for f in food_items]) <= calories(fatMax, proteinMax, carbsMax), "CaloriesMaximum"

    prob += food_vars <= 2, "MaximumServingSize"

    prob.solve()

    for v in prob.variables():
        if v.varValue > 0:
            print(v.name, "=", v.varValue)






