import React from "react";
import { AppShell } from "./components/Layout/AppShell";
import { ViewerPage } from "./features/viewer/ViewerPage";
import { ViewerProvider } from "./store/ViewerContext";

function App() {
  return (
    <ViewerProvider>
      <AppShell>
        <ViewerPage />
      </AppShell>
    </ViewerProvider>
  );
}

export default App;
