import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import {
  checkInReservation,
  checkOutReservation,
  getReservations,
} from "../../api/reservationApi";
import { getReservationStatusLabel } from "../../utils/reservationStatusUtil";
import { formatDate } from "../../utils/formatUtil";
import { useSnackbar } from "../../hooks/useSnackbar";
import AppSnackbar from "../../components/common/AppSnackbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const getStatusColor = (status) => {
  if (status === "RESERVED") return "warning";
  if (status === "CHECKED_IN") return "success";
  if (status === "CHECKED_OUT") return "default";
  if (status === "CANCELLED") return "error";

  return "default";
};

function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const { snackbar, showSnackbar, closeSnackbar, } = useSnackbar();

  const [confirm, setConfirm] = useState({
    open: false,
    type: null,
    reservationId: null,
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDetail = (reservation) => {
    setSelectedReservation(reservation);
    setOpenDetailDialog(true);
  };

  const handleCloseDetail = () => {
    setOpenDetailDialog(false);
    setSelectedReservation(null);
  };

  const handleOpenConfirm = (type, reservationId) => {
    setConfirm({
      open: true,
      type,
      reservationId,
    });
  };

  const handleCloseConfirm = () => {
    setConfirm({
      open: false,
      type: null,
      reservationId: null,
    });
  };

  const handleConfirmAction = async () => {
    try {
      if (confirm.type === "CHECK_IN") {
        await checkInReservation(confirm.reservationId);
        showSnackbar("체크인이 완료되었습니다.");
      }

      if (confirm.type === "CHECK_OUT") {
        await checkOutReservation(confirm.reservationId);
        showSnackbar("체크아웃이 완료되었습니다.");
      }

      await fetchReservations();
      handleCloseConfirm();
    } catch (error) {
      console.error(error);

      showSnackbar(
        error.reseponse?.data?.message ||
          "처리 중 오류가 발생했습니다.",
          "error"
      );
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesStatus =
      selectedStatus === "ALL" || reservation.status === selectedStatus;

    const normalizedKeyword = keyword.trim().toLowerCase();

    const matchesKeyword =
      normalizedKeyword === "" ||
      String(reservation.id).includes(normalizedKeyword) ||
      reservation.guestName.toLowerCase().includes(normalizedKeyword) ||
      reservation.guestPhone.includes(normalizedKeyword) ||
      reservation.roomNumber.toLowerCase().includes(normalizedKeyword);

    return matchesStatus && matchesKeyword;
  });

  return (
    <>
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            예약 관리
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            예약 목록을 조회하고 체크인/체크아웃 처리를 진행합니다.
          </Typography>
        </Box>
      </Stack>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={800}>
                예약 목록
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                총 {filteredReservations.length}건
              </Typography>
            </Box>
          </Stack>

          <Tabs
            value={selectedStatus}
            onChange={(event, value) => setSelectedStatus(value)}
            sx={{ mb: 2 }}
          >
            <Tab label="전체" value="ALL" />
            <Tab label="예약중" value="RESERVED" />
            <Tab label="투숙중" value="CHECKED_IN" />
            <Tab label="체크아웃" value="CHECKED_OUT" />
            <Tab label="취소" value="CANCELLED" />
          </Tabs>

          <TextField
            fullWidth
            size="small"
            placeholder="예약번호, 고객명, 휴대폰번호, 객실번호로 검색"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            sx={{ mb: 2 }}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>예약번호</TableCell>
                <TableCell>고객명</TableCell>
                <TableCell>객실</TableCell>
                <TableCell>체크인</TableCell>
                <TableCell>체크아웃</TableCell>
                <TableCell>상태</TableCell>
                <TableCell align="right">관리</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    조회된 예약이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id} hover>
                    <TableCell>#{reservation.id}</TableCell>
                    <TableCell>{reservation.guestName}</TableCell>
                    <TableCell>{reservation.roomNumber}</TableCell>
                    <TableCell>{formatDate(reservation.checkInDate)}</TableCell>
                    <TableCell>{formatDate(reservation.checkOutDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={getReservationStatusLabel(reservation.status)}
                        color={getStatusColor(reservation.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenDetail(reservation)}
                        >
                          상세
                        </Button>

                        {reservation.status === "RESERVED" && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleOpenConfirm("CHECK_IN", reservation.id)}
                          >
                            체크인
                          </Button>
                        )}

                        {reservation.status === "CHECKED_IN" && (
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => handleOpenConfirm("CHECK_OUT", reservation.id)}
                          >
                            체크아웃
                          </Button>
                        )}

                        {reservation.status !== "RESERVED" &&
                          reservation.status !== "CHECKED_IN" && (
                            <Button size="small" variant="outlined" disabled>
                              처리불가
                            </Button>
                          )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>

    <Dialog
      open={openDetailDialog}
      onClose={handleCloseDetail}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>예약 상세 정보</DialogTitle>

      <DialogContent dividers>
        {selectedReservation && (
          <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#6B7280", fontWeight: 500 }}>
                예약번호
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 700 }}>
                #{selectedReservation.id}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#6B7280", fontWeight: 500 }}>
                예약자
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 700 }}>
                {selectedReservation.guestName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#6B7280", fontWeight: 500 }}>
                휴대폰번호
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 700 }}>
                {selectedReservation.guestPhone}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#6B7280", fontWeight: 500 }}>
                객실
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 700 }}>
                {selectedReservation.roomNumber}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#6B7280", fontWeight: 500 }}>
                체크인
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 700 }}>
                {formatDate(selectedReservation.checkInDate)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "#6B7280", fontWeight: 500 }}>
                체크아웃
              </Typography>
              <Typography sx={{ color: "#111827", fontWeight: 700 }}>
                {formatDate(selectedReservation.checkOutDate)}
              </Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDetail}>닫기</Button>
      </DialogActions>
    </Dialog>

    <AppSnackbar
      snackbar={snackbar}
      onClose={closeSnackbar}
    />

    <ConfirmDialog
      open={confirm.open}
      title={confirm.type === "CHECK_IN" ? "체크인 처리" : "체크아웃 처리"}
      message={
        confirm.type === "CHECK_IN"
          ? "해당 예약을 체크인 처리하시겠습니까?"
          : "해당 예약을 체크아웃 처리하시겠습니까?"
      }
      confirmText={confirm.type === "CHECK_IN" ? "체크인" : "체크아웃"}
      onClose={handleCloseConfirm}
      onConfirm={handleConfirmAction}
    />
    </>
  );
}

export default AdminReservationsPage;