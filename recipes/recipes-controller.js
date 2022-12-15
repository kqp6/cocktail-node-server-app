import * as recipeDao from './recipes-dao.js'


export const getRecipes = () => recipes;

const RecipesController = (app) => {

    const createRecipe   = async (req, res) => {
        const recipe = req.body
        // movie["_id"] = (new Date()).getTime() + ''
        // movie["likes"] = 0
        // movie["liked"] = false
        // movies.push(movie)
        const actualRecipe = await recipeDao.createRecipe(recipe)
        res.send(actualRecipe)
    }
    const findAllRecipes = async (req, res) => {
        const recipesInDatabase = await recipeDao.findAllRecipes()
        res.send(recipesInDatabase)
    }
    const updateRecipe   = (req, res) => {
        const cid = req.params['cid']
        const recipeUpdates = req.body
        const recipeIndex = recipes.findIndex(
            (c) => c._id === cid)
        recipes[recipeIndex] = {
            ...recipes[recipeIndex],
            ...recipeUpdates
        }
        res.send(200)
    }
    const deleteRecipe   = async (req, res) => {
        const cid = req.params['cid']
        const status = await recipeDao.deleteRecipe(cid)
        // movies = movies.filter(
        //     (m) => m._id !== mid)
        res.send(status)
    }

    app.post  ('/cocktails', createRecipe)
    app.get   ('/cocktails', findAllRecipes)
    app.put   ('/cocktails/:cid', updateRecipe)
    app.delete('/cocktails/:cid', deleteRecipe)
}

export default RecipesController;