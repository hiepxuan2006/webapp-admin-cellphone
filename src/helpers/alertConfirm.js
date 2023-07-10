import Swal from "sweetalert2"

export const confirmDialog = async (data) => {
  let kq
  const { title } = data

  await Swal.fire({
    title: `Bạn chắc chăn ${title}?`,
    text: "Đồng ý nếu bạn chắc chắn!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        kq = true
        // Swal.fire("Đã xóa!", "Thhành công.", "success")
      } catch (error) {
        kq = false
        // Swal.fire("Thất bại!", "Chưa thực hiện thành công", "warning")
      }
    } else {
      kq = false
    }
  })
  return kq
}
