const LoginForm = ({ username, password, setUsername, setPassword, submit }) => {
  return (
    <form onSubmit={submit}>
      <div>
        USERNAME{' '}
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        PASSWORD{' '}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;