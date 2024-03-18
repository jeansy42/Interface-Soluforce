function Main({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <div className="bg-base-100">
      <div className="m-auto min-w-[300px] max-w-7xl">{children}</div>
    </div>
  );
}

export default Main;
