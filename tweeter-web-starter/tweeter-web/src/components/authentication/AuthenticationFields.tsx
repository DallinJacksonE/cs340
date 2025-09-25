import "./login/Login.css";

export interface setters {
  alias: React.Dispatch<React.SetStateAction<string>>;
  password: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const AuthenticationFields = (setters: setters) => {

  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onKeyDown={setters.onKeyDown}
          onChange={(event) => setters.alias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onKeyDown={setters.onKeyDown}
          onChange={(event) => setters.password(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
