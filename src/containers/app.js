import React, {Component} from "react"
import SearchBar from "../components/search-bar";
import VideoList from "./video-list";
import axios from "axios";
import VideoDetail from "../components/video-detail";
import MovieVideo from "../components/movie-video";

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by_popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=3589e4f74396d7fcd39bc5f856278200";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {movieList: {}, currentMovie: {}};
    }

    componentWillMount() {
        this.initMovies();
    }

    initMovies() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function (response) {
            console.log("--------------");
            console.log("---", response);
            console.log("--------------");
            this.setState({
                movieList: response.data.results.slice(1, 6),
                currentMovie: response.data.results[0]
            }, function () {
                this.applyVideoToCurrentMovie();
            });
        }.bind(this));
    }

    applyVideoToCurrentMovie() {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function (response) {
            const youtubeKey = response.data.videos.results[0].key;
            let newCurrentMovie = this.state.currentMovie;
            newCurrentMovie.videoId = youtubeKey;
            this.setState({currentMovie: newCurrentMovie});
        }.bind(this))
    }

    receiveCallBack(movie){
        this.setState({currentMovie: movie}, function () {
            this.applyVideoToCurrentMovie();
        });
    }

    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5) {
                return <div><VideoList movieList={this.state.movieList} callback={this.receiveCallBack.bind(this)}/></div>
            }
        };

        const renderMovie = () => {
            if (this.state.currentMovie.videoId) {
                return <MovieVideo videoId={this.state.currentMovie.videoId}/>
            } else {
                return <div>Pas de donnée</div>;
            }
        };
        return (<div>
            <div className="search_bar">
                <SearchBar/>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {renderMovie()}
                    <VideoDetail title={this.state.currentMovie.title}  description={this.state.currentMovie.overview}/>
                </div>
                <div className="col-md-4">
                    {renderVideoList()}
                </div>
            </div>

        </div>)
    }
}

export default App