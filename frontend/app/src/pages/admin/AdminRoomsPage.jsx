import { Box, Typography, Stack, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { completeCleaningRoom, getRooms } from '../../api/roomApi';

const getStatusColor = (status) => {
  if (status === "AVAILABLE") return "success";
  if (status === "RESERVED") return "warning";
  if (status === "OCCUPIED") return "error";
  if (status === "CLEANING") return "info";
  if (status === "MAINTENANCE") return "default";

  return "default";
};

function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();

      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteCleaning = async (roomId) => {
    try {
      await completeCleaningRoom(roomId);

      await fetchRooms();

      alert("청소 완료 처리되었습니다.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "청소 완료 처리 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            객실 관리
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            객실 상태를 확인하고 청소 완료 처리를 진행합니다.
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
            <Typography variant='h6' fontWeight={800}>
              객실 목록
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              총 {rooms.length}개
            </Typography>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>객실번호</TableCell>
                <TableCell>객실 타입</TableCell>
                <TableCell>수용 인원</TableCell>
                <TableCell>가격</TableCell>
                <TableCell>상태</TableCell>
                <TableCell align="right">관리</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id} hover>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.capacity}인</TableCell>
                  <TableCell>
                    ₩{new Intl.NumberFormat("ko-KR").format(room.price)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={room.status}
                      color={getStatusColor(room.status)}
                      size='small' 
                    />
                  </TableCell>
                  <TableCell align='right'>
                    {room.status === "CLEANING" ? (
                      <Button
                        size='small'
                        variant='contained'
                        color='success'
                        onClick={() => handleCompleteCleaning(room.id)}
                      >
                        청소 완료
                      </Button>
                    ) : (
                      <Button size='small' variant='outlined' disabled>
                        처리불가
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminRoomsPage;