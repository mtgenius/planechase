import type { ReactElement } from 'react';
import type DisplayCard from '../../../../types/display-card';
import styles from './main.module.scss';
import mapDisplayCardToComponent from '../../../../utils/map-display-card-to-component';

interface Props {
  readonly children: readonly DisplayCard[];
}

const rootClassName: string = styles.root;

export default function Main({ children }: Readonly<Props>): ReactElement {
  return (
    <div className={rootClassName}>
      {children.map(mapDisplayCardToComponent)}
    </div>
  );
}
