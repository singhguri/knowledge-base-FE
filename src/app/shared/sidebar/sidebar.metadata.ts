// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  showLink?: boolean;
  submenu: RouteInfo[];
  siblingLinks?: string[];
  isSiblingLink?: boolean;
}
