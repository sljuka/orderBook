import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { OrderBookWidget } from "./orderBook/OrderBookWidget";

function App() {
  return (
    <Provider store={store}>
      <div className=" p-24">
        <OrderBookWidget />
      </div>
    </Provider>
  );
}

export default App;
