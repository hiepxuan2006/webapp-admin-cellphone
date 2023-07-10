import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import {
  faC,
  faCartFlatbed,
  faFilePen,
  faHome,
  faImages,
  faNetworkWired,
  faNewspaper,
  faO,
  faSliders,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"

export const NAVBAR_MENU = [
  { title: "Home", icon: faHome, href: "/a/admin/dashboard" },
  {
    title: "Category",
    icon: faC,
    href: "/a/admin/category",
  },
  { title: "Account", icon: faUserCircle, href: "/a/admin/account" },
  { title: "Product", icon: faProductHunt, href: "/a/admin/product" },
  { title: "Slider", icon: faSliders, href: "/a/admin/slider" },
  { title: "Order", icon: faO, href: "/a/admin/order" },
  { title: "Post blog", icon: faFilePen, href: "/a/admin/post" },
  { title: "Topic blog", icon: faNewspaper, href: "/a/admin/topic" },
  { title: "Banner", icon: faImages, href: "/a/admin/banner" },
]

export const NAVBAR_MENU_Home = [
  {
    group: "Home section",
    child: [
      { title: "Home", icon: faHome, href: "/a/admin/dashboard", child: [] },
    ],
  },
  {
    group: "Order section",
    child: [
      {
        title: "Order",
        icon: faCartFlatbed,
        href: "/a/admin/order",
        child: [
          { title: "All", href: "/a/admin/order/all" },
          { title: "Pending", href: "/a/admin/order/pending" },
          { title: "Confirmed", href: "/a/admin/order/confirmed" },
          { title: "Processing", href: "/a/admin/order/processing" },
          { title: "Out For Delivery", href: "/a/admin/order/delivery" },
          { title: "Delivered", href: "/a/admin/delivered" },
          { title: "Canceled", href: "/a/admin/canceled" },
        ],
      },
    ],
  },
  {
    group: "Product section",
    child: [
      {
        title: "Product",
        icon: faProductHunt,
        href: "/a/admin/product",
        child: [
          { title: "All product", href: "/a/admin/product/all" },
          { title: "Add product", href: "/a/admin/product/create" },
        ],
      },
      {
        title: "Category",
        icon: faNetworkWired,
        href: "/a/admin/category",
        child: [],
      },
    ],
  },

  {
    group: "Store System",
    child: [
      {
        title: "Account",
        icon: faUserCircle,
        href: "/a/admin/account",
        child: [],
      },
      { title: "Slider", icon: faSliders, href: "/a/admin/slider", child: [] },
      { title: "Banner", icon: faImages, href: "/a/admin/banner", child: [] },
      {
        title: "Promotion",
        icon: faImages,
        href: "/a/admin/promotion",
        child: [],
      },
      {
        title: "Blog store",
        icon: faFilePen,
        href: "/a/admin/post",
        child: [
          {
            title: "Post",
            href: "/a/admin/order",
          },
          { title: "Topic Blog", href: "/a/admin/topic" },
        ],
      },
    ],
  },
  {
    group: "Business Section",
    child: [
      {
        title: "Branch",
        icon: faUserCircle,
        href: "/a/admin/branch",
        child: [],
      },
      {
        title: "Message",
        icon: faUserCircle,
        href: "/a/admin/message",
        child: [],
      },
    ],
  },

  // { title: "Account", icon: faUserCircle, href: "/a/admin/account" },
  // { title: "Product", icon: faProductHunt, href: "/a/admin/product" },
  // { title: "Slider", icon: faSliders, href: "/a/admin/slider" },
  // { title: "Order", icon: faO, href: "/a/admin/order" },
  // { title: "Post blog", icon: faFilePen, href: "/a/admin/post" },
  // { title: "Topic blog", icon: faNewspaper, href: "/a/admin/topic" },
  // { title: "Banner", icon: faImages, href: "/a/admin/banner" },
]
