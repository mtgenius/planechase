import type { MouseEvent, MouseEventHandler, MutableRefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './card.module.scss';

interface Props {
  readonly disabled: boolean;
  readonly effect: boolean;
  readonly onAction: VoidFunction | undefined;
}

interface State {
  readonly className: string;
  readonly handleClick: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const disabledClassName: string = styles.disabled;
const fadingOutClassName: string = styles.fading;
const rootClassName: string = styles.root;

export default function useCard({
  disabled,
  effect,
  onAction,
}: Readonly<Props>): State {
  // States
  const fadeTimeout: MutableRefObject<number | undefined> = useRef();
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Effects
  useEffect((): VoidFunction => {
    return (): void => {
      window.clearTimeout(fadeTimeout.current);
    };
  }, []);

  return {
    className: useMemo((): string => {
      const classNames: string[] = [rootClassName];

      if (disabled) {
        classNames.push(disabledClassName);
      }

      if (isFadingOut) {
        classNames.push(fadingOutClassName);
      }

      return classNames.join(' ');
    }, [disabled, isFadingOut]),

    handleClick: useMemo(():
      | MouseEventHandler<HTMLAnchorElement>
      | undefined => {
      if (typeof onAction === 'undefined') {
        return;
      }

      return (e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        // For effects (like choosing, scrying, etc.), we should not animate.
        if (effect) {
          onAction();
          return;
        }

        fadeTimeout.current = window.setTimeout(onAction, 500);
        setIsFadingOut(true);
      };
    }, [onAction]),
  };
}
