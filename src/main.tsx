import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { GoogleTranslateWrapper } from "./components/translation/GoogleTranslateWrapper.tsx";
import AppErrorBoundary from "./components/AppErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <AppErrorBoundary>
    <Provider store={store}>
      <GoogleTranslateWrapper>
        <RouterProvider router={router} />
      </GoogleTranslateWrapper>
    </Provider>
  </AppErrorBoundary>,
);
