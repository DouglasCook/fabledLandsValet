import {
  ADD_ITEM,
  REMOVE_ITEM,
  SWAP_ITEM_COLLECTION,
  ADD_STASH,
  REMOVE_STASH,
  CREATE_NEW_CHARACTER,
  LOAD_SAVE,
  MOVE_SHARDS_TO_STASH,
} from '../actions';


export const initialState = {
  personal: {
    items: [
      {
        name: 'Wooden Sword',
        key: 'Wooden Sword-0000',
        effects: [
          { skill: 'combat', value: 1 },
        ]
      },
    ]
  },
  Bank: {
    shards: 0,
    items: []
  },
  Invested: {
    shards: 0,
    items: []
  },
};

export default function possessions(state = initialState, action) {
  switch (action.type) {

    case ADD_ITEM: {
      // add a unique key since there may be multiple instances of the same item
      const newItem = { ...action.item, key: Date.now() };
      return {
        ...state,
        personal: {
          items: [...state.personal.items, newItem],
        }
      };
    }

    case REMOVE_ITEM: {
      const { items } = state.personal;
      return {
        ...state,
        personal: {
          items: [
            ...items.slice(0, action.index),
            ...items.slice(action.index + 1),
          ],
        }
      };
    }

    case SWAP_ITEM_COLLECTION: {
      const { item, oldCol, newCol } = action;
      const itemIndex = state[oldCol].items.findIndex((i) => i.key === item.key);

      return {
        ...state,
        [oldCol]: {
          ...state[oldCol],
          items: [
            ...state[oldCol].items.slice(0, itemIndex),
            ...state[oldCol].items.slice(itemIndex + 1),
          ],
        },
        [newCol]: {
          ...state[newCol],
          items: [...state[newCol].items, state[oldCol].items[itemIndex]]
        }
      };
    }

    case MOVE_SHARDS_TO_STASH:
      return {
        ...state,
        [action.stashName]: {
          ...state[action.stashName],
          shards: state[action.stashName].shards + action.modifier
        }
      };

    case ADD_STASH:
      return {
        ...state,
        [action.name]: {
          shards: 0,
          items: []
        }
      };

    case REMOVE_STASH: {
      const newState = { ...state };
      delete newState[action.name];
      return newState;
    }

    case CREATE_NEW_CHARACTER:
      return initialState;

    case LOAD_SAVE:
      return action.state.possessions;

    default:
      return state;
  }
}
