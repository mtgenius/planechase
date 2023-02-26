import type { ReactElement } from 'react';
import ActionBanner from '../../../../components/action-banner';

interface Props {
  readonly children: number;
}

export default function ActivePlanesBanner({
  children,
}: Readonly<Props>): ReactElement | null {
  if (children === 1) {
    return null;
  }

  return (
    <ActionBanner>
      <p>
        Active Planes: <strong>{children}</strong>
      </p>
    </ActionBanner>
  );
}
