

import { Route, Navigate, Routes } from "react-router-dom";
import { routes } from './router'

const AppRouter = ({ cart, addToCart, sendDataToParent, dataFromMainButton, handleDataFromMainButton, userId }) => {
    return (
      <Routes>
        {routes.map(route => (
          <Route 
            element={<route.component 
                cart={cart} 
                addToCart={addToCart} 
                sendDataToParent={sendDataToParent} 
                dataFromMainButton={dataFromMainButton} 
                handleDataFromMainButton={handleDataFromMainButton}
                userId={userId}
            />}
            path={route.path} 
            exact={route.exact}
            key={route.path} 
          />
        ))}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    );
  }
  
  export default AppRouter;
