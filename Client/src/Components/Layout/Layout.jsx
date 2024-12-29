function Layout({ children }) {
  return (
    <div>
      {/* <Header /> */}
      <div style={{ minHeight: "100vh" }}>{children}</div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
