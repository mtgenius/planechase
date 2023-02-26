import type { Attributes, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import type Card from '../../types/card';
import type DisplayCard from '../../types/display-card';
import filterCardsByChoice from '../../utils/filter-cards-by-choice';
import filterCardsByPlane from '../../utils/filter-cards-by-plane';
import filterCardsByScrying from '../../utils/filter-cards-by-scrying';
import filterCardsByTriggeredChaos from '../../utils/filter-cards-by-triggered-chaos';
import initializeDeck from '../../utils/initialize-deck';
import interplanarTunnel from '../../utils/interplanar-tunnel';
import mapActivePlaneCountToSpacialMerging from '../../utils/map-active-plane-count-to-spacial-merging';
import mapCardToDisplay from '../../utils/map-card-to-display';
import mapCardToNoEffect from '../../utils/map-card-to-no-effect';
import mapCardToPoolsOfBecoming from '../../utils/map-card-to-pools-of-becoming';
import mapDeckDispatchToScryBottomHandler from './utils/map-deck-dispatch-to-scry-bottom-handler';
import shuffle from '../../utils/shuffle';
import type { ScryCard } from './components/scrying-banner';
import useScryingCards from './hooks/use-scrying-cards';

interface State {
  readonly activeChaos: readonly VoidFunction[];
  readonly activePlaneCount: number;
  readonly cards: readonly (Required<Attributes> & DisplayCard)[];
  readonly isChoosing: boolean;
  readonly scryingCards: readonly ScryCard[];
  readonly stackChaosCount: number;
}

const NONE = 0;

export default function useApp(): State {
  // States
  const [activePlaneCount, setActivePlaneCount] = useState(1);
  const [deck, setDeck] = useState(initializeDeck);

  const activePlanes: readonly Card[] = useMemo(
    (): readonly Card[] => deck.slice(0, activePlaneCount),
    [activePlaneCount, deck],
  );

  return {
    activePlaneCount,
    isChoosing: deck.some(filterCardsByChoice),
    scryingCards: useScryingCards(deck.filter(filterCardsByScrying), setDeck),

    activeChaos: useMemo((): readonly VoidFunction[] => {
      const reducePlanesToChaos = (
        activeChaos: readonly VoidFunction[],
        { name }: Readonly<Card>,
      ): readonly VoidFunction[] => {
        switch (name) {
          /*
          Pools of Becoming:
            Whenever you roll {CHAOS}, reveal the top three cards of your planar
            deck. Each of the revealed cards' {CHAOS} abilities triggers. Then
            put the revealed cards on the bottom of your planar deck in any
            order.
          */
          case 'Pools of Becoming':
            return [
              ...activeChaos,
              (): void => {
                setDeck((oldDeck: readonly Card[]): readonly Card[] => [
                  ...oldDeck.slice(0, activePlaneCount).map(mapCardToNoEffect),
                  ...oldDeck
                    .slice(activePlaneCount, activePlaneCount + 3)
                    .map(mapCardToPoolsOfBecoming),
                  ...oldDeck.slice(activePlaneCount + 3).map(mapCardToNoEffect),
                ]);
              },
            ];

          /*
          Stairs to Infinity:
            Whenever you roll {CHAOS}, reveal the top card of your planar deck.
            You may put it on the bottom of your planar deck.
          */
          case 'Stairs to Infinity':
            return [
              ...activeChaos,
              (): void => {
                setDeck((oldDeck: readonly Card[]): readonly Card[] => [
                  ...oldDeck.slice(0, activePlaneCount).map(mapCardToNoEffect),
                  {
                    ...oldDeck[activePlaneCount],
                    effect: 'stairs-to-infinity',
                  },
                  ...oldDeck.slice(activePlaneCount + 1).map(mapCardToNoEffect),
                ]);
              },
            ];
        }
        return activeChaos;
      };

      return activePlanes.reduce(reducePlanesToChaos, []);
    }, [activePlaneCount, activePlanes]),

    cards: useMemo((): readonly (Required<Attributes> & DisplayCard)[] => {
      // Choosing
      const choices: readonly Card[] = deck.filter(filterCardsByChoice);
      if (choices.length > NONE) {
        const mapChoiceToDisplay = (card: Readonly<Card>): DisplayCard => {
          const handleAction = (): void => {
            const findCard = ({ name, set }: Readonly<Card>): boolean =>
              card.name === name && card.set === set;

            const choose = (oldDeck: readonly Card[]): readonly Card[] => {
              const index: number = oldDeck.findIndex(findCard);
              return [
                oldDeck[index],
                ...shuffle([
                  ...oldDeck.slice(0, index),
                  ...oldDeck.slice(index + 1, oldDeck.length),
                ]),
              ].map(mapCardToNoEffect);
            };

            setDeck(choose);
          };

          return {
            ...mapCardToDisplay(card),
            effect: true,
            onAction: handleAction,
          };
        };

        return choices.map(mapChoiceToDisplay);
      }

      // Scrying
      const scryingCards: readonly Card[] = deck.filter(filterCardsByScrying);
      if (scryingCards.length > NONE) {
        const mapScryingCardToDisplay = (
          card: Readonly<Card>,
        ): DisplayCard => ({
          ...mapCardToDisplay(card),
          effect: true,
        });
        return scryingCards.map(mapScryingCardToDisplay);
      }

      // Triggered chaos
      const triggeredChaosCards: readonly Card[] = deck.filter(
        filterCardsByTriggeredChaos,
      );
      if (triggeredChaosCards.length > NONE) {
        const mapTriggeredChaosToDisplay = (
          card: Readonly<Card>,
        ): DisplayCard => ({
          ...mapCardToDisplay(card),
          disabled: card.phenomenon,
          effect: true,
          onAction(): void {
            const scryBottom = mapDeckDispatchToScryBottomHandler(setDeck);
            scryBottom(card);
          },
        });

        return triggeredChaosCards.map(mapTriggeredChaosToDisplay);
      }

      const mapCardNameToPlaneswalk = (name: string): VoidFunction => {
        switch (name) {
          /*
          Interplanar Tunnel:
            When you encounter ~, reveal cards from the top of your planar deck
            until you reveal five plane cards. Put a plane card from among them
            on top of your planar deck, then put the rest of the revealed cards
            on the bottom in a random order.
          */
          case 'Interplanar Tunnel':
            return function handleInterplanarTunnelPlaneswalk(): void {
              setActivePlaneCount(1);
              setDeck(interplanarTunnel);
            };

          /*
          Spatial Merging:
            When you encounter ~, reveal cards from the top of your planar deck
            until you reveal two plane cards. Simultaneously planeswalk to both
            of them. Put all other cards revealed this way on the bottom of your
            planar deck in any order.
          */
          case 'Spatial Merging':
            return function handleSpacialMergingPlaneswalk(): void {
              const newActivePlaneCount: number = activePlaneCount + 1;
              setActivePlaneCount(newActivePlaneCount);

              const spacialMerging: SetStateAction<readonly Card[]> =
                mapActivePlaneCountToSpacialMerging(newActivePlaneCount);
              setDeck(spacialMerging);
            };

          default:
            return function handlePlaneswalk(): void {
              setActivePlaneCount(1);
              setDeck((oldDeck: readonly Card[]): readonly Card[] => [
                ...oldDeck.slice(activePlaneCount),
                ...oldDeck.slice(0, activePlaneCount),
              ]);
            };
        }
      };

      const mapCardToPlaneswalk = (card: Readonly<Card>): DisplayCard => ({
        ...mapCardToDisplay(card),
        onAction: mapCardNameToPlaneswalk(card.name),
      });

      return deck.slice(0, activePlaneCount).map(mapCardToPlaneswalk);
    }, [activePlaneCount, deck]),

    stackChaosCount: deck
      .filter(filterCardsByTriggeredChaos)
      .filter(filterCardsByPlane).length,
  };
}
