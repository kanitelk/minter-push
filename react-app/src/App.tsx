import "./App.scss";
import "antd/dist/antd.css";

import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Route, Router, Switch } from "react-router-dom";

import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import { AppStoreContext } from "./stores/appStore";
import history from "./stores/history";
import { PresetStoreContext } from "./stores/presetStore";
import CreatedView from "./views/CreatePush/CreatedView";
import HistoryView from "./views/History/HistoryView";
import HomeView from "./views/Home/HomeView";
import MultiView from "./views/Multi/Multi";
import NewMultiView from "./views/NewMulti/NewMulti";
import PresetView from "./views/Preset/Preset";
import TgView from "./views/TgView/TgView";
import WalletView from "./views/Wallet/WalletView";
import LoginView from "./views/Login/LoginView";

const App: React.FC = observer(() => {
  const { t, i18n } = useTranslation();
  const store = useContext(AppStoreContext);
  const pStore = useContext(PresetStoreContext);
  store.changeLocale(i18n.language.substring(0, 2));

  let layoutStyle = {
    minHeight: "100vh",
    backgroundRepeat: pStore.backgroundRepeat,
    backgroundImage: `url(${pStore.background})`,
    backgroundColor: pStore.backgroundColor
  };

  return (
    <Router history={history}>
      <Layout style={layoutStyle}>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route exact path="/create/:link">
            <CreatedView />
          </Route>
          <Route exact path="/history">
            <HistoryView />
          </Route>
          <Route exact path="/multi">
            <NewMultiView />
          </Route>
          <Route path="/multi/:link">
            <MultiView />
          </Route>
          <Route exact path="/preset">
            <PresetView />
          </Route>
          <Route path="/tg/:link">
            <TgView />
          </Route>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/:link">
            <WalletView />
          </Route>
          <Route>
            <h2 style={{ marginTop: "2rem", textAlign: "center" }}>
              404: Not Found
            </h2>
          </Route>
        </Switch>
        {pStore.showFooter && <Footer />}
      </Layout>
    </Router>
  );
});

export default App;
