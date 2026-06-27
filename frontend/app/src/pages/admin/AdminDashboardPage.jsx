import { Box, Typography, Stack, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getReservations } from "../../api/reservationApi";
import { getAiBriefing, getDashboardSummary, getMonthlyRevenue } from "../../api/adminApi";
import { Link } from "react-router-dom";
import { getReservationStatusLabel } from "../../utils/reservationStatusUtil";
import { formatDate } from "../../utils/formatUtil";
import { AutoAwesome, Business } from "@mui/icons-material";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const getStatusColor = (status) => {
  if (status === "RESERVED") return "warning";
  if (status === "CHECKED_IN") return "success";
  if (status === "CHECKED_OUT") return "default";
  if (status === "CANCELLED") return "error";

  return "default";
}

const MiniBars = ({ color, accentColor }) => {
  const heights = [40, 60, 45, 80, 55, 100];
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 0.4,
        height: 36
      }}
    >
      {heights.map((h, i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: `${h}%`,
            borderRadius: 0.5,
            bgcolor: i === heights.length - 1 ? accentColor : color,
          }}
        />
      ))}
    </Stack>
  );
};

function AdminDashboardPage() {
  const [reservations, setReservations] = useState([]);
  const [briefing, setBriefing] = useState("");
  const [briefingLoading, setBriefingLoading] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const [summary, setSummary] = useState({
    todayCheckInCount: 0,
    todayCheckOutCount: 0,
    occupiedRoomCount: 0,
    cleaningRoomCount: 0,
  });

  const recentReservations = reservations.slice(0, 5);

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

  // useEffect(() => {
  //   const fetchBriefing = async () => {
  //     setBriefingLoading(true);
  //     try {
  //       const data = await getAiBriefing();
  //       setBriefing(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setBriefingLoading(false);
  //     }
  //   };

  //   fetchBriefing();
  // }, []);

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

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const data = await getMonthlyRevenue(2026);
        setMonthlyRevenue(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  const statCards = [
    {
      label: "오늘 체크인",
      value: summary.todayCheckInCount,
      color: "#9FE1CB",
      accentColor: "#1D9E75",
      trend: "오늘 예정",
      trendColor: "#1D9E75",
    },
    {
      label: "오늘 체크아웃",
      value: summary.todayCheckOutCount,
      color: "#FAC775",
      accentColor: "#BA7517",
      trend: "오늘 예정",
      trendColor: "#BA7517",
    },
    {
      label: "투숙 중 객실",
      value: summary.occupiedRoomCount,
      color: "#B5D4F4",
      accentColor: "#185FA5",
      trend: "현재 투숙",
      trendColor: "#185FA5",
    },
    {
      label: "청소 중 객실",
      value: summary.cleaningRoomCount,
      color: "#CECBF6",
      accentColor: "#534AB7",
      trend: "처리 중",
      trendColor: "#534AB7",
    },    
  ]

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: "#fff" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            PMS Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            오늘의 예약, 체크인/체크아웃, 객실 상태를 관리합니다.
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5 }}>
          {new Date().toLocaleDateString("ko-KR")}
        </Typography>
      </Stack>

      {/* AI 브리핑 히어로 배너 */}
      <Box
        sx={{
          bgcolor: "#1C1C1E",
          borderRadius: 3,
          p: "2rem 2.5rem",
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 140,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.8,
              mb: 1.5,
            }}
          >
            <AutoAwesome sx={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }} />
            <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
              AI 운영 브리핑 · Gemini 3.1 Flash Lite
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#fff", mb: 1.5 }}>
            오늘 하루도 원활한 운영 되세요.
          </Typography>

          {briefingLoading ? (
            <Stack sx={{ gap: 0.8 }}>
              {[90,  75, 85].map((w, i) => (
                <Box
                  key={i}
                  sx={{
                    height: 14,
                    borderRadius: 1,
                    bgcolor: "rgba(255,255,255,0.08)", width: `${w}%`
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              {briefing}
            </Typography>
          )}
        </Box>
        <Business
          sx={{
            fontSize: 72,
            color: "rgba(255,255,255,0.07)",
            ml: 3,
            flexShrink: 0
          }}
        />
      </Box>

      {/* 통계 카드 */}
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 1.5,
          mb: 3,
        }}
      >
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              flex: 1,
              borderRadius: 3,
              border: "0.5px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{stat.label}</Typography>
                <MiniBars color={stat.color} accentColor={stat.accentColor} />
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 500, mt: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ fontSize: 12, mt: 0.5, color: stat.trendColor }}>
                {stat.trend}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* 월별 매출 */}
      <Card
        sx={{
          borderRadius: 3,
          border: "0.5px solid",
          borderColor: "divider",
          boxShadow: "none",
          mb: 3,
        }}
      >
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>월별 매출</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary "}}>2026년 체크아웃 완료 기준</Typography>
          </Box>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyRevenue} barSize={28}>
              <XAxis
                dataKey="month"
                tickFormatter={(m) => `${m}월`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()}원`, "매출"]}
                labelFormatter={(m) => `${m}월`}
              />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {monthlyRevenue.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === monthlyRevenue.length - 1 ? "#1D9E75" : "#9FE1CB"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 최근 예약 */}
      <Card
        sx={{
          borderRadius: 3,
          border: "0.5px solid",
          borderColor: "divider",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>최근 예약</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>최근 5건</Typography>
            </Box>
            <Button
              component={Link}
              to="/admin/reservations"
              size="small"
              sx={{
                color: "#1D9E75",
              }}
            >
              예약 관리 이동 →
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                {["예약번호", "고객명", "객실", "체크인", "체크아웃", "상태"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {recentReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: "text.secondary" }}>
                    조회된 예약이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                recentReservations.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell sx={{ color: "text.secondary" }}>#{r.id}</TableCell>
                    <TableCell>{r.guestName}</TableCell>
                    <TableCell>{r.roomNumber}</TableCell>
                    <TableCell>{formatDate(r.checkInDate)}</TableCell>
                    <TableCell>{formatDate(r.checkOutDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={getReservationStatusLabel(r.status)}
                        color={getStatusColor(r.status)}
                        size="small"
                      />
                    </TableCell>                    
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminDashboardPage;