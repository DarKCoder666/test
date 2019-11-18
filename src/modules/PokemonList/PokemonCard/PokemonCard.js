import React, { Component } from 'react'
import './PokemonCard.scss';
import { Card } from 'antd';

const { Meta } = Card;
export class PokemonCard extends Component {
  render() {
    const { pokemon } = this.props;
    const typesElements = pokemon.types.map((t, i) => (
      <span key={i}>{t.type.name}</span>
    ));

    return (
      <div className="pokemonCard">
        <Card
          hoverable
          className="pokemonCard-wrap"
          style={{ width: 240 }}
          cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
        >
          <Meta className="pokemonCard-title" title={pokemon.name}
            description={
              <div>
                <p>Height: {pokemon.height} <br /> Weight: {pokemon.weight}</p>
                <div className="pokemonCard-types">
                  {typesElements}
                </div>
              </div>
            } />
        </Card>
      </div>
    )
  }
}

export default PokemonCard
