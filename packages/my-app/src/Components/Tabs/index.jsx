import Tabs, { TabPane } from 'rc-tabs';
import React from 'react';
function TabsComponent({
    onChange,
    items,
    defaultActiveKey
}) {
    let TabPanes = items.map((item, i) => {
        return (
            <TabPane tab={item.name} key={item.name} >
                {item.ele}
            </TabPane>
        )
    })
    return (
        <Tabs defaultActiveKey={defaultActiveKey} onChange={onChange}>
            {TabPanes}
        </Tabs>
    )
}
Tabs.TabPane = TabPane;
export { TabsComponent }