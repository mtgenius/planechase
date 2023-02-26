import { ReactElement } from 'react';
import Card from '../components/card';
import type DisplayCard from '../types/display-card';

export default function mapDisplayCardToComponent(
  card: Readonly<DisplayCard>,
): ReactElement {
  return <Card {...card} />;
}
