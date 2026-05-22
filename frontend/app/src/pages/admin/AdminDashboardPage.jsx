import { Box, CssBaseline, Drawer, List, ListItemButton, ListItemText, Typography, Stack, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";

const drawerWidth = 240;

const reservations = [
  {
    id: 1,
    guestName: "홍길동",
    roomNumber: "101",
    checkInDate: "2026-06-01",
    checkOutDate: "2026-06-03",
    status: "RESERVED",
  },
  {
    id: 2,
    guestName: "김민수",
    roomNumber: "201",
    checkInDate: "2026-06-01",
    checkOutDate: "2026-06-02",
    status: "CHECKED_IN",
  },
];

const getStatusColor = (status) => {
  if (status === "RESERVED") return "warning";
  if (status === "CHECKED_IN") return "success";
  if (status === "CHECKED_OUT") return "default";
  if (status === "CANCELLED") return "error";

  return "default";
}

function AdminDashboardPage() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f6f8",
      }}
    >
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#111827",
            color: "white",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ p: 3}}>
          <Typography variant="h5" fontWeight={800}>
            StayFlow
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#9CA3AF",
              mt: 0.5,
            }}
          >
            PMS Admin
          </Typography>
        </Box>

        <List sx={{ px: 2 }}>
            {[
              "Dashboard",
              "Reservations",
              "Rooms",
              "Check-in",
              "Housekeeping",
            ].map((text) => (
              <ListItemButton
                key={text}
                sx={{
                  borderRadius: 2,
                  mb: 1,

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
        </List>
      </Drawer>

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
                12
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
                8
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
                24
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
                5
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
                      <Button
                        size="small"
                        variant="outlined"
                      >
                        상세
                      </Button>
                    </TableCell>                                                            
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AdminDashboardPage;