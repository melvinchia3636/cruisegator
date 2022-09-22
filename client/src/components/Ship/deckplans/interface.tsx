export interface Decks {
  firstdeck: number;
  lastdeck: number;
}

export interface Category {
  name: string;
  description: string;
  background: string;
}

export interface Stateroom {
  name: string;
  img: string;
  categories: Category[];
}

export interface DeckPlansData {
  decks: Decks;
  staterooms: Stateroom[];
}
