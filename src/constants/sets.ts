import cardsJson from '../cards.json';

interface Set {
  ext: string;
  name: string;
  path: string;
}

const mapSetsToSet = ({ ext, name, path }: Set): Set => ({ ext, name, path });

export default cardsJson.sets.map(mapSetsToSet);
