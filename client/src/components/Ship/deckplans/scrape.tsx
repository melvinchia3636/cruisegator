/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { setDeckPlansData } from '../../../state_manage/actions';
import store from '../../../state_manage/store';

const getData = async (id: string): Promise<void> => {
  const response = await axios.get(
    `https://cors-anywhere.thecodeblog.net/www.cruisedeckplans.com/DP/deckplans/deckbydeck.php?ship=${id}&deck=8`,
  ); // &deck=${firstdeck}
  const raw = response.data;
  const parser = new DOMParser();
  const html = parser.parseFromString(raw, 'text/html');
  const {
    0: firstdeck,
    length: l,
    [l - 1]: lastdeck,
  }: number[] = Array.from(html.querySelector('.panel-body')?.querySelectorAll('a') || [])
    .map((e) => parseInt((e.href.match(/&deck=(\d+)$/) || [])[1], 10))
    .filter((e) => e);
  const panels = html.querySelectorAll('.panel.panel-default');
  const stateroomsRaw = Array.from(panels)
    .filter((e) => e.querySelector('.panel-title')?.textContent?.includes('Stateroom'))[0]
    .querySelector('.panel-body');
  const stateRoomsInner = stateroomsRaw?.querySelector('.sublisting')?.innerHTML || '';
  const stateroomsInnerRaw = stateRoomsInner
    .split('<br>')
    .filter((e) => e.trim())
    .map((e) => parser.parseFromString(e, 'text/html'));
  const stateroomsInnerRawGroup = [...Array(Math.ceil(stateroomsInnerRaw.length / 2))].map((_) =>
    stateroomsInnerRaw.splice(0, 2),
  );
  const staterooms = stateroomsInnerRawGroup.map(([title, categories]) => ({
    name: title.querySelector('div')?.textContent || '',
    img: title.querySelector('img')?.src.replace(window.location.origin, '') || '',
    categories: Array.from(categories.querySelectorAll('p > a')).map((e) => ({
      name: e.textContent || '',
      description:
        e
          .getAttribute('title')
          ?.replace(/Category .*?:/, '')
          .trim() || '',
      background: e.parentElement?.style.backgroundImage || '',
    })),
  }));

  store.dispatch(
    setDeckPlansData({
      decks: {
        firstdeck,
        lastdeck,
      },
      staterooms,
    }),
  );
};

export default getData;
