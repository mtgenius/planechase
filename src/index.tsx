import { render } from 'react-dom';
import App from './features/app';

const CONTAINER: HTMLElement | null = document.getElementById('root');

render(<App />, CONTAINER);
