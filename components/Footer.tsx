export default function Footer() {
  return (
    <footer className="py-8 border-t" style={{ borderColor: "#E5E7EB", background: "#F9F8F6" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-semibold" style={{ color: "#2B3490" }}>Muhammadjon Ozodjonov</p>
        <p className="text-xs text-gray-400 text-center">
          Fergana, Uzbekistan · {new Date().getFullYear()}
        </p>
        <div className="flex gap-4">
          <a href="mailto:ozodjonovm1@gmail.com" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Email</a>
          <a href="https://www.linkedin.com/in/muhammadjon-ozodjonov" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
