import axios from "axios";

export default axios.create({

    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI4M2MyYzFkYzRiMGY5ZDA2ODNlODIyYjBhMWU3NyIsInN1YiI6IjY0M2FjZTE2NGE0YmY2MDJlYzkwY2UxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MR-cucyaFGCNqzsUvWYoaTrMpKInqK_ox8JT2ezr12Q"
    }

});