import type { ReactElement } from 'react';
import type DisplayCard from '../../types/display-card';
import useCard from './card.hook';

export default function Card({
  disabled,
  effect,
  image,
  name,
  onAction,
}: Readonly<DisplayCard>): ReactElement {
  const { className, handleClick } = useCard({ disabled, effect, onAction });

  if (typeof handleClick === 'function') {
    return (
      <a className={className} href="" onClick={handleClick}>
        <img alt={name} src={image} />
      </a>
    );
  }

  return (
    <span className={className}>
      <img alt={name} src={image} />
    </span>
  );
}
