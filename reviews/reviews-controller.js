import * as dao from "./reviews-dao.js"
import {findReviewsByAuthor, findReviewsByRecipe} from "./reviews-dao.js";

const ReviewsController = (app) => {
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']
        review.author = currentUser._id
        const actualReview = await dao.createReview(review)
        res.json(actualReview)
    }
    const findReviewsByRecipe = async (req, res) => {
        const cID = req.params.cID
        const reviews = await dao.findReviewsByRecipe(cID)
        res.json(reviews)
    }
    const findReviewsByAuthor = async (req, res) => {
        const author = req.params.author
        const reviews = await dao.findReviewsByAuthor(author)
        res.json(reviews)
    }
    app.post('/api/reviews', createReview)
    app.get('/api/cocktails/:cID/reviews', findReviewsByRecipe)
    app.get('/api/users/:author/reviews', findReviewsByAuthor)
}
export default ReviewsController