import { useState, useEffect } from "react"

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Xóa timeout khi giá trị `value` thay đổi
    // Chỉ khi đạt được giá trị cuối cùng mới gọi API
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
