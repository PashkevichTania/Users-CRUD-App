import {createContext, useContext, useReducer} from 'react';
import {ACTION_TYPES} from "const";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();


const initialState = {
  users: [],
  currentUser: {},
  pages: 1,
  currentPage: 1,
  images: [],
  createFormOpened: false,
  updateFormOpened: false,
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTION_TYPES.SET_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case ACTION_TYPES.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ACTION_TYPES.ADD_USER:
      const usersWithNew = state.users.concat(action.payload)
      return {
        ...state,
        users: usersWithNew,
      };
    case ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        users: action.payload,
      };
    case ACTION_TYPES.DELETE_USER:
      const id = action.payload;
      const usersWithoutDeleted = state.users.filter((user) => user.id !== id )
      return {
        ...state,
        users: usersWithoutDeleted,
      };
    case ACTION_TYPES.CREATE_FORM_OPENED:
      return {
        ...state,
        createFormOpened: action.payload,
      };
    case ACTION_TYPES.UPDATE_FORM_OPENED:
      return {
        ...state,
        updateFormOpened: action.payload,
      };
    default:
      throw new Error();
  }
}


export const GlobalContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <GlobalStateContext.Provider value={state} >
            <GlobalDispatchContext.Provider value={dispatch} >
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export function useGlobalStateContext() {
  const state = useContext(GlobalStateContext);

  if (!state) {
    throw Error('useGlobalState must be used within GlobalContextProvider');
  }

  return state;
}

export function useGlobalDispatchContext() {
  const dispatch = useContext(GlobalDispatchContext);

  if (!dispatch) {
    throw Error('useGlobalDispatch must be used within GlobalContextProvider');
  }

  return dispatch;
}

