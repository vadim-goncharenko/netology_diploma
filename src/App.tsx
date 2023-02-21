import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from './pages/NotFoundPage';
import About from './pages/AboutPage';
import Catalog from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import Main from './pages/MainPage';
import Contacts from './pages/ContactsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import MainContainer from './components/MainContainer';
import "./css/font-awesome.min.css";
import "./css/bootstrap.min.css";
import "./css/style.css";
import { Unsubscribe } from '@reduxjs/toolkit';
import { startAppListening } from './app/store';
import { setupCartListeners } from './app/services/cart/cartListeners';


function App() {
  // setup listeners
  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupCartListeners(startAppListening),
    ]

    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <MainContainer>
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/catalog" element={ <Catalog /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/contacts" element={ <Contacts /> } />
          <Route path="/products/:id" element={ <ProductPage /> } />
          <Route path="/cart" element={ <CartPage /> } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainContainer>
      <Footer />
    </BrowserRouter>
  );
};

export default App;