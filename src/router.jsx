import Layout from "./Layout";
import BonusPage from "./Components/BonusPage";
import ProfilePage from "./Components/Telegram/ProfilePage";
import SettingsProfile from "./Components/Telegram/SettingsProfile";
import ProductDetail from "./Products/ProductDetail";
import ProductConfirm from "./Products/ProductConfirm";
import ProductPay from "./Products/ProductPay";
import Search from "./Search/Search";
import SizeInfoDetails from "./Products/SizeInfo/SizeInfoDetails";
import FilterProducts from "./Products/FilterProducts";
import ModalWindow from "./ModalWindow";

export const routes = [
    {path:'/', component: Layout, exact:true},
    {path:'/bonus', component: BonusPage, exact:true},
    {path:'/profile/', component: ProfilePage, exact:true},
    {path:'/profile/settings', component: SettingsProfile, exact:true},
    {path:'/products/:productId', component: ModalWindow, exact:true},
    {path:'/products/confirm/:name/:size/:price', component: ProductConfirm, exact:true},
    {path:'/products/confirm/offer/:name/:size/:price', component: ProductPay, exact:true},
    {path:'/search', component: Search, exact:true},
    {path:'/products/size/', component: SizeInfoDetails, exact:true},
    {path:'/filtered', component: FilterProducts, exact:true},

]
