import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { OrderBookWidget } from "./orderBook/OrderBookWidget";
import { useEffect, useState } from "react";

function App() {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });
      window.removeEventListener("online", () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <Provider store={store}>
      {!onlineStatus && <span>you are offline</span>}
      <div className=" p-24">{onlineStatus && <OrderBookWidget />}</div>
    </Provider>
  );
}

export default App;
