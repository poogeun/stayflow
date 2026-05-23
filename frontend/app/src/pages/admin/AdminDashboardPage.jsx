import { Box, Typography, Stack, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { checkInReservation, checkOutReservation, getReservations } from "../../api/reservationApi";
import { getDashboardSummary } from "../../api/adminApi";

const getStatusColor = (status) => {
  if (status === "RESERVED") return "warning";
  if (status === "CHECKED_IN") return "success";
  if (status === "CHECKED_OUT") return "default";
  if (status === "CANCELLED") return "error";

  return "default";
}

function AdminDashboardPage() {
  const [reservations, setReservations] = useState([]);

  const [summary, setSummary] = useState({
    todayCheckInCount: 0,
    todayCheckOutCount: 0,
    occupiedRoomCount: 0,
    cleaningRoomCount: 0,
  });

  const [selectedReservation, setSelectedReservation] = useState(null);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardSummary();
  }, []);

  useEffect(() => {
    const fetchReservaions = async () => {
      try {
        const data = await getReservations();

        setReservations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservaions();
  }, []);

  const handleCheckIn = async (reservationId) => {
    try {
      await checkInReservation(reservationId);

      const data = await getReservations();
      setReservations(data);

      alert("체크인이 완료되었습니다.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "체크인 처리 중 오류가 발생했습니다."
      );
    }
  };

  const handleCheckOut = async (reservationId) => {
    try {
      await checkOutReservation(reservationId);

      const data = await getReservations();
      setReservations(data);

      alert("체크아웃이 완료되었습니다.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "체크아웃 처리 중 오류가 발생했습니다."
      );      
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

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 4,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            PMS Dashboard
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            오늘의 예약, 체크인/체크아웃,
            객실 상태를 관리합니다.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#111827",
            borderRadius: 3,
            px: 3,
          }}
        >
          새 예약 등록
        </Button>
      </Stack>

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={3}
        sx={{ mb: 3 }}
      >
        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              오늘 체크인
            </Typography>
            
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mt: 1 }}
            >
              {summary.todayCheckInCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              오늘 체크아웃
            </Typography>
            
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mt: 1 }}
            >
              {summary.todayCheckOutCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              투숙 중 객실
            </Typography>
            
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mt: 1 }}
            >
              {summary.occupiedRoomCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              청소 중 객실
            </Typography>
            
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mt: 1 }}
            >
              {summary.cleaningRoomCount}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
            >
              최근 예약
            </Typography>

            <Button size="small">
              전체 보기
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>예약번호</TableCell>
                <TableCell>고객명</TableCell>
                <TableCell>객실</TableCell>
                <TableCell>체크인</TableCell>
                <TableCell>체크아웃</TableCell>
                <TableCell>상태</TableCell>
                <TableCell align="right">
                  관리
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reservations.map((reservation) => (
                <TableRow>
                  <TableCell>
                    #{reservation.id}
                  </TableCell>
                  <TableCell>
                    {reservation.guestName}
                  </TableCell>
                  <TableCell>
                    {reservation.roomNumber}
                  </TableCell>
                  <TableCell>
                    {reservation.checkInDate}
                  </TableCell>
                  <TableCell>
                    {reservation.checkOutDate}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={reservation.status}
                      color={getStatusColor(
                        reservation.status
                      )}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        size="small"
                        variant="outliend"
                        onClick={() => handleOpenDetail(reservation)}
                      >
                        상세
                      </Button>

                      {reservation.status === "RESERVED" && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleCheckIn(reservation.id)}
                        >
                          체크인
                        </Button>
                      )}

                      {reservation.status === "CHECKED_IN" && (
                        <Button
                          size="small"
                          variant="contained"
                          color="warning"
                          onClick={() => handleCheckOut(reservation.id)}
                        >
                          체크아웃
                        </Button>                        
                      )}

                      {reservation.status !== "RESERVED" &&
                        reservation.status !== "CHECKED_IN" && (
                        <Button
                          size="small"
                          variant="outlined"
                          disabled
                        >
                          처리불가
                        </Button>
                      )}
                    </Stack>
                  </TableCell>                                                            
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetail}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          예약 상세 정보
        </DialogTitle>

        <DialogContent dividers>
          {selectedReservation && (
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}
                >
                  예약번호
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  #{selectedReservation.id}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}                
                >
                  예약자
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {selectedReservation.guestName}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}                
                >
                  휴대폰번호
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {selectedReservation.guestPhone}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}                
                >
                  객실
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {selectedReservation.roomNumber}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}                
                >
                  체크인
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {selectedReservation.checkInDate}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}                
                >
                  체크아웃
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {selectedReservation.checkOutDate}
                </Typography>
              </Box>  

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                  }}                
                >
                  상태
                </Typography>

                <Chip
                  label={selectedReservation.status}
                  color={getStatusColor(selectedReservation.status)}
                  size="small"
                />
              </Box>                                                                    
            </Stack>           
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetail}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboardPage;