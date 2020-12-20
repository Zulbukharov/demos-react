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

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "filters/statusFilterChanged":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;
