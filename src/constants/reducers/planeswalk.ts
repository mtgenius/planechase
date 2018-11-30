interface GlobalState {
  [key: string]: any;
}

export default function planeswalkReducer(
  global: GlobalState,
  additionalState: GlobalState = {}
) {
  return {
    active: 1,
    deck: [
      ...global.deck.slice(global.active, global.length),
      ...global.deck.slice(0, global.active)
    ],
    ...additionalState
  };
};
