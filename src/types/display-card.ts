export default interface DisplayCard {
  readonly disabled: boolean;
  readonly effect: boolean;
  readonly image: string;
  readonly key: string;
  readonly name: string;
  readonly onAction?: VoidFunction | undefined;
}
