import React, { Component } from 'react';
import './citations.css';
import axios from 'axios';

class Citations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: '',
			citation: '',
			episode: '',
			colors: ['blue','red','blueLight','green','gray'],
			color: '',
		}
	}

	componentDidMount() {
		this.nextQuote()
	}

	randomColor = () => {
		let colors = this.state.colors;
		return colors[Math.floor(Math.random()*colors.length)];
	}

	nextQuote = () => {
		axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://kaamelott.chaudie.re/api/random/personnage/Perceval`)

		.then(response => {
			this.setState({
				author: response.data.citation.infos.personnage,
				citation: response.data.citation.citation,
				episode: response.data.citation.infos.episode,
				color: this.randomColor(),
			})
		})
		.catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<div className={"citation " + this.state.color}>
			<div className="columns">
			<div className="column">
			<h1 className="title is-1 has-text-centered">Random Citations</h1>
			</div>
			</div>
			<div className="columns is-centered">
			<div className="column is-10 ">
			<div className="columns">
			<h4 className="column is-size-4 has-text-weight-bold">episode : { this.state.episode }</h4>
			</div>
			<div className="columns">
			<div className="column has-text-centered is-size-5 is-capitalized is-italic">citation : { this.state.citation }</div>
			</div>
			<div className="columns">
			<h4 className="column has-text-right is-size-4 has-text-weight-bold">" { this.state.author } "</h4>
			</div>
			</div>
			</div>
			<div className="columns is-centered">
			<div className="column is-1">
			<button className="button is-success is-hovered is-medium" onClick={this.nextQuote}>Next Quote</button>
			</div>
			</div>
			</div>
			)
	}

}

export default Citations