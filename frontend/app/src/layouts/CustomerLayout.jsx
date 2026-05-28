import { Link, Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#111111]">
      <header className="flex items-center justify-between px-10 py-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          StayFlow
        </Link>

        {/* <nav className="flex gap-6 text-sm">
          <Link to="/rooms">Rooms</Link>
          <Link to="/reservation/search">Reservation</Link>
          <Link to="/admin">PMS</Link>
          <Link to="/kiosk">Kiosk</Link>
        </nav> */}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;