export default function Header() {
    return(
        <header className="bg-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black">Sapphire Visa Console</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything here..."
            className="pl-8 pr-4 py-2 border rounded-lg"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">🔍</span>
        </div>
      </header>
    )
}