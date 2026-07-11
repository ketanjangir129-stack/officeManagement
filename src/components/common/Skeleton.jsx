function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse
        bg-slate-200
        rounded-md
        ${className}
      `}
    />
  );
}

export default Skeleton;