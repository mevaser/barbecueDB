// Use and drop the database so we start fresh.
use barbecueDB;
db.dropDatabase();
use barbecueDB;

// =============================
// Meats Collection
// =============================
db.meats.insertMany([
  {
    "_id": "meat_1",
    "type": "Picanha",
    "category": "Beef",
    "fat_level": "Medium",
    "preferred_cooking_method": "Sous Vide",
    "recipes": ["recipe_2"]
  },
  {
    "_id": "meat_2",
    "type": "Goose Breast",
    "category": "Poultry",
    "fat_level": "High",
    "preferred_cooking_method": "Sous Vide",
    "recipes": ["recipe_1"]
  },
  {
    "_id": "meat_3",
    "type": "Denver Cut",
    "category": "Beef",
    "fat_level": "Medium",
    "preferred_cooking_method": "Grill",
    "recipes": []
  },
  {
    "_id": "meat_4",
    "type": "Hanger Steak",
    "category": "Beef",
    "fat_level": "Medium",
    "preferred_cooking_method": "Grill",
    "recipes": []
  },
  {
    "_id": "meat_5",
    "type": "Asado Strips",
    "category": "Beef",
    "fat_level": "High",
    "preferred_cooking_method": "Slow Roast",
    "recipes": []
  },
  {
    "_id": "meat_6",
    "type": "Kebab",
    "category": "Mixed Meat",
    "fat_level": "Varied",
    "preferred_cooking_method": "Grill",
    "recipes": ["recipe_7"]
  },
  {
    "_id": "meat_7",
    "type": "Ribeye Steak",
    "category": "Beef",
    "fat_level": "High",
    "preferred_cooking_method": "Reverse Sear",
    "recipes": ["recipe_3"]
  },
  {
    "_id": "meat_8",
    "type": "Chicken Thighs",
    "category": "Poultry",
    "fat_level": "Low",
    "preferred_cooking_method": "Grill",
    "recipes": ["recipe_4"]
  }
]);

// =============================
// Additions Collection
// =============================
db.additions.insertMany([
  {
    "_id": "addition_1",
    "name": "Chimichurri",
    "category": "Meat Addition",
    "description": "A fresh sauce made from parsley, garlic, olive oil, and vinegar."
  },
  {
    "_id": "addition_2",
    "name": "Onion Jam",
    "category": "Meat Addition",
    "description": "A sweet and savory jam made from caramelized onions."
  },
  {
    "_id": "addition_3",
    "name": "Garlic Confit",
    "category": "Meat Addition",
    "description": "Slow-cooked garlic in olive oil for a soft and rich flavor."
  },
  {
    "_id": "addition_4",
    "name": "Hummus",
    "category": "Side Dish",
    "description": "A creamy chickpea spread made with tahini, lemon, and garlic."
  },
  {
    "_id": "addition_5",
    "name": "Tahini",
    "category": "Side Dish",
    "description": "A sesame seed paste often used as a dip or dressing."
  },
  {
    "_id": "addition_6",
    "name": "Vegetable Salad",
    "category": "Side Dish",
    "description": "A fresh mix of tomatoes, cucumbers, and onions dressed with olive oil and lemon."
  }
]);

// Use the database
use barbecueDB;

