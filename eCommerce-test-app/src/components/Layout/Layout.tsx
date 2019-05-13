import * as React from 'react';

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.SFC<ILayoutProps> = ({ children }) => {
  return <section className="layout-section">{children}</section>;
};

export default Layout;
