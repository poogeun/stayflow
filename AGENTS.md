# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

**StayFlow** is a hotel operations management platform with three integrated interfaces:
- **Customer Site** — Browse rooms, create and manage reservations
- **PMS (Admin Dashboard)** — Staff-facing operations management
- **Kiosk** — Guest self-service check-in terminal

## Development Commands

### Frontend (`/frontend/app`)
```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint
```

### Backend (`/backend`)
```bash
./gradlew bootRun    # Start Spring Boot server at http://localhost:8080
./gradlew build      # Build JAR
./gradlew test       # Run tests
```

### Database
```bash
docker-compose up -d    # Start PostgreSQL 15 on localhost:5432
```

Swagger UI is available at `http://localhost:8080/swagger-ui.html` when the backend is running.

## Architecture

### Stack
- **Frontend:** React 19, Vite, React Router 7, MUI 9, Tailwind CSS 4, Axios
- **Backend:** Spring Boot 3.5, Java 21, Spring Data JPA, Spring Security
- **Database:** PostgreSQL 15 (Docker), schema auto-managed via `ddl-auto: update`

### Frontend Structure

Routes are defined in `src/router/` and split across three layouts:

| Path | Layout | Purpose |
|------|---------|---------|
| `/`, `/rooms`, `/reservation/*` | `CustomerLayout` | Customer-facing pages |
| `/admin`, `/admin/reservations`, `/admin/rooms` | `AdminLayout` (with sidebar) | PMS dashboard |
| `/kiosk` | None (standalone) | Self-check-in kiosk |

**Key conventions:**
- API calls live in `src/api/` (`reservationApi`, `roomApi`, `adminApi`) — all using Axios
- Toast notifications use the `useSnackbar()` custom hook + `<AppSnackbar>` component
- Status display (labels, colors) centralized in `src/utils/`
- State is local `useState` — Zustand and React Query are installed but unused

### Backend Structure

Standard Spring layered architecture: `Controller → Service → Repository`

```
com.stayflow.backend/
  reservation/   # Core domain: CRUD, check-in/out, cancellation
  room/          # Room availability, status transitions
  guest/         # Guest entity (created during reservation)
  admin/         # Dashboard aggregation endpoint
  common/        # BaseEntity (audit timestamps), global exception handler
  config/        # CORS (allows localhost:5173), permissive Security config
```

**Key domain rules:**
- `ReservationStatus`: `RESERVED → CHECKED_IN → CHECKED_OUT` (or `CANCELED` / `NO_SHOW`)
- `RoomStatus`: `AVAILABLE → RESERVED → OCCUPIED → CLEANING → AVAILABLE`
- Room availability checks use date-range overlap logic in `RoomService`
- Reservation search (kiosk) uses `findByIdAndGuestPhone()` — requires both ID and phone

### Data Flow

**Reservation creation:** Customer form → `reservationApi.createReservation()` → backend creates `Guest` + `Reservation` atomically → returns reservation ID

**Kiosk check-in:** ID + phone lookup → `reservationApi.searchReservation()` → `reservationApi.checkInReservation()` → updates both `Reservation.status` (CHECKED_IN) and `Room.status` (OCCUPIED)

**Admin operations:** All PATCH endpoints on `/api/reservations/{id}` and `/api/rooms/{id}` — status transitions are enforced in service layer
