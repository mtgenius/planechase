import type { ReactElement } from 'react';
import ActionBanner from '../../../../components/action-banner';

/*
"Stack" chaos refers to chaos abilities that have been placed on the stack.
To see chaos abilities that require user input to activate, see
  `ActiveChaosBanner`.
*/

interface Props {
  readonly children: number;
}

const NONE = 0;

export default function StackChaosBanner({
  children,
}: Readonly<Props>): ReactElement | null {
  if (children === NONE) {
    return null;
  }

  return (
    <ActionBanner>
      <p>Choose which chaos ability resolves first.</p>
      <p>{children} remaining</p>
    </ActionBanner>
  );
}
