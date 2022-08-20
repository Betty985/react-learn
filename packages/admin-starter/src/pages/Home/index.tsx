import React, { FC, useEffect } from "react";
import Banner from "./components/Banner";
import MainView from "./components/Mainview";
import Tags from "./components/Tags";
import useStores from "../../hooks/useStores";

const Home: FC = () => {
  const { commonStore } = useStores();
  const { tags, token, appName } = commonStore;
  useEffect(() => {
    commonStore.loadTags();
  });
  return (
    <div className="home-page">
      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>受欢迎的标签</p>

              <Tags tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
