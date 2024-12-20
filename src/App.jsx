import React from "react";
import RootRouter from "./rootRouter";
import CombinedProviders from "./context/ProductContext/ProductContext.jsx";
import SidebarProvider from "./context/SidebarContext/SidebarContext.jsx";
import CartProvider from "./context/CartContext/CartContext.jsx";

function App() {
  return (
    <SidebarProvider>
      <CartProvider>
        <CombinedProviders>
          <RootRouter />
        </CombinedProviders>
      </CartProvider>
    </SidebarProvider>
  );
}

export default App;
