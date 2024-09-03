export default function NavItem({ emoji, text, isActive = false }) {
    return (
      <li className={`mb-2 p-2 rounded ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}>
        <span className="mr-2">{emoji}</span>
        {text}
      </li>
    );
  }
  