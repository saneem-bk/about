

const createMovie = async (req, res, next) => {
    
    try {
        const user = req.user;

        const { title, description, genre,releaseDate ,director,cast} = req.body;
        let imageUrl;

        if (!title || !description || !genre || !releaseDate || director || cast) {
            return res.status(400).json({ message: "all fields required" });
        }

        const isMovieExist = await Movie.findOne({ title });

        if (isMovieExist) {
            return res.status(400).json({ success: false, message: "movie already exist" });
        }

        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        }

        const newMovie= new Movie({ title, description, releaseDate,genre,director,cast,image: imageUrl && imageUrl  });
        
        await newMovie.save();

        res.status(201).json({ success: true, message: "movie created successfully" });
    } catch (error) {
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const { title, description, releaseDate, genre,director,cast } = req.body;
        let imageUrl;

        const isMovieExist = await Movie.findOne({ _id: movieId });

        if (!isMovieExist) {
            return res.status(400).json({ success: false, message: "movie does not exist" });
        }

        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        }

        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            { title, description, releaseDate, genre, director,cast},
            { new: true }
        );

        res.status(200).json({ success: true, message: "movie updated successfully", data: updatedMovie });
    } catch (error) {
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movieDeleted = await Movie.findByIdAndDelete({ _id: movieId });

        if (!movieDeleted) res.status(400).json({ success: true, message: "movie already deleted" });

        res.status(200).json({ success: true, message: "movie deleted successfully", data: movieDeleted });
    } catch (error) {
        next(error);
    }
};

const getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();

        res.status(200).json({ success: true, message: "movies fetched", data: movies });
    } catch (error) {
        next(error);
    }
};

const getMovieDetails = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movieDetails = await Movie.findById(movieId).populate("reviews");

        res.status(200).json({ success: true, message: "courses fetched", data: movieDetails });
    } catch (error) {
        next(error);
    }
};

