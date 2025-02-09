// Use the database
use barbecueDB;
db.dropDatabase();
use barbecueDB;


// Meats Collection
db.meats.insertMany([
  {
    "_id": "meat_001",
    "type": "Picanha",
    "category": "Beef",
    "fat_level": "Medium",
    "preferred_cooking_method": "Sous Vide",
    "recipes": ["recipe_002"]
  },
  {
    "_id": "meat_002",
    "type": "Goose Breast",
    "category": "Poultry",
    "fat_level": "High",
    "preferred_cooking_method": "Sous Vide",
    "recipes": ["recipe_001"]
  },
  {
    "_id": "meat_003",
    "type": "Denver Cut",
    "category": "Beef",
    "fat_level": "Medium",
    "preferred_cooking_method": "Grill",
    "recipes": []
  },
  {
    "_id": "meat_004",
    "type": "Hanger Steak",
    "category": "Beef",
    "fat_level": "Medium",
    "preferred_cooking_method": "Grill",
    "recipes": []
  },
  {
    "_id": "meat_005",
    "type": "Asado Strips",
    "category": "Beef",
    "fat_level": "High",
    "preferred_cooking_method": "Slow Roast",
    "recipes": []
  },
  {
    "_id": "meat_006",
    "type": "Kebab",
    "category": "Mixed Meat",
    "fat_level": "Varied",
    "preferred_cooking_method": "Grill",
    "recipes": ["recipe_007"]
  },
  {
    "_id": "meat_007",
    "type": "Ribeye Steak",
    "category": "Beef",
    "fat_level": "High",
    "preferred_cooking_method": "Reverse Sear",
    "recipes": ["recipe_003"]
  },
  {
    "_id": "meat_008",
    "type": "Chicken Thighs",
    "category": "Poultry",
    "fat_level": "Low",
    "preferred_cooking_method": "Grill",
    "recipes": ["recipe_004"]
  }
]);

// Use the database
use barbecueDB;

// Additions Collection
db.additions.insertMany([
  {
    "_id": "addition_001",
    "name": "Chimichurri",
    "category": "Meat Addition",
    "description": "A fresh sauce made from parsley, garlic, olive oil, and vinegar."
  },
  {
    "_id": "addition_002",
    "name": "Onion Jam",
    "category": "Meat Addition",
    "description": "A sweet and savory jam made from caramelized onions."
  },
  {
    "_id": "addition_003",
    "name": "Garlic Confit",
    "category": "Meat Addition",
    "description": "Slow-cooked garlic in olive oil for a soft and rich flavor."
  },
  {
    "_id": "addition_004",
    "name": "Hummus",
    "category": "Side Dish",
    "description": "A creamy chickpea spread made with tahini, lemon, and garlic."
  },
  {
    "_id": "addition_005",
    "name": "Tahini",
    "category": "Side Dish",
    "description": "A sesame seed paste often used as a dip or dressing."
  },
  {
    "_id": "addition_006",
    "name": "Vegetable Salad",
    "category": "Side Dish",
    "description": "A fresh mix of tomatoes, cucumbers, and onions dressed with olive oil and lemon."
  }
]);

// Use the database
use barbecueDB;

// Events Collection
db.events.insertMany([
  {
    "_id": "event_001",
    "name": "Family Dinner",
    "date": "2024-12-30",
    "location": "Home",
    "menu": {
      "meats": ["meat_001", "meat_002"], // Picanha, Goose Breast
      "side_dishes": ["addition_001", "addition_004"] // Chimichurri, Hummus
    },
    "participants": [
      { "user_id": "user_001", "name": "Mevaser" },
      { "user_id": "user_002", "name": "Almog" },
      { "user_id": "user_003", "name": "Tom" }
    ]
  },
  {
    "_id": "event_002",
    "name": "Friends Gathering",
    "date": "2024-12-31",
    "location": "Friend's House",
    "menu": {
      "meats": ["meat_003", "meat_004"], // Denver Cut, Hanger Steak
      "side_dishes": ["addition_002", "addition_006"] // Onion Jam, Vegetable Salad
    },
    "participants": [
      { "user_id": "user_004", "name": "Roy" },
      { "user_id": "user_005", "name": "Dan" }
    ]
  },
  {
    "_id": "event_003",
    "name": "Picnic Dinner",
    "date": "2024-12-25",
    "location": "Park",
    "menu": {
      "meats": ["meat_005", "meat_006"], // Asado Strips, Kebab
      "side_dishes": ["addition_003", "addition_005"] // Garlic Confit, Tahini
    },
    "participants": [
      { "user_id": "user_001", "name": "Mevaser" },
      { "user_id": "user_002", "name": "Almog" }
    ]
  }
]);

db.events.insertOne({
  "_id": "event_004",
  "name": "Romantic Dinner",
  "date": "2024-12-14",
  "location": "Home",
  "menu": {
    "meats": ["meat_007"], // Ribeye Steak
    "side_dishes": ["addition_003", "addition_005"] // Garlic Confit, Tahini
  },
  "participants": [
    { "user_id": "user_006", "name": "Emma" },
    { "user_id": "user_007", "name": "Liam" }
  ]
});


// Use the database
use barbecueDB;

