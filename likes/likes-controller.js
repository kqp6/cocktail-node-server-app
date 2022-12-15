//import {getMovies} from "../movies/movies-controller.js";
import users from "../users/users.js";
import * as likesDao from "./likes-dao.js";

let likes = [
    {_id: '123', user: '111', recipe: '123'},
    {_id: '234', user: '111', recipe: '234'},
    {_id: '345', user: '222', recipe: '345'},
    {_id: '456', user: '333', recipe: '345'},
]

const LikesController = (app) => {
    const populate = (
        {
            rawResults, fieldToPopulate,
            sourceData, sourceField
        }) => {
        const populatedResults = rawResults.map((raw) => {
            const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
            return ({
                ...raw,
                [fieldToPopulate]: source
            })
        })
        return populatedResults
    }
    const userLikesRecipe = async (req, res) => {
        // const uid = req.params.uid
        const uid = req.session['currentUser']._id
        const cid = req.params.cid

        const newLike = await likesDao.userLikesRecipe(uid, cid)
        // likes.push(newLike)
        res.json(newLike)
    }
    const userUnlikesRecipe = async (req, res) => {
        // const uid = req.params.uid
        // const mid = req.params.mid

        const {uid, cid} = req.params

        const status = await likesDao.userUnlikesRecipe(uid, cid)

        // likes = likes.filter((l) => l.user !== uid && l.movie !== mid)
        res.send(status)
    }
    const findAllLikes = async (req, res) => {
        const likes = await likesDao.findAllLikes()
        res.json(likes)
    }
    const findRecipesLikedByUser = async (req, res) => {
        const uid = req.params.uid
        const recipes = await likesDao.findRecipesLikedByUser(uid)
        res.json(recipes)
        // const movies = likes.filter((like) => like.user === uid)
        // const populatedMovies = populate({
        //     rawResults: movies,
        //     fieldToPopulate: 'movie',
        //     sourceData: getMovies(),
        //     sourceField: '_id'
        // })
        // res.json(populatedMovies)
    }
    const findUsersWhoLikedRecipe = async (req, res) => {
        const cid = req.params.cid
        const users = await likesDao.findUsersThatLikeRecipe(cid)
        res.json(users)

        // const usersWhoLikeMovie = likes.filter((like) => like.movie === mid)
        // const populateUsers = populate({
        //     rawResults: usersWhoLikeMovie,
        //     fieldToPopulate: 'user',
        //     sourceData: users,
        //     sourceField: '_id'
        // })
        // res.json(populateUsers)
    }

    app.post('/users/likes/:cid', userLikesRecipe)
    app.delete('/users/unlikes/:cid', userUnlikesRecipe)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findRecipesLikedByUser)
    app.get('/recipes/:cid/likes', findUsersWhoLikedRecipe)
    // app.put(updateLike)
}

export default LikesController;