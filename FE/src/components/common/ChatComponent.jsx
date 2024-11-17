import { useState, useEffect, useRef } from 'react';

const ChatComponent = ({ apiEndpoint, placeholder, formatResponse }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBookmark = async (chatId, event) => {
    event.stopPropagation();

    if (bookmarkLoading) return;

    setBookmarkLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/bookmark/${chatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      console.log('북마크 응답:', data);
      console.log('현재 메시지 상태:', messages);

      if (data.isSuccess) {
        setMessages((prev) => {
          const newMessages = prev.map((message) => {
            if (message.chatId === chatId) {
              console.log('업데이트될 메시지:', message);
              console.log('새로운 북마크 상태:', data.result.is_bookmarked);
              return { ...message, is_bookmarked: data.result.is_bookmarked };
            }
            return message;
          });
          console.log('업데이트된 메시지들:', newMessages);
          return newMessages;
        });

        const action = data.result.is_bookmarked ? '추가' : '제거';
        alert(`북마크가 ${action}되었습니다.`);
      } else {
        alert(`북마크 처리 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('북마크 처리 중 오류:', error);
      alert('북마크 처리 중 오류가 발생했습니다.');
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() && !isLoading) {
      setIsLoading(true);

      const userMessage = { type: 'user', text: inputText };
      setMessages((prev) => [...prev, userMessage]);
      setInputText('');

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ diaryContent: inputText }),
        });

        const data = await response.json();

        if (data.isSuccess) {
          const formattedText = formatResponse
            ? formatResponse(data.result.answer)
            : data.result.answer;

          const chatMessage = {
            type: 'chatbot',
            text: formattedText,
            chatId: data.result.chat_response.chat_id,
            is_bookmarked: data.result.chat_response.is_bookmarked || false,
          };

          setMessages((prev) => [...prev, chatMessage]);
        } else {
          const errorMessage = {
            type: 'chatbot',
            text: `오류: ${data.message} (코드: ${data.code})`,
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } catch (error) {
        const errorMessage = {
          type: 'chatbot',
          text: `서버와 통신 중 오류가 발생했습니다: ${error.message}`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChatClick = async (chatId) => {
    console.log('채팅 클릭됨, chatId:', chatId);
  };

  return (
    <div className='flex flex-col h-screen scrollbar-gutter: stable'>
      <div
        ref={chatContainerRef}
        className='flex-1 p-6 overflow-y-auto bg-gray-50'
        style={{ height: 'calc(100vh - 120px' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`neumorphism-card mb-4 ${
              message.type === 'user'
                ? 'text-right bg-blue-50'
                : 'text-left bg-white hover:bg-gray-50'
            } relative p-6`}
          >
            {message.text}
            {message.type === 'chatbot' && message.chatId && (
              <button
                onClick={(e) => handleBookmark(message.chatId, e)}
                className='absolute top-2 right-2 p-2 transition-all duration-200'
              >
                <span
                  className={`text-xl ${
                    message.is_bookmarked
                      ? 'text-yellow-400'
                      : 'text-gray-400 hover:text-yellow-400'
                  }`}
                >
                  {message.is_bookmarked ? '★' : '☆'}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
      <div className='p-4 px-10 bg-gray-100 flex justify-center items-center sticky bottom-0'>
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.repeat && !isLoading) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={isLoading}
          placeholder={isLoading ? '처리 중...' : placeholder}
          className='neumorphism-input'
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`ml-4 neumorphism-button ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500'
          } text-gray-600`}
        >
          {isLoading ? '처리 중...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
