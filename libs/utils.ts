import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStartOfCurrentWeek(): string {
  const today = new Date();
  
  // Lấy ngày trong tuần hiện tại (0 là Chủ Nhật, 1 là Thứ Hai, ..., 6 là Thứ Bảy)
  const dayOfWeek = today.getDay();
  
  // Tính toán số ngày cần trừ để về Thứ Hai (trong trường hợp Chủ Nhật thì lùi 6 ngày)
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
  
  // Tính ngày bắt đầu của tuần (Thứ Hai)
  const startOfWeek = new Date(today);
  
  startOfWeek.setDate(today.getDate() + diffToMonday);
  
  // Định dạng theo yyyy-mm-dd
  const year = startOfWeek.getFullYear();
  const month = String(startOfWeek.getMonth() + 1).padStart(2, '0');
  const day = String(startOfWeek.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export function getObjectOfCurrentWeek(): { [key: string]: number }[] {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Tính toán số ngày cần trừ để về Thứ Hai
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
  
  // Tính ngày bắt đầu của tuần (Thứ Hai)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diffToMonday);
  
  // Tạo mảng 7 ngày với các key và value = 0
  const weekDays = daysOfWeek.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    // Format ngày dưới dạng yyyy-mm-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${dayOfMonth}`;

    return { [formattedDate]: 0 };
  });

  return weekDays;
}

export function isYesterday(dateString:string) {
  // Chuyển đổi chuỗi thành đối tượng Date
  const inputDate = new Date(dateString);
  
  // Lấy ngày hôm nay và ngày hôm trước
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Chỉ so sánh năm, tháng, ngày
  return inputDate.getFullYear() === yesterday.getFullYear() &&
         inputDate.getMonth() === yesterday.getMonth() &&
         inputDate.getDate() === yesterday.getDate();
}

export function getCurrentDate(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
