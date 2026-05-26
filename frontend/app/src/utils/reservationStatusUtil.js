export const getReservationStatusLabel = (
  status
) => {
  if (status === "RESERVED") {
    return "예약중";
  }

  if (status === "CHECKED_IN") {
    return "투숙중";
  }

  if (status === "CHECKED_OUT") {
    return "체크아웃";
  }

  if (status === "CANCELED") {
    return "취소";
  }
  
  return status;
}