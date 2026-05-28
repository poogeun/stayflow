import { Box, Typography, Stack, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getReservations } from "../../api/reservationApi";
import { getDashboardSummary } from "../../api/adminApi";
import { Link } from "react-router-dom";
import { getReservationStatusLabel } from "../../utils/reservationStatusUtil";
import { formatDate } from "../../utils/formatUtil";

const getStatusColor = (status) => {
  if (status === "RESERVED") return "warning";
  if (status === "CHECKED_IN") return "success";
  if (status === "CHECKED_OUT") return "default";
  if (status === "CANCELLED") return "error";

  return "default";
}

function AdminDashboardPage() {
  const [reservations, setReservations] = useState([]);

  const recentReservations = reservations.slice(0, 5);

  const [summary, setSummary] = useState({
    todayCheckInCount: 0,
    todayCheckOutCount: 0,
    occupiedRoomCount: 0,
    cleaningRoomCount: 0,
  });

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

        {/* <Button
          variant="contained"
          sx={{
            bgcolor: "#111827",
            borderRadius: 3,
            px: 3,
          }}
        >
          새 예약 등록
        </Button> */}
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

            <Button 
              component={Link}
              to="/admin/reservations"
              size="small"
            >
              예약 관리 이동
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
              </TableRow>
            </TableHead>

            <TableBody>
              {recentReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6}}>
                    조회된 예약이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
              recentReservations.map((reservation) => (
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
                    {formatDate(reservation.checkInDate)}
                  </TableCell>
                  <TableCell>
                    {formatDate(reservation.checkOutDate)}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={getReservationStatusLabel(reservation.status)}
                      color={getStatusColor(
                        reservation.status
                      )}
                      size="small"
                    />
                  </TableCell>                                                           
                </TableRow>
              ))
              )         
            }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminDashboardPage;