export default interface Card {
  readonly effect?:
    | 'interplanar-tunnel'
    | 'pools-of-becoming'
    | 'stairs-to-infinity'
    | undefined;
  readonly name: string;
  readonly path: string;
  readonly phenomenon: boolean;
  readonly set: number;
}
