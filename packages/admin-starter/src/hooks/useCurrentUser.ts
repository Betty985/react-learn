import useStores from "./useStores";
import { useEffect, useState } from "react";
function useCurrentUser() {
  const { userStore } = useStores();
  const [currentUser, setUser] = useState(userStore.currentUser);
  useEffect(() => {
    userStore.pullUser().then(() => {
      setUser(userStore.currentUser);
    });
  }, [userStore]);
  return { currentUser };
}
export default useCurrentUser;
