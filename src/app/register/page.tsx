import { headers } from "next/headers";
import { registerUser } from "src/services/users";

export default async function Register() {
  const _cookies = await headers();
  console.log(_cookies.get("x-country"));
  return (
    <>
      {_cookies.get("x-country")}
      <h1>Register</h1>
      <form action={registerUser}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="email" placeholder="Email" />
        <select name="country">
          <option value="ar">Argentina</option>
          <option value="br">Brazil</option>
          <option value="ca">Canada</option>
          <option value="ch">Switzerland</option>
          <option value="de">Germany</option>
          <option value="es">Spain</option>
          <option value="fr">France</option>
          <option value="it">Italy</option>
          <option value="pt">Portugal</option>
          <option value="us">United States</option>
          <hr />
          <option value="other">Other</option>
        </select>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
