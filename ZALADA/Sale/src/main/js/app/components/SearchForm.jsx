const React = require('react');

class SearchForm extends React.Component {

    render() {
        return (
            <form className="navbar-form navbar-left" role="search">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchForm;