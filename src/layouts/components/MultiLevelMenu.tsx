import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarAccordion from "./SidebarAccordion";
import { ExternalLink, ListLabel, NavItemButton } from "../mainLayout/styles";
// import { navigations } from "../layout-parts/navigation";
// import {
//   ItemText,
//   ListLabel,
//   BulletIcon,
//   ICON_STYLE,
//   ExternalLink,
//   NavItemButton,
// } from "@/layouts/layout-1/styles";

interface MultiLevelMenuProps {
  sidebarCompact: boolean;
}

interface NavigationItem {
  type?: "label" | "extLink";
  label?: string;
  path?: string;
  icon?: React.ElementType;
  iconText?: string;
  children?: NavigationItem[];
  name?: string;
  disabled?: boolean;
}

export default function MultiLevelMenu({ sidebarCompact }: MultiLevelMenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCloseMobileSidebar = () => {};

  const activeRoute = (path: string) => (pathname === path ? 1 : 0);

  const handleNavigation = (path: string) => {
    navigate(path);
    handleCloseMobileSidebar?.();
  };

  const COMPACT = sidebarCompact ? 1 : 0;

  // const renderLevels = (data: NavigationItem[]) => {
  //   return data.map((item, index) => {
  //     if (item.type === "label" && item.label) {
  //       return (
  //         <ListLabel key={index} compact={COMPACT}>
  //           {t(item.label)}
  //         </ListLabel>
  //       );
  //     }

  //     if (item.children) {
  //       return (
  //         <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
  //           {renderLevels(item.children)}
  //         </SidebarAccordion>
  //       );
  //     }

  //     if (item.type === "extLink" && item.path) {
  //       return (
  //         <ExternalLink
  //           key={index}
  //           href={item.path}
  //           rel="noopener noreferrer"
  //           target="_blank"
  //         >
  //           <NavItemButton key={item.name} name="child" active={0}>
  //             {item.icon ? (
  //               <item.icon sx={ICON_STYLE(0)} />
  //             ) : (
  //               <span className="item-icon icon-text">{item.iconText}</span>
  //             )}
  //             <ItemText compact={COMPACT} active={activeRoute(item.path)}>
  //               {item.name}
  //             </ItemText>
  //           </NavItemButton>
  //         </ExternalLink>
  //       );
  //     }

  //     return (
  //       <NavItemButton
  //         key={index}
  //         disabled={item.disabled}
  //         active={activeRoute(item.path || "")}
  //         onClick={() => item.path && handleNavigation(item.path)}
  //       >
  //         {item.icon ? (
  //           <item.icon sx={ICON_STYLE(activeRoute(item.path || ""))} />
  //         ) : (
  //           <BulletIcon active={activeRoute(item.path || "")} />
  //         )}

  //         <ItemText compact={COMPACT} active={activeRoute(item.path || "")}>
  //           {t(item.name)}
  //         </ItemText>
  //       </NavItemButton>
  //     );
  //   });
  // };

  // const filterNavigation = useMemo(() => {
  //   return navigations.filter(navigation => {
  //     if (!navigation.access) return true;
  //     else if (navigation.access === user?.role) return true;
  //     else return false;
  //   });
  // }, [user?.role]);

  // return <>{renderLevels(filterNavigation)}</>;
}
