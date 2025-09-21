import MainRouter from "./routes";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

import "./assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthProvider from "./providers/AuthCtxProvider";
import SportFieldDataProvider from "./providers/SportFieldDataProvider";
import ImageManagerCtxProvider from "./providers/ImageManagerCtxProvider";

TimeAgo.addDefaultLocale(en);

function App() {
  return (
    <AuthProvider>
      <SportFieldDataProvider>
        <ImageManagerCtxProvider>
          <MainRouter />
        </ImageManagerCtxProvider>
      </SportFieldDataProvider>
    </AuthProvider>
  );
}

export default App;
