function TokenLaunchpad() {
  return (
    <div
      className=" "
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input className="inputText" type="text" placeholder="Name" /> <br />
      <input className="inputText" type="text" placeholder="Symbol" /> <br />
      <input className="inputText" type="text" placeholder="Image URL" /> <br />
      <input
        className="inputText"
        type="text"
        placeholder="Initial Supply"
      />{" "}
      <br />
      <button className="btn">Create a token</button>
    </div>
  );
}

export default TokenLaunchpad;
