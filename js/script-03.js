var Card = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var vm = this;
        $.get("https://api.github.com/users/" + this.props.login, function (data) {
            vm.setState(data);
        })
    },
    render: function () {
        return (
            <div className="col-md-3">
                <div className="card">
                    <img className="card-img-top img-fluid" src={this.state.avatar_url} alt="Card image cap"></img>
                    <div className="card-block">
                        <h4 className="card-title">{this.state.name}</h4>
                        <p className="card-text">{this.state.bio}</p>
                        <p className="card-text"><a href={this.state.blog}>{this.state.blog}</a></p>
                    </div>
                </div>
            </div>
        );
    }
})

var Main = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <Card login="trungk18" />
                    <Card login="juliangarnier" />
                </div>
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById("app"));