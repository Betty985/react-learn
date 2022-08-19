import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import useStores from "../hooks/useStores";
import ListErrors from "../components/ListErrors";
interface A {
  onSubmitForm: any;
  currentUser: any;
}
const SettingsForm: FC<A> = (props) => {
  const { userStore } = useStores();
  const { currentUser } = props;
  const [image, setImage] = useState(currentUser?.image);
  const [username, setUsername] = useState(currentUser?.username);
  const [bio, setBio] = useState(currentUser?.bio);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    const user = { image, username, bio, email, password };
    if (!user.password) {
      delete user.password;
    }
    props.onSubmitForm(user);
  };

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="简介图片的url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="你的简介"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="新密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={userStore.updatingUser}
        >
          更新设置
        </button>
      </fieldset>
    </form>
  );
};
observer(SettingsForm);
const Settings: FC = () => {
  const { userStore, authStore } = useStores();
  const navigate = useNavigate();
  const handleClickLogout = () => authStore.logout().then(() => navigate("/", { replace: true }));
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">我</h1>
            <ListErrors errors={userStore.updatingUserErrors} />
            <SettingsForm
              currentUser={userStore.currentUser}
              onSubmitForm={(user) => userStore.updateUser(user)}
            />
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={handleClickLogout}
            >
              退出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
observer(Settings);
export default Settings;
