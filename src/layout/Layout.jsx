import React from 'react';
import Header from './Header';
import Footer from './Footer';

function LayoutComponent(WrappedComponent) {
  const ComponentWithLayout = (props) => (
    <>
      <Header />
      <WrappedComponent {...props} />
      <Footer />
    </>
  );

  ComponentWithLayout.displayName = `withLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithLayout;
}

export default LayoutComponent;
