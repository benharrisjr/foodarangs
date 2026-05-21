# Recipe Data Architecture

## Overview

The recipe data is organized for optimal performance with separate JSON files per recipe and a lightweight index for the home page.

## Structure

```
src/data/
├── recipes/                    # Individual recipe files
│   ├── beef-tacos.json
│   ├── chicken-tikka-masala.json
│   ├── classic-carbonara.json
│   ├── fluffy-pancakes.json
│   └── thai-green-curry.json
└── recipes-index.json          # Lightweight index (auto-generated)
```

## How It Works

### 1. Individual Recipe Files

Each recipe is stored in its own JSON file at `src/data/recipes/{recipe-id}.json`.

These files contain the complete recipe data:
- Basic info (title, description, images, times, servings, difficulty)
- Full ingredients list
- Complete step-by-step instructions with images and tips
- Required tools
- Tags

**Benefits:**
- Each recipe page only loads the data it needs
- Better code splitting and lazy loading
- Easier to manage and edit individual recipes

### 2. Consolidated Index

The `recipes-index.json` file is **auto-generated** during the build process.

It contains only the fields needed for the home page:
- id
- title
- description
- heroImage
- prepTime
- cookTime
- servings
- difficulty
- tags

**Benefits:**
- Home page loads minimal data
- Fast initial page load
- Supports filtering and search without loading full recipe details

### 3. Build Process

The index is automatically generated before both dev and build:

```json
{
  "scripts": {
    "generate-index": "node scripts/generate-recipe-index.js",
    "predev": "npm run generate-index",
    "dev": "vite",
    "prebuild": "npm run generate-index",
    "build": "vite build"
  }
}
```

**The build script:**
1. Reads all JSON files from `src/data/recipes/`
2. Extracts only the fields needed for the index
3. Generates `src/data/recipes-index.json`

### 4. Store Implementation

The `useRecipesStore` implements lazy loading:

```javascript
// Loads lightweight index on app init
const recipes = ref(recipesIndex)

// Lazy loads full recipe when needed
async function getRecipeById(id) {
  // Check cache first
  if (recipeCache.value.has(id)) {
    return recipeCache.value.get(id)
  }

  // Dynamically import individual recipe file
  const recipeModule = await import(`@/data/recipes/${id}.json`)
  const fullRecipe = recipeModule.default

  // Cache for future use
  recipeCache.value.set(id, fullRecipe)
  return fullRecipe
}
```

## Adding New Recipes

1. Create a new JSON file in `src/data/recipes/` with the recipe ID as the filename
2. Follow the existing recipe structure
3. Run `npm run generate-index` to regenerate the index (or just run dev/build)
4. The recipe will automatically appear on the home page

## Performance Impact

**Before (single recipes.json):**
- Home page loads ~150KB including all recipe details
- All recipes loaded even when viewing a single recipe

**After (split architecture):**
- Home page loads ~140KB with just the index
- Individual recipes loaded on-demand (~2-3KB each)
- Automatic code splitting by Vite
- Better caching and faster navigation

## Manual Index Generation

To manually regenerate the index:

```bash
npm run generate-index
```

This is useful if you:
- Add/edit recipes and want to see changes before building
- Need to verify the index structure
- Want to pre-generate before committing
