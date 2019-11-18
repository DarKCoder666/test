export function isThereActivePokemonType(types) {
  for(let i = 0; i < types.length; i++) {
    if(types[i].active) return true;
  }

  return false;
}

export function removeRepeatedObjects(mergedArray) {
  const pokemonNames = [];
  const filtredArray = mergedArray.map(el => {
    if( pokemonNames.includes(el.name) ) return false;

    pokemonNames.push(el.name);
    return el;
  });

  return filtredArray;
}
