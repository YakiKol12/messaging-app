import './App.css';
import './index.css';

import ChatPage from './pages/ChatPage/ChatPage';
import ChatList from './pages/ChatList/ChatList';

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Chats List) */}
      <div className="w-80 bg-gray-100 border-r overflow-y-auto">
        <ChatList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white">
        <ChatPage />
      </div>
    </div>
  );
}

export default App;
