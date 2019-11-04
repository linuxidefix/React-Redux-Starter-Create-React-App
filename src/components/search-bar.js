import React, {Component} from "react"

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {searchText:"", placeHolder: "Tapez votre film"}
    }


    render() {
        return (<div>
            <input onChange={this.handleChange} placeholder={this.state.placeHolder}/>
        </div>)
    }

    handleChange = event => {
        this.setState({searchText:event.target.value})
    };
}

export default SearchBar