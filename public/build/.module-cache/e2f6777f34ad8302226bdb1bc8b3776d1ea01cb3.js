var Ajax = {
	loading: false,
	result: null,
	fetch: function(onResultFetched, onError) {
		loading = true;
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        loading = false;
        result = data;
        onResultFetched(result);
      }.bind(this),
      error: function(xhr, status, err) {
        loading = false;
        result = null;
        onError(xhr, status, err);
      }.bind(this)
    });
	}
};

var NavBar = React.createClass({displayName: "NavBar",
  render: function() {
    return (
      React.createElement("div", {className: "navbar-fixed"}, 
        React.createElement("nav", null, 
          React.createElement("div", {className: "nav-wrapper blue darken-4"}, 
            React.createElement("ul", {className: "hide-on-med-and-down"}, 
              React.createElement("li", null, React.createElement("a", {href: "sass.html"}, React.createElement("i", {className: "material-icons"}, "search"))), 
              React.createElement("li", null, React.createElement("a", {href: "badges.html"}, React.createElement("i", {className: "material-icons"}, "view_module"))), 
              React.createElement("li", null, React.createElement("a", {href: "collapsible.html"}, React.createElement("i", {className: "material-icons"}, "refresh"))), 
              React.createElement("li", null, React.createElement("a", {href: "mobile.html"}, React.createElement("i", {className: "material-icons"}, "more_vert")))
            ), 
            React.createElement("a", {href: "/", className: "brand-logo"}, "Snorkel")
          )
        )
      )
    );
  }
});

var Layout = React.createClass({displayName: "Layout",
  render: function() {
    return (
      React.createElement("div", {className: "mainLayout"}, 
        React.createElement(NavBar, null), 
        React.createElement("br", null), 
        React.createElement("br", null), 
        React.createElement("div", {className: "container"}, 
          this.props.children
        )
      )
    );
  }
});

function getRandomColors() {
  colors = [["orange", "blue"], ["green", "red"], ["yellow", "purple"]];
  return colors[Math.floor(Math.random() * (colors.length - 1) + 0.5)];
};

