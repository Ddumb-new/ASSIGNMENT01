import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#0f172a",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/*LOGO + BRAND */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image src="/logo.png" alt="Logo" width={55} height={55} />

        <span
          style={{
            fontSize: "1.7rem",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          TourneyHub
        </span>
      </div>

      {/*NAV LINKS */}
      <div style={{ display: "flex", gap: "25px" }}>
        <Link href="/home.html" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link href="/tournaments.html" style={{ color: "white", textDecoration: "none" }}>
          Tournaments
        </Link>

        <Link href="/add-tournaments.html" style={{ color: "white", textDecoration: "none" }}>
          Add Tournament
        </Link>

        <Link href="/register.html" style={{ color: "white", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}