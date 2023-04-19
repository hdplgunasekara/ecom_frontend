import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/productList";
import FavouriteProductList from "./pages/favouriteProduct";
import SearchResult from "./pages/searchResult";
import NavBar from "./components/navBar";
import AddProduct from "./components/addProduct";
import EditProduct from "./components/editProduct";
import { Provider } from "react-redux";
import {store} from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route exact path="/">
           <Route exact path="/" element={<ProductList />} />
            <Route exact path="/add" element={<AddProduct />} />
            <Route exact path="/edit/:id" element={<EditProduct/>} />
            <Route exact path="/favourite-product" element={<FavouriteProductList />} />
            <Route exact path="/search/:name" element={<SearchResult />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