// Events Collection
// =============================
db.events.insertMany([
  {
    "_id": "event_1",
    "name": "Family Dinner",
    "date": "2024-12-30",
    "location": "Home",
    "menu": {
      "meats": ["meat_1", "meat_2"],  // IDs for Picanha, Goose Breast
      "side_dishes": ["addition_1", "addition_4"]  // IDs for Chimichurri, Hummus
    },
    "participants": [
      { "user_id": "user_1", "name": "Mevaser" },
      { "user_id": "user_2", "name": "Almog" },
      { "user_id": "user_3", "name": "Tom" }
    ]
  },
  {
    "_id": "event_2",
    "name": "Friends Gathering",
    "date": "2024-12-31",
    "location": "Friend's House",
    "menu": {
      "meats": ["meat_3", "meat_4"],  // IDs for Denver Cut, Hanger Steak
      "side_dishes": ["addition_2", "addition_6"]  // IDs for Onion Jam, Vegetable Salad
    },
    "participants": [
      { "user_id": "user_4", "name": "Roy" },
      { "user_id": "user_5", "name": "Dan" }
    ]
  },
  {
    "_id": "event_3",
    "name": "Picnic Dinner",
    "date": "2024-12-25",
    "location": "Park",
    "menu": {
      "meats": ["meat_5", "meat_6"],  // IDs for Asado Strips, Kebab
      "side_dishes": ["addition_3", "addition_5"]  // IDs for Garlic Confit, Tahini
    },
    "participants": [
      { "user_id": "user_1", "name": "Mevaser" },
      { "user_id": "user_2", "name": "Almog" }
    ]
  }
]);

db.events.insertOne({
  "_id": "event_4",
  "name": "Romantic Dinner",
  "date": "2024-12-14",
  "location": "Home",
  "menu": {
    "meats": ["meat_7"],  // ID for Ribeye Steak
    "side_dishes": ["addition_3", "addition_5"]  // IDs for Garlic Confit, Tahini
  },
  "participants": [
    { "user_id": "user_6", "name": "Emma" },
    { "user_id": "user_7", "name": "Liam" }
  ]
});


// Use the database
use barbecueDB;

// Users Collection
// =============================
db.users.insertMany([
  {
    "_id": "user_1",
    "name": "Mevaser",
    "preferences": ["Picanha", "Goose Breast"],
    "favorite_recipes": ["recipe_1", "recipe_2"],
    "event_history": ["event_1", "event_3"]
  },
  {
    "_id": "user_2",
    "name": "Almog",
    "preferences": ["Chicken Thighs", "Denver Cut"],
    "favorite_recipes": ["recipe_4", "recipe_5"],
    "event_history": ["event_2", "event_3"]
  },
  {
    "_id": "user_3",
    "name": "Tom",
    "preferences": ["Hanger Steak", "Ribeye Steak"],
    "favorite_recipes": ["recipe_3"],
    "event_history": ["event_1"]
  },
  {
    "_id": "user_4",
    "name": "Roy",
    "preferences": ["Kebab", "Asado Strips"],
    "favorite_recipes": ["recipe_7"],
    "event_history": ["event_2"]
  },
  {
    "_id": "user_5",
    "name": "Dan",
    "preferences": ["Picanha", "Denver Cut"],
    "favorite_recipes": ["recipe_2", "recipe_5"],
    "event_history": ["event_3"]
  }
]);


// Use the database
use barbecueDB;