// Users Collection
db.users.insertMany([
  {
    "_id": "user_001",
    "name": "Mevaser",
    "preferences": ["Picanha", "Goose Breast"],
    "favorite_recipes": ["recipe_001", "recipe_002"],
    "event_history": ["event_001", "event_003"]
  },
  {
    "_id": "user_002",
    "name": "Almog",
    "preferences": ["Chicken Thighs", "Denver Cut"],
    "favorite_recipes": ["recipe_004", "recipe_005"],
    "event_history": ["event_002", "event_003"]
  },
  {
    "_id": "user_003",
    "name": "Tom",
    "preferences": ["Hanger Steak", "Ribeye Steak"],
    "favorite_recipes": ["recipe_003"],
    "event_history": ["event_001"]
  },
  {
    "_id": "user_004",
    "name": "Roy",
    "preferences": ["Kebab", "Asado Strips"],
    "favorite_recipes": ["recipe_007"],
    "event_history": ["event_002"]
  },
  {
    "_id": "user_005",
    "name": "Dan",
    "preferences": ["Picanha", "Denver Cut"],
    "favorite_recipes": ["recipe_002", "recipe_005"],
    "event_history": ["event_003"]
  }
]);


// Use the database
use barbecueDB;

// Recipes Collection
db.recipes.insertMany([
  {
    "_id": "recipe_001",
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
    "_id": "recipe_002",
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
    "_id": "recipe_003",
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
    "_id": "recipe_004",
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
    "_id": "recipe_005",
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
    "_id": "recipe_006",
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
    "_id": "recipe_007",
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


function addRecipe(db, recipe) {
  db.recipes.insertOne(recipe);
}

// דוגמה לשימוש:
addRecipe(db, {
  "_id": "recipe_008",
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


function findRecipesByType(db, type) {
  return db.recipes.find({ "type": type }).toArray();
}

// דוגמה לשימוש:
const beefRecipes = findRecipesByType(db, "Beef");
printjson(beefRecipes);


function updateRecipeCookingTime(db, recipeId, newTime) {
  db.recipes.updateOne(
    { "_id": recipeId },
    { $set: { "cooking_time": newTime } }
  );
}

// דוגמה לשימוש:
updateRecipeCookingTime(db, "recipe_002", 500);


function deleteRecipe(db, recipeId) {
  db.recipes.deleteOne({ "_id": recipeId });
}

// דוגמה לשימוש:
deleteRecipe(db, "recipe_007");


db.recipes.find({ "type": "Beef", "cooking_time": { $lt: 60 } }).pretty();

db.recipes.find(
  { difficulty: "Easy" }, 
  { difficulty:0 , _id: 0 }
).limit(5).sort({ preparation_time: 1 }).toArray();

db.meats.find(
  { preferred_cooking_method: "Grill" }, 
  { type: 1, fat_level: 1, _id: 0 }
).skip(2).sort({ fat_level: -1 }).toArray();

db.recipes.find(
  { cooking_time: { $gt: 120 } }
).count();

db.events.find(
  { "menu.meats": "meat_003" }, 
  { name: 1, location: 1, _id: 0 }
).toArray();

db.events.find(
  { _id: "event_002" },
  { "participants.name": 1, _id: 0 }
).forEach(event => {
  event.participants.forEach(participant => console.log(participant.name));
});

// Update Goose Breast Recipe
db.recipes.updateOne(
  { "_id": "recipe_001" },
  { $set: { "meat_id": "meat_002" } } // Goose Breast
);
// Update all other recipes with their corresponding meat_id
db.recipes.updateMany(
  { "_id": { $in: ["recipe_002", "recipe_003", "recipe_004", "recipe_005", "recipe_006", "recipe_007"] } },
  {
    $set: {
      "meat_id": {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", "recipe_002"] }, then: "meat_001" }, // Picanha
            { case: { $eq: ["$_id", "recipe_003"] }, then: "meat_007" }, // Ribeye Steak
            { case: { $eq: ["$_id", "recipe_004"] }, then: "meat_008" }, // Chicken Thighs
            { case: { $eq: ["$_id", "recipe_005"] }, then: "meat_003" }, // Denver Cut
            { case: { $eq: ["$_id", "recipe_006"] }, then: "meat_004" }, // Hanger Steak
            { case: { $eq: ["$_id", "recipe_007"] }, then: "meat_006" }  // Kebab
          ],
          default: null
        }
      }
    }
  }
);


db.recipes.updateMany(
  {},
  { $set: { "rating": 5 } } // כל המתכונים יקבלו דירוג 5
);
db.recipes.updateOne(
  { "_id": "recipe_001" },
  { $addToSet: { "ingredients": { "name": "Butter", "quantity": "2 tbsp" } } }
);
db.recipes.updateOne(
  { "_id": "recipe_002" },
  { $inc: { "preparation_time": 1 } }
);

db.recipes.updateOne(
  { "_id": "recipe_003" },
  { $pull: { "ingredients": { "name": "Salt" } } }
);
db.recipes.updateOne(
  { "_id": "recipe_003" },
  { $push: { "ingredients": { "name": "salt"} } }
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
var mapFunction = function () {
  emit(this.type, {
      count: 1, // Each recipe contributes 1 to the count
      totalCookingTime: this.cooking_time, // Track total cooking time
      cookingMethods: [this.preferred_cooking_method] // Collect cooking methods
  });
};

// Reduce function: Aggregates data for each meat type
var reduceFunction = function (key, values) {
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
