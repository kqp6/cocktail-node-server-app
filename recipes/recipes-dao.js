import recipesModel from "./recipes-model.js";

export const findAllRecipes = async () => {
    const recipes = await recipesModel.find()
    return recipes
}
export const createRecipe = async (recipe) => {
    const actualInsertedRecipe = await recipesModel.create(recipe)
    return actualInsertedRecipe
}
export const deleteRecipe = async (cid) => {
    const status = await recipesModel.deleteOne({_id: cid})
    return status
}
export const updateRecipe = () => {}