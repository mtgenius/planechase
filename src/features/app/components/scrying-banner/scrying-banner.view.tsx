import type { ReactElement } from 'react';
import ActionBanner from '../../../../components/action-banner';

interface Props {
  readonly children: readonly ScryCard[];
}

export interface ScryCard {
  readonly key: string;
  readonly name: string;
  readonly onBottom: VoidFunction;
  readonly onTop: VoidFunction;
}

const NONE = 0;

export default function ScryingBanner({
  children,
}: Readonly<Props>): ReactElement | null {
  if (children.length === NONE) {
    return null;
  }

  return (
    <ActionBanner>
      {children.map(
        ({ key, onBottom, onTop }: Readonly<ScryCard>): ReactElement => {
          // TODO: For scrying >1 cards, we should display the card name also.
          //   No planes currently allow you to scry >1.
          return (
            <div key={key}>
              <button onClick={onBottom}>Bottom</button>
              <button onClick={onTop}>Top</button>
            </div>
          );
        },
      )}
    </ActionBanner>
  );
}
