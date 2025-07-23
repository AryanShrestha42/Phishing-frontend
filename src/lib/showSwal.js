import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export function showSwal(type, message, options = {}) {
  // If no cancel/confirm/cancelButtonText/confirmButtonText, auto-close after 3s and hide confirm button
  const isAuto =
    !options.showCancelButton &&
    !options.showConfirmButton &&
    !options.cancelButtonText &&
    !options.confirmButtonText;
  return Swal.fire({
    text: message,
    icon: type, // 'success', 'error', 'info', 'warning'
    confirmButtonColor: "#2563eb", // Tailwind blue-600
    customClass: {
      popup: "font-sans",
      confirmButton: "font-medium text-base",
      title: "font-bold text-lg",
      content: "text-base",
    },
    background: "#fff",
    showConfirmButton: isAuto ? false : true,
    timer: isAuto ? 3000 : undefined,
    timerProgressBar: isAuto ? true : undefined,
    ...options,
  });
}
