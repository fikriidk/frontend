import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MitraPage from "./pages/MitraPage";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailNews from "./pages/detailNews";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/Dashboard";
import DetailProduct from "./pages/detailProduct";
import AdminNews from "./pages/AdminNews";
import MasterProduct from "./pages/MasterProduct";
// import MasterBlog from "./pages/MasterBlog";
import MasterCity from "./pages/MasterCity";
import MasterProvince from "./pages/MasterProvince";
import AdminProduct from "./pages/AdminProduct";
import AdminDetailProduct from "./pages/AdminDetailProduct";
import AdminDetailNews from "./pages/AdminDetailNews";
import AdminEditNews from "./pages/AdminEditNews";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AddMasterProduct from "./pages/addMasterProduct";
// import AddMasterBlog from "./pages/addMasterBlog";
import AddMasterCity from "./pages/addMasterCity";
import AddMasterProvince from "./pages/addMasterProvince";
import EditMasterProduct from "./pages/editMasterProduct";
// import EditMasterBlog from "./pages/editMasterBlog";
import EditMasterCity from "./pages/editMasterCity";
import EditMasterProvince from "./pages/editMasterProvince";
import AdminEditProfile from "./pages/AdminEditProfile";
import AdminAddNews from "./pages/AdminAddNews";
import Supplier from "./pages/Supplier";
import PrivateRoute from "./services/PrivateRoute";
import DetailSupplier from "./pages/DetailSupplier";
import EditAbout from "./pages/editAbout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produk" element={<ProductPage />} />
      <Route path="/detail-produk/:id" element={<DetailProduct />} />
      <Route path="/mitra" element={<MitraPage />} />
      <Route path="/blog" element={<NewsPage />} />
      <Route path="/detail-blog/:id" element={<DetailNews />} />
      <Route path="/tentang" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Ini cuma buat admin */}
      <Route path="/dashboard/*" element={<PrivateRoute element={<DashboardPage />} />} />
      <Route path="/admin-produk" element={<PrivateRoute element={<AdminProduct />} />} />
      <Route path="/admin-tambah-produk" element={<PrivateRoute element={<AdminAddProduct />} />} />
      <Route path="/admin-detail-produk/:id" element={<PrivateRoute element={<AdminDetailProduct />} />} />
      <Route path="/admin-edit-produk/:id" element={<AdminEditProduct />} />
      <Route path="/admin-blog" element={<PrivateRoute element={<AdminNews />} />} />
      <Route path="/admin-tambah-blog" element={<PrivateRoute element={<AdminAddNews />} />} />
      <Route path="/admin-detail-blog/:id" element={<PrivateRoute element={<AdminDetailNews />} />} />
      <Route path="/admin-edit-blog/:id" element={<PrivateRoute element={<AdminEditNews />} />} />
      <Route path="/master-produk" element={<PrivateRoute element={<MasterProduct />} />} />
      <Route path="/master-kota" element={<PrivateRoute element={<MasterCity />} />} />
      <Route path="/master-provinsi" element={<PrivateRoute element={<MasterProvince />} />} />
      <Route path="/master-tambah-produk" element={<PrivateRoute element={<AddMasterProduct />} />} />
      <Route path="/master-tambah-kota" element={<PrivateRoute element={<AddMasterCity />} />} />
      <Route path="/master-tambah-provinsi" element={<PrivateRoute element={<AddMasterProvince />} />} />
      <Route path="/master-edit-produk/:id" element={<PrivateRoute element={<EditMasterProduct />} />} />
      <Route path="/master-edit-kota/:id" element={<PrivateRoute element={<EditMasterCity />} />} />
      <Route path="/master-edit-provinsi/:id" element={<PrivateRoute element={<EditMasterProvince />} />} />
      <Route path="/admin-edit-profil" element={<PrivateRoute element={<AdminEditProfile />} />} />
      <Route path="/admin-supplier" element={<PrivateRoute element={<Supplier />} />} />
      <Route path="/admin-detail-supplier/:id" element={<PrivateRoute element={<DetailSupplier />} />} />
      <Route path="/admin-edit-perusahaan" element={<PrivateRoute element={<EditAbout />} />} />
      {/* <Route path="/master-blog" element={<MasterBlog />} /> */}
      {/* <Route path="/master-tambah-blog" element={<AddMasterBlog />} /> */}
      {/* <Route path="/master-edit-blog" element={<EditMasterBlog />} /> */}
    </Routes>
  );
}
