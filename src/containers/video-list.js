import React from "react"
import VideoListItem from "../components/video-list-item";
const VideoList = ({movieList,callback}) => {
    console.log("movieList=",movieList);

    function receiveCallBack(movie){
        callback(movie);
    }

    return (
        <div>
            <ul>
                {
                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                    })
                }

            </ul>
        </div>

    );
};


export default  VideoList