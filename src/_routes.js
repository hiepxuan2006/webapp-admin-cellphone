import Account from "./app/account/Account"
import { CreateAccount } from "./app/account/CreateAccount"
import { Banner } from "./app/Banner/Banner"
import { CreateBanner } from "./app/Banner/CreateBanner"
import Category from "./app/category/Category"
import CreateCategory from "./app/category/createCategory/CreateCategory"
import { EditCategory } from "./app/category/editCategory/EditCategory"
import { DashboardHome } from "./app/dashboard/DashboardHome"
import { KeyWord } from "./app/keyword/KeyWord"
import { InvoiceOrder } from "./app/Order/InvoiceOrder"
import { Order } from "./app/Order/Order"
import { OrderDetail } from "./app/Order/OrderDetail"
import { CreateNewPost } from "./app/Post/CreateNewPost"
import { EditPost } from "./app/Post/EditPost"
import { Post } from "./app/Post/Post"
import CreateProduct from "./app/ProductPage/createProduct/CreateProduct"
import ProductContainer from "./app/ProductPage/ProductPage"
import { CreateSlider } from "./app/Slider/CreateSlider"
import { EditSlider } from "./app/Slider/EditSlider"
import { Slider } from "./app/Slider/Slider"
import { CreateNewTopic } from "./app/Topic/CreateNewTopic"
import { Topic } from "./app/Topic/Topic"

const routes = [
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/product/all",
    layout: "admin",
    component: <ProductContainer />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/product/create",
    layout: "admin",
    component: <CreateProduct />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/account",
    layout: "admin",
    component: <Account />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/account/create",
    layout: "admin",
    component: <CreateAccount />,
  },
  {
    type: "collapse",
    name: "Danh mục",
    key: "category",
    route: "/category",
    layout: "admin",
    component: <Category />,
  },
  {
    type: "collapse",
    name: "Danh mục",
    key: "category",
    route: "/category/create",
    layout: "admin",
    component: <CreateCategory />,
  },
  {
    type: "collapse",
    name: "Danh mục",
    key: "category",
    route: "/category/edit/:slug",
    layout: "admin",
    component: <EditCategory />,
  },
  {
    type: "collapse",
    name: "Slider",
    key: "slider",
    route: "/slider",
    layout: "admin",
    component: <Slider />,
  },
  {
    type: "collapse",
    name: "Slider",
    key: "slider",
    route: "/slider/create",
    layout: "admin",
    component: <CreateSlider />,
  },
  {
    type: "collapse",
    name: "Slider",
    key: "slider",
    route: "/slider/edit-slider/:id",
    layout: "admin",
    component: <EditSlider />,
  },
  // order

  {
    type: "collapse",
    name: "Order",
    key: "order",
    route: "/order/:order_status",
    layout: "admin",
    component: <Order />,
  },

  {
    type: "collapse",
    name: "Order",
    key: "order",
    route: "/order/:order_code/edit",
    layout: "admin",
    component: <OrderDetail />,
  },

  //
  {
    type: "collapse",
    name: "Post",
    key: "post",
    route: "/post/create-post",
    layout: "admin",
    component: <CreateNewPost />,
  },

  {
    type: "collapse",
    name: "Post",
    key: "post",
    route: "/post",
    layout: "admin",
    component: <Post />,
  },

  {
    type: "collapse",
    name: "Topic",
    key: "topic",
    route: "/topic",
    layout: "admin",
    component: <Topic />,
  },
  {
    type: "collapse",
    name: "Topic",
    key: "topic",
    route: "/topic/create",
    layout: "admin",
    component: <CreateNewTopic />,
  },
  {
    type: "collapse",
    name: "Post",
    key: "post",
    route: "/post/edit/:id",
    layout: "admin",
    component: <EditPost />,
  },
  {
    type: "collapse",
    name: "dashboard",
    key: "dashboard",
    route: "/dashboard",
    layout: "admin",
    component: <DashboardHome />,
  },
  {
    type: "keyword",
    name: "dashboard",
    key: "keyword",
    route: "/key_word",
    layout: "admin",
    component: <KeyWord />,
  },
  {
    type: "banner",
    name: "Banner",
    key: "banner",
    route: "/banner",
    layout: "admin",
    component: <Banner />,
  },
  {
    type: "banner",
    name: "Banner",
    key: "banner",
    route: "/banner/create",
    layout: "admin",
    component: <CreateBanner />,
  },
]
export default routes
