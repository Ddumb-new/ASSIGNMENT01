export default function Register() {
  return (
    <div>
      <h1>Register</h1>

      <form>
        <input type="text" placeholder="Username" />
        <br />

        <input type="email" placeholder="Email" />
        <br />

        <input type="password" placeholder="Password" />
        <br />

        <button type="submit">Register</button>
      </form>

    </div>
  );
}