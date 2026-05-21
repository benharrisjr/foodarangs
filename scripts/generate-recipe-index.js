#!/usr/bin/env node

/**
 * Build script to generate a consolidated recipe index from individual recipe files.
 * This lightweight index contains only the fields needed for the home page grid and filtering.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPES_DIR = path.join(__dirname, '../src/data/recipes');
const OUTPUT_FILE = path.join(__dirname, '../src/data/recipes-index.json');

// Fields to include in the lightweight index (for home page cards and filtering)
const INDEX_FIELDS = [
  'id',
  'title',
  'description',
  'heroImage',
  'prepTime',
  'cookTime',
  'servings',
  'difficulty',
  'tags'
];

function generateRecipeIndex() {
  console.log('🔨 Generating recipe index...');

  // Read all JSON files from the recipes directory
  const files = fs.readdirSync(RECIPES_DIR)
    .filter(file => file.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.error('❌ No recipe files found in', RECIPES_DIR);
    process.exit(1);
  }

  console.log(`📖 Found ${files.length} recipe(s)`);

  const recipeIndex = [];

  for (const file of files) {
    const filePath = path.join(RECIPES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const recipe = JSON.parse(content);

    // Extract only the fields needed for the index
    const indexEntry = {};
    for (const field of INDEX_FIELDS) {
      if (recipe.hasOwnProperty(field)) {
        indexEntry[field] = recipe[field];
      }
    }

    recipeIndex.push(indexEntry);
    console.log(`  ✓ ${recipe.title}`);
  }

  // Write the consolidated index
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(recipeIndex, null, 2));

  console.log(`✅ Generated recipe index with ${recipeIndex.length} recipes`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);
}

try {
  generateRecipeIndex();
} catch (error) {
  console.error('❌ Error generating recipe index:', error.message);
  process.exit(1);
}
