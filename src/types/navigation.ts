export interface NavItem {
  id: string;
  label: string;
  icon: string;
  /** React Router path */
  to: string;
}

export interface NavSubItem {
  id: string;
  label: string;
  icon: string;
  to: string;
}
