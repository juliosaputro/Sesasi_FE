function GlobalHeader({ title = "" }) {
  return (
    <div className="flex w-full container">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 px-24 md:px-24 mt-12 pb-0 md:pb-0">
        <div className="flex flex-col flex-auto">
          <p className="text-3xl font-semibold tracking-tight leading-8">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GlobalHeader;
