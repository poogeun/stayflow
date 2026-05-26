import { Box, Typography, Stack, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Tabs, Tab, TextField, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, } from '@mui/material'
import { useEffect, useState } from 'react';
import { completeCleaningRoom, getRooms, updateRoomStatus } from '../../api/roomApi';
import { getRoomStatusLabel } from '../../utils/roomStatusUtil';
import { formatPrice } from '../../utils/formatUtil';
import { useSnackbar } from '../../hooks/useSnackbar';
import AppSnackbar from '../../components/common/AppSnackbar';
import ConfirmDialog from '../../components/common/ConfirmDialog';

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
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [confirm, setConfirm] = useState({
    open: false,
    roomId: null,
  });

  const [statusDialog, setStatusDialog] =
    useState({
      open: false,
      roomId: null,
      status: "",
    });

  const handleOpenConfirm = (roomId) => {
    setConfirm({
      open: true,
      roomId,
    });
  };

  const handleCloseConfirm = () => {
    setConfirm({
      open: false,
      roomId: null,
    });
  };

  const handleConfirmCompleteCleaning = async () => {
    try {
      await completeCleaningRoom(confirm.roomId);
      await fetchRooms();

      showSnackbar("청소 완료 처리되었습니다.");
      handleCloseConfirm();
    } catch (error) {
      console.error(error);

      showSnackbar(
        error.response?.data?.message ||
          "청소 완료 처리 중 오류가 발생했습니다.",
          "error"
      );
    }
  };

  const handleOpenStatusDialog = (room) => {
    setStatusDialog({
      open: true,
      roomId: room.id,
      status: room.status,
    });
  };

  const handleCloseStatusDialog = () => {
    setStatusDialog({
      open: false,
      roomId: null,
      status: "",
    });
  };

  const handleUpdateRoomStatus = async () => {
    try {
      await updateRoomStatus(
        statusDialog.roomId,
        statusDialog.status
      );

      await fetchRooms();

      showSnackbar("객실 상태가 변경되었습니다.");

      handleCloseStatusDialog();
    } catch (error) {
      console.error(error);

      showSnackbar(
        error.response?.data?.message ||
          "객실 상태 변경 중 오류가 발생했습니다.",
          "error"
      );
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesStatus =
      selectedStatus === "ALL" ||
      room.status === selectedStatus;

    const normalizedKeyword = keyword.trim().toLowerCase();

    const matchesKeyword = 
      normalizedKeyword === "" ||
      room.roomNumber.toLowerCase().includes(normalizedKeyword) ||
      room.roomType.toLowerCase().includes(normalizedKeyword);

    return matchesStatus && matchesKeyword;
  })

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
              총 {filteredRooms.length}개
            </Typography>
          </Stack>

          <Tabs
            value={selectedStatus}
            onChange={(event, value) => setSelectedStatus(value)}
            sx={{ mb: 2 }}
          >
            <Tab label="전체" value="ALL" />
            <Tab label="판매가능" value="AVAILABLE" />
            <Tab label="투숙중" value="OCCUPIED" />
            <Tab label="청소중" value="CLEANING" />
            <Tab label="점검중" value="MAINTENANCE" />
          </Tabs>

          <TextField
            fullWidth
            size='small'
            placeholder='객실번호 또는 객실타입으로 검색'
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            sx={{ mb: 2 }} 
          />

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
              {filteredRooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align='center' sx={{ py: 6 }}>
                    조회된 객실이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
              filteredRooms.map((room) => (
                <TableRow key={room.id} hover>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.capacity}인</TableCell>
                  <TableCell>
                    ₩{formatPrice(room.price)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getRoomStatusLabel(room.status)}
                      color={getStatusColor(room.status)}
                      size='small' 
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => handleOpenStatusDialog(room)}
                      >
                        상태 변경
                      </Button>

                      {room.status === "CLEANING" ? (
                        <Button
                          size='small'
                          variant='contained'
                          color='success'
                          onClick={() => handleOpenConfirm(room.id)}
                        >
                          청소 완료
                        </Button>
                      ) : (
                        <Button size='small' variant='outlined' disabled>
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

    <AppSnackbar
      snackbar={snackbar}
      onClose={closeSnackbar}
    />

    <ConfirmDialog
      open={confirm.open}
      title="청소 완료 처리"
      message="해당 객실을 청소 완료 처리하시겠습니까?"
      confirmText="청소 완료"
      onClose={handleCloseConfirm}
      onConfirm={handleConfirmCompleteCleaning}
    />

    <Dialog
      open={statusDialog.open}
      onClose={handleCloseStatusDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        객실 상태 변경
      </DialogTitle>

      <DialogContent>
        <FormControl
          fullWidth
          sx={{ mt: 1 }}
        >
          <InputLabel>
            객실 상태
          </InputLabel>

          <Select
            value={statusDialog.status}
            label="객실 상태"
            onChange={(event) =>
              setStatusDialog((prev) => ({
                ...prev,
                status: event.target.value,
              }))
            }
          >
            <MenuItem value="AVAILABLE">
              판매가능
            </MenuItem>
            <MenuItem value="CLEANING">
              청소중
            </MenuItem>
            <MenuItem value="MAINTENANCE">
              점검중
            </MenuItem>                        
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCloseStatusDialog}>
          취소
        </Button>

        <Button
          variant='contained'
          onClick={handleUpdateRoomStatus}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default AdminRoomsPage;