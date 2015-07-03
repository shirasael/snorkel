var SystemCard = React.createClass({displayName: "SystemCard",
    render: function () {
        var sysUrl = "/system/" + this.props.sysName;
        var confs = this.props.configs.map(function (cfg, index) {
            return (
                React.createElement("li", {className: "collection-item", key: index}, React.createElement("div", null, cfg, React.createElement("a", {href: sysUrl + "/" + cfg, className: "secondary-content"}, React.createElement("i", {className: "mdi-content-send"}))))
            );
        });
        return (
        	React.createElement("div", {class: "col s4"}, 
	          React.createElement("div", {class: "card small"}, 
	            React.createElement("div", {class: "card-image waves-effect waves-block waves-light"}, 
	              React.createElement("img", {class: "activator", src: this.props.sysImg})
	            ), 
	            React.createElement("div", {class: "card-content"}, 
	              React.createElement("span", {class: "card-title activator grey-text text-darken-4"}, this.props.sysName, 
	              	React.createElement("i", {class: "mdi-navigation-more-vert right"})
	              )
	            ), 
	            React.createElement("div", {class: "card-reveal"}, 
	              React.createElement("span", {class: "card-title grey-text text-darken-4"}, this.props.sysName, React.createElement("i", {class: "mdi-navigation-close right"})), 
	              confs
	            )
	          )
          )
        );
    }
});

var SystemsList = React.createClass({displayName: "SystemsList",
    getInitialState: function () {
        return {systems: []};
    },
    componentDidMount: function () {
        this.fetchSystems();
    },
    fetchSystems: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({systems: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    renderSystems: function () {
        return this.state.systems.map(function (sys, index) {
            return (
                React.createElement(SystemCard, {sysName: sys.name, key: index, configs: sys.configs, sysImg: "images/gear.jpg"})
            );
        });
    },
    render: function () {
      return (
          React.createElement("div", {className: "row"}, 
              this.renderSystems()
          )
      );

    }
});

