import type { ReactElement } from 'react';
import ActionBanner from '../../../../components/action-banner';
import Chaos from '../../../../components/chaos';

/*
"Active" chaos refers to active planes cards that have chaos abilities that
  would affect the game state. These abilities have not necessarily been
  activated yet.
To see chaos abilities that have been triggered and placed on the stack, see
  `StackChaosBanner`.
*/

interface Props {
  readonly children: readonly VoidFunction[];
}

const NONE = 0;

export default function ActiveChaosBanner({
  children,
}: Readonly<Props>): ReactElement | null {
  if (children.length === NONE) {
    return null;
  }

  return (
    <ActionBanner>
      {children.map(
        (handleClick: VoidFunction, index: number): ReactElement => (
          <Chaos key={index} onClick={handleClick} />
        ),
      )}
    </ActionBanner>
  );
}
