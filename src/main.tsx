import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import router from "./routes/index.tsx";
import { persistor, store } from "./redux/store.ts";
import themeConfig from "./theme/themeConfig.ts";

import "./index.css";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-right" visibleToasts={1} />
      <ConfigProvider theme={themeConfig}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
