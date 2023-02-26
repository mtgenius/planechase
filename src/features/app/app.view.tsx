import type { ReactElement } from 'react';
import Settings from '../../components/settings';
import useApp from './app.hook';
import './app.scss';
import ActiveChaosBanner from './components/active-chaos-banner';
import ActivePlanesBanner from './components/active-planes-banner';
import ChoiceBanner from './components/choice-banner';
import Main from './components/main';
import ScryingBanner from './components/scrying-banner';
import StackChaosBanner from './components/stack-chaos-banner';

export default function App(): ReactElement {
  const {
    activeChaos,
    activePlaneCount,
    cards,
    isChoosing,
    scryingCards,
    stackChaosCount,
  } = useApp();

  return (
    <>
      <Settings />
      {isChoosing && <ChoiceBanner />}
      <ActiveChaosBanner>{activeChaos}</ActiveChaosBanner>
      <ActivePlanesBanner>{activePlaneCount}</ActivePlanesBanner>
      <ScryingBanner>{scryingCards}</ScryingBanner>
      <StackChaosBanner>{stackChaosCount}</StackChaosBanner>
      <Main>{cards}</Main>
    </>
  );
}
