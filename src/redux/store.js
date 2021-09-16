import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";

const logger = createLogger();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger), applyMiddleware(thunk))
);

export default store;
