import cardsJson from '../cards.json';
import type Card from '../types/card';

export default function filterCardsByDefaultDeck({
  name: cardName,
  set,
}: Readonly<Card>): boolean {
  const setName: string = cardsJson.sets[set].name;
  return (
    setName === 'Planechase Anthology' ||
    (setName === 'March of the Machine Commander' && cardName === 'Towashi')
  );
}
