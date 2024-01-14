// userReducer.js

// Action Types
const login_success = 'login_success';
const error_user='error_user'
// const CLEAR_USER = 'CLEAR_USER';


// Initial State
const initialState = {
  user: {},
};

// Reducer Function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case login_success:
      return {
        ...state,
        user: action.payload,//payload kae andar data hai user ka payload action kee hee property hai
      };
      case error_user:
       return initialState
      

    // case CLEAR_USER:
    //   return {
    //     ...state,
    //     user: null,
    //   };

    default:
      return initialState;
  }
};

export default userReducer;
