import React, { Component } from 'react';
import axios from 'axios';

class Citations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiResult: '',
			author: '',
			citation: '',
			episode: '',
			arrayLength: '',
		}
	}

	componentDidMount() {
		axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://kaamelott.chaudie.re/api/all/personnage/Arthur`)

		.then(response => {
			this.setState({
				apiResult: response.data,
				author: response.data.citation[0].infos.personnage,
				citation: response.data.citation[0].citation,
				episode: response.data.citation[0].infos.episode,
				arrayLength: response.data.citation.length,
			})
		})
		.catch(error => {
			console.log(error);
		});
	}

	random = () => {
		let min = Math.ceil(0);
		let max = Math.floor(this.state.arrayLength);
		let index = Math.floor(Math.random() * (max - min)) + min;

		this.setState({
			author: this.state.apiResult.citation[index].infos.personnage,
			citation: this.state.apiResult.citation[index].citation,
			episode: this.state.apiResult.citation[index].infos.episode,
		})
		console.log(this.state.apiResult.citation[1].citation)
	}

	render() {
		return (
			<div>
			<div>personnage : { this.state.author }</div>
			<div>citation : { this.state.citation }</div>
			<div>episode : { this.state.episode }</div>
			<button onClick={this.random}>click</button>
			</div>
			)
	}

}

export default Citations