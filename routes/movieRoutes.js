

const router = express.Router();
router.get("/movie-list", getCourses);
router.get("/details/:movieId", getMovieDetails);
router.post("/create", adminAuth, upload.single("image"), createMovie);
router.put("/update/:movieId", adminAuth, upload.single("image"), updateMovie);
router.delete("/delete/:movieId", adminAuth, deleteMovie);

