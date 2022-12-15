import likesModel from "./likes-model.js";

export const userLikesRecipe = async (uid, cid) => {
    return await likesModel.create({user: uid, recipe: cid})
}
export const userUnlikesRecipe = async(uid, cid) => {
    return await likesModel.deleteOne({user: uid, recipe: cid})
}
export const findRecipesLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: false})
        .populate('recipe', 'title')
        .exec()
}
export const findUsersThatLikeRecipe = async(cid) => {
    return await likesModel.find({recipe: cid}, {recipe: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()