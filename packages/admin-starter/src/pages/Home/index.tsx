import React, { FC, useMemo } from "react";
import Banner from "./components/Banner";
import MainView from "./components/MainView";
import Tags from "./components/Tags";
import useStores from "../../hooks/useStores";

const Home: FC = () => {
  const { commonStore } = useStores();
  const { token, appName } = commonStore;
  const tags = useMemo(() => {
    commonStore.loadTags();
    return commonStore.tags
  }, [commonStore]);
  console.log(tags)
  return (
    <div className="home-page">
      <Banner token={token} appName={appName} />
      <div className="container page">
        <div className="row">
          <MainView />
          <Tags />
        </div>
      </div>
    </div>
  );
};

export default Home;
