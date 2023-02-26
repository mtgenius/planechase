import cardsJson from '../cards.json';
import Card from '../types/card';

export default function mapCardToImage({
  path: cardPath,
  set,
}: Readonly<Card>): string {
  const { extension, path: setPath } = cardsJson.sets[set];
  return `./images/${setPath}/${cardPath}.${extension}`;
}
