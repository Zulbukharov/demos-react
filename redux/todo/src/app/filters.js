export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

export const availableColors = ["green", "blue", "orange", "purple", "red"];
export const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

const initialState = {
  status: StatusFilters.All,
  colors: [],
};

// {type: 'filters/statusFilterChanged', payload: filterValue}
// {type: 'filters/colorFilterChanged', payload: {color, changeType}}
const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "filters/statusFilterChanged":
      return {
        ...state,
        status: action.payload,
      };
    case "filters/colorFilterChanged":
      switch (action.payload.changeType) {
        case false:
          return {
            ...state,
            colors: state.colors.filter(
              (color) => color !== action.payload.color
            ),
          };
        case true:
          return {
            ...state,
            colors: [...state.colors, action.payload.color],
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export const colorFilterChanged = (color, changeType) => {
  return {
    type: "filters/colorFilterChanged",
    payload: { color, changeType },
  };
};

export default filtersReducer;
