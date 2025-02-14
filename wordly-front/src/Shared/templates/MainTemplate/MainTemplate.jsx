import React from 'react'
import AppHeader from '../../components/app-header/AppHeader'
// import AppFooter from '../../components/app-footer/AppFooter'
const MainTemplate = ({ children }) => {
  return (
    <div className="main-template min-h-[100vh]">
      <AppHeader />
      <div className="main-content">
        <div>
          {children}
        </div>
      </div>
      {/* <AppFooter /> */}
    </div>
  );
};

export default MainTemplate;
