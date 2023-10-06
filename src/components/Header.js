import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderSideNavItems
} from "@carbon/react";
import { Search, Notification, Switcher as SwitcherIcon } from '@carbon/icons-react';
export const CustomHeader = () => {
    return (
        <Header aria-label="IBM WatsonX">
            <HeaderSideNavItems>asdf</HeaderSideNavItems>
            <HeaderName href="#" prefix="IBM">
                WatsonX
            </HeaderName>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search" >
                    <Search size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications">
                    <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Menu" tooltipAlignment="end" id="switcher-button">
                    <SwitcherIcon size={20} />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>
    )
}