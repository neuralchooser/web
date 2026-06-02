export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="flex items-center gap-1">
        <span className="w-[3px] h-[20px] bg-white/50 rounded-full animate-[barScale_1s_linear_infinite]" />
        <span className="w-[3px] h-[35px] bg-white/50 rounded-full animate-[barScale_1s_linear_infinite] [animation-delay:0.25s]" />
        <span className="w-[3px] h-[20px] bg-white/50 rounded-full animate-[barScale_1s_linear_infinite] [animation-delay:0.5s]" />
      </div>
    </div>
  );
}
