import { MobXProviderContext } from 'mobx-react'
import React from 'react'
function useStores() {
  return React.useContext(MobXProviderContext)
}
export default useStores