import React, { Component } from 'react';
import SortableTbl from 'react-sort-search-table';
import fetch from 'isomorphic-fetch';
import './App.css';

class App extends Component {
  render() {
    return <div className="pokeapp">
      <h1> PokeDex! </h1>
      <PokemonList />
    </div>;
  }
}

const PhotoComponent = (props) => {
  return (
    <td style={{width: '200px', minWidth: '200px', backgroundColor: '#fff'}} >
      <img src={props.tdData} />
    </td>
  );
};

class PokemonList extends Component{
  constructor(props){
    super(props);
    this.state = {
      species: [],
      fetched: false,
      loading: false
    };
  }

  componentWillMount(){
    this.setState({
      loading: true
    });
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=150').then(res => res.json())
    .then(response => {
      this.setState({
        species: response.results,
        loading: true,
        fetched: true
      });
    });
  }

  pokemonsData(){
    const { species } = this.state;
    const result = species.map((pokemon, index) => {
      return {
        name: pokemon.name,
        photoUrl: `http://pokeapi.co/media/sprites/pokemon/${index+1}.png` 
      }
    });
    console.log('result', result);
    return result;
  }

  render(){
    const { fetched, loading } = this.state;
    let table;

    if (fetched){
      table = <SortableTbl tblData={this.pokemonsData()}
        tHead={[ "Name", "Photo" ]}
        dKey={[ "name", "photoUrl" ]}
        search={true}
        customTd={[{ custd: PhotoComponent, keyItem: "photoUrl" }]}
        defaultCSS={true}
      />
    } else if (loading && !fetched){
      table = <p> Loading ...</p>;
    } else {
      table = <div/>;
    }

    return <div>
      {table}
    </div>;
  }
}

export default App;