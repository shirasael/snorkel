var Ajax = React.createClass({displayName: "Ajax",
	render: function() {
		var style = {color: this.props.color};
		return (
			React.createElement("figure", {className: "systemCardFront", style: style}, 
				React.createElement("img", {src: this.props.imgSrc}), 
				React.createElement("h1", null, this.props.sysName)
			)
		);
	}
});