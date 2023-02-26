import type { PropsWithChildren, ReactElement } from 'react';
import styles from './action-banner.module.scss';

const rootClassName: string | undefined = styles.root;

export default function ActionBanner({
  children,
}: Readonly<PropsWithChildren>): ReactElement | null {
  return <div className={rootClassName}>{children}</div>;
}
