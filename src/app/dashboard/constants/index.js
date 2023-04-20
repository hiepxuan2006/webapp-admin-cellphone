import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import {
  faC,
  faFilePen,
  faHome,
  faImages,
  faNewspaper,
  faO,
  faSliders,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"

export const NAVBAR_MENU = [
  { title: "Trang chủ", icon: faHome, href: "/a/admin/dashboard" },
  {
    title: "Danh mục",
    icon: faC,
    href: "/a/admin/category",
  },
  { title: "Tài khoản", icon: faUserCircle, href: "/a/admin/account" },
  { title: "Sản phẩm", icon: faProductHunt, href: "/a/admin/product" },
  { title: "Slider", icon: faSliders, href: "/a/admin/slider" },
  { title: "Đơn hàng", icon: faO, href: "/a/admin/order" },
  { title: "Bài viết", icon: faFilePen, href: "/a/admin/post" },
  { title: "Chủ đề bài viết", icon: faNewspaper, href: "/a/admin/topic" },
  { title: "Banner", icon: faImages, href: "/a/admin/banner" },
]
