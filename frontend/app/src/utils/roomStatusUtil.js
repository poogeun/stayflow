export const getRoomStatusLabel = (status) => {
  if (status === "AVAILABLE") return "판매가능";
  if (status === "RESERVED") return "예약됨";
  if (status === "OCCUPIED") return "투숙중";
  if (status === "CLEANING") return "청소중";
  if (status === "MAINTENANCE") return "점검중";

  return status;
}