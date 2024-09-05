

const router = express.Router();

router.get("/avg-rating/:movieId", userAuth, getAverageRating);
router.get("/movie-review/:movieId", userAuth, getMovieReviews);
router.post("/add-review", userAuth, addReview);
router.put("/delete/:reviewId", userAuth, deleteReview);