// Recipes Collection
// =============================
db.recipes.insertMany([
  {
    "_id": "recipe_1",
    "name": "Goose Breast",
    "ingredients": [
      { "name": "Garlic Powder", "quantity": "1 tsp" },
      { "name": "Silane (Date Syrup)", "quantity": "2 tbsp" },
      { "name": "Coarse Salt", "quantity": "1 tbsp" },
      { "name": "Rosemary", "quantity": "2 sprigs" },
      { "name": "Orange", "quantity": "1 slice" }
    ],
    "preparation_method": "Cook sous vide for 4 hours at 56°C, then sear for 3 minutes on each side.",
    "preparation_time": 10,
    "cooking_time": 240,
    "difficulty": "Medium",
    "type": "Poultry"
  },
  {
    "_id": "recipe_2",
    "name": "Picanha",
    "ingredients": [
      { "name": "Silane (Date Syrup)", "quantity": "2 tbsp" },
      { "name": "Garlic Powder", "quantity": "1 tsp" },
      { "name": "Coarse Salt", "quantity": "50g" }
    ],
    "preparation_method": "Dry brine for 24 hours on a salted rack, cook sous vide for 8 hours at 56°C, then sear for 4 minutes on each side.",
    "preparation_time": 1440,
    "cooking_time": 480,
    "difficulty": "High",
    "type": "Beef"
  },
  {
    "_id": "recipe_3",
    "name": "Ribeye Steak (Prime Rib)",
    "ingredients": [
      { "name": "Ribeye Steak", "quantity": "500-600g" },
      { "name": "Coarse Salt", "quantity": "1 tsp" },
      { "name": "Black Pepper", "quantity": "1 tsp" }
    ],
    "preparation_method": "Reverse sear at 100-130°C for 45 minutes, rest for 5 minutes, then sear on high heat for 2.5 minutes on each side.",
    "preparation_time": 50,
    "cooking_time": 45,
    "difficulty": "Medium",
    "type": "Beef"
  },
  {
    "_id": "recipe_4",
    "name": "Chicken Thighs",
    "ingredients": [
      { "name": "Sweet Paprika", "quantity": "1 tbsp" },
      { "name": "Hot Paprika", "quantity": "1 tsp" },
      { "name": "Sweet Chili Sauce", "quantity": "2 tbsp" },
      { "name": "Crushed Garlic", "quantity": "1 clove" },
      { "name": "Soy Sauce", "quantity": "1 tbsp" },
      { "name": "Salt", "quantity": "1 tsp" }
    ],
    "preparation_method": "Marinate for 2 hours, then grill on medium heat for 6 minutes on each side.",
    "preparation_time": 120,
    "cooking_time": 12,
    "difficulty": "Easy",
    "type": "Poultry"
  },
  {
    "_id": "recipe_5",
    "name": "Denver Cut",
    "ingredients": [
      { "name": "Coarse Salt", "quantity": "1 tsp" },
      { "name": "Black Pepper", "quantity": "1 tsp" },
      { "name": "Garlic Powder", "quantity": "1 tsp" }
    ],
    "preparation_method": "Grill over high heat for 3 minutes on each side.",
    "preparation_time": 5,
    "cooking_time": 6,
    "difficulty": "Easy",
    "type": "Beef"
  },
  {
    "_id": "recipe_6",
    "name": "Hanger Steak",
    "ingredients": [
      { "name": "Coarse Salt", "quantity": "1 tsp" },
      { "name": "Black Pepper", "quantity": "1 tsp" },
      { "name": "Olive Oil", "quantity": "1 tbsp" }
    ],
    "preparation_method": "Marinate for 1 hour, then grill over medium heat for 5 minutes on each side.",
    "preparation_time": 60,
    "cooking_time": 10,
    "difficulty": "Medium",
    "type": "Beef"
  },
  {
    "_id": "recipe_7",
    "name": "Kebab",
    "ingredients": [
      { "name": "Ground Beef", "quantity": "500g" },
      { "name": "Onion", "quantity": "1, grated" },
      { "name": "Parsley", "quantity": "2 tbsp, chopped" },
      { "name": "Salt", "quantity": "1 tsp" },
      { "name": "Black Pepper", "quantity": "1 tsp" }
    ],
    "preparation_method": "Shape into patties, then grill on high heat for 3 minutes on each side.",
    "preparation_time": 20,
    "cooking_time": 6,
    "difficulty": "Easy",
    "type": "Mixed Meat"
  }
]);

// Add recipe_8 using a helper function
function addRecipe(db, recipe) {
  db.recipes.insertOne(recipe);
}

addRecipe(db, {
  "_id": "recipe_8",
  "name": "Grilled Lamb Chops",
  "ingredients": [
    { "name": "Lamb Chops", "quantity": "4 pcs" },
    { "name": "Garlic", "quantity": "2 cloves, minced" },
    { "name": "Olive Oil", "quantity": "2 tbsp" },
    { "name": "Rosemary", "quantity": "1 sprig" },
    { "name": "Salt", "quantity": "1 tsp" }
  ],
  "preparation_method": "Marinate for 2 hours, then grill for 5 minutes on each side.",
  "preparation_time": 120,
  "cooking_time": 10,
  "difficulty": "Medium",
  "type": "Meat"
});

// Example usage: find and print all Beef recipes.
function findRecipesByType(db, type) {
  return db.recipes.find({ "type": type }).toArray();
}
const beefRecipes = findRecipesByType(db, "Beef");
printjson(beefRecipes);

// --- Additional Operations ---
// (Update, delete, aggregation, and mapReduce operations follow below.)

function updateRecipeCookingTime(db, recipeId, newTime) {
  db.recipes.updateOne(
    { "_id": recipeId },
    { $set: { "cooking_time": newTime } }
  );
}

// דוגמה לשימוש:
updateRecipeCookingTime(db, "recipe_2", 500);


function deleteRecipe(db, recipeId) {
  db.recipes.deleteOne({ "_id": recipeId });
}
deleteRecipe(db, "recipe_7");

db.recipes.find({ "type": "Beef", "cooking_time": { $lt: 60 } }).pretty();

db.recipes.find(
  { difficulty: "Easy" },
  { difficulty: 0, _id: 0 }
).limit(5).sort({ preparation_time: 1 }).toArray();

db.meats.find(
  { preferred_cooking_method: "Grill" },
  { type: 1, fat_level: 1, _id: 0 }
).skip(2).sort({ fat_level: -1 }).toArray();

db.recipes.find(
  { cooking_time: { $gt: 120 } }
).count();

db.events.find(
  { "menu.meats": "meat_3" },
  { name: 1, location: 1, _id: 0 }
).toArray();

db.events.find(
  { _id: "event_2" },
  { "participants.name": 1, _id: 0 }
).forEach(event => {
  event.participants.forEach(participant => console.log(participant.name));
});

// Update Goose Breast Recipe
db.recipes.updateOne(
  { "_id": "recipe_1" },
  { $set: { "meat_id": "meat_2" } }
);
db.recipes.updateMany(
  { "_id": { $in: ["recipe_2", "recipe_3", "recipe_4", "recipe_5", "recipe_6"] } },
  {
    $set: {
      "meat_id": {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", "recipe_2"] }, then: "meat_1" },
            { case: { $eq: ["$_id", "recipe_3"] }, then: "meat_7" },
            { case: { $eq: ["$_id", "recipe_4"] }, then: "meat_8" },
            { case: { $eq: ["$_id", "recipe_5"] }, then: "meat_3" },
            { case: { $eq: ["$_id", "recipe_6"] }, then: "meat_4" }
          ],
          default: null
        }
      }
    }
  }
);

db.recipes.updateMany(
  {},
  { $set: { "rating": 5 } }
);
db.recipes.updateOne(
  { "_id": "recipe_1" },
  { $addToSet: { "ingredients": { "name": "Butter", "quantity": "2 tbsp" } } }
);
db.recipes.updateOne(
  { "_id": "recipe_2" },
  { $inc: { "preparation_time": 1 } }
);

db.recipes.updateOne(
  { "_id": "recipe_3" },
  { $pull: { "ingredients": { "name": "Salt" } } }
);
db.recipes.updateOne(
  { "_id": "recipe_3" },
  { $push: { "ingredients": { "name": "salt" } } }
);

db.recipes.aggregate([
  {
    $lookup: {
      from: "meats",
      localField: "meat_id",
      foreignField: "_id",
      as: "meat_details"
    }
  }
]).pretty();

db.recipes.aggregate([
  { $match: { "cooking_time": { $gt: 60 } } }
]).pretty();

db.recipes.aggregate([
  { $project: { _id: 0, name: 1, cooking_time: 1, type: 1 } }
]).pretty();

db.recipes.aggregate([
  { $sort: { "cooking_time": -1 } }
]).pretty();

db.recipes.aggregate([
  { $group: { _id: "$type", avgCookingTime: { $avg: "$cooking_time" } } }
]).pretty();

var mapFunction = function () {
  emit(this.type, { totalCookingTime: this.cooking_time, count: 1 });
};

var reduceFunction = function (key, values) {
  var result = { totalCookingTime: 0, count: 0 };
  values.forEach(function (value) {
    result.totalCookingTime += value.totalCookingTime;
    result.count += value.count;
  });
  return result;
};

db.recipes.mapReduce(
  mapFunction,
  reduceFunction,
  {
    out: "cookingTimesByType"
  }
);

db.cookingTimesByType.find().forEach(function (doc) {
  var avgCookingTime = doc.value.totalCookingTime / doc.value.count;
  print(doc._id + " - Average Cooking Time: " + avgCookingTime.toFixed(2) + " minutes");
});

// Map function: Emits each recipe's meat type with cooking time and method
var mapFunction2 = function () {
  emit(this.type, {
      count: 1, // Each recipe contributes 1 to the count
      totalCookingTime: this.cooking_time, // Track total cooking time
      cookingMethods: [this.preferred_cooking_method] // Collect cooking methods
  });
};

// Reduce function: Aggregates data for each meat type
var reduceFunction2 = function (key, values) {
  var reducedValue = { count: 0, totalCookingTime: 0, cookingMethods: [] };

  // Iterate through all values to accumulate totals
  values.forEach(function (value) {
      reducedValue.count += value.count; // Sum recipe counts
      reducedValue.totalCookingTime += value.totalCookingTime; // Sum cooking times
      reducedValue.cookingMethods = reducedValue.cookingMethods.concat(value.cookingMethods); // Collect cooking methods
  });
  // Find the most common cooking method
  var methodCounts = {};
  reducedValue.cookingMethods.forEach(function (method) {
      if (methodCounts[method]) {
          methodCounts[method]++;
      } else {
          methodCounts[method] = 1;
      }
  });
  // Determine the most frequently used cooking method
  var mostCommonMethod = Object.keys(methodCounts).reduce((a, b) => (methodCounts[a] > methodCounts[b] ? a : b));
  return {
      count: reducedValue.count, // Total recipes per meat type
      avgCookingTime: reducedValue.totalCookingTime / reducedValue.count, // Average cooking time
      mostCommonMethod: mostCommonMethod // Most frequent cooking method
  };
};

// Execute MapReduce on the "recipes" collection and store the results in "recipe_statistics"
db.recipes.mapReduce(
  mapFunction,
  reduceFunction,
  { out: "recipe_statistics" }
);

// View the results
db.recipe_statistics.find().pretty();

db.recipes.aggregate([
  {
      $group: {
          _id: "$type", // Group by meat type
          totalRecipes: { $sum: 1 }, // Count total recipes
          avgCookingTime: { $avg: "$cooking_time" }, // Calculate average cooking time
          recipes: { $push: "$name" }, // Collect all recipe names
          allIngredients: { $push: "$ingredients.name" } // Collect all ingredients
      }
  },
  {
      $unwind: "$allIngredients" // Unwind ingredient arrays
  },
  {
      $unwind: "$allIngredients" // Flatten nested ingredient arrays
  },
  {
      $group: {
          _id: "$_id", // Group by meat type again
          totalRecipes: { $first: "$totalRecipes" }, // Keep total recipes count
          avgCookingTime: { $first: "$avgCookingTime" }, // Keep average cooking time
          recipes: { $first: "$recipes" }, // Keep list of recipes
          mostCommonIngredient: { $first: "$allIngredients" } // Select the first ingredient (can be improved)
      }
  },
  {
      $sort: { avgCookingTime: -1 } // Sort by highest average cooking time
  }
]).pretty();

db.events.aggregate([
  {
      $unwind: "$menu.meats" // Break down the meats array
  },
  {
      $group: {
          _id: "$menu.meats", // Group by meat ID
          count: { $sum: 1 } // Count occurrences of each meat
      }
  },
  {
      $lookup: {
          from: "meats", // Join with the "meats" collection
          localField: "_id",
          foreignField: "_id",
          as: "meat_details"
      }
  },
  {
      $unwind: "$meat_details" // Flatten the joined meat details
  },
  {
      $project: {
          _id: 0,
          meat: "$meat_details.type", // Show meat type instead of ID
          count: 1
      }
  },
  {
      $sort: { count: -1 } // Sort by popularity (highest count first)
  }
]).pretty();
