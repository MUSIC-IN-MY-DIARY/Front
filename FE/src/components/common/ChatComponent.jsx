import { useState, useEffect, useRef } from 'react';
import TypewriterEffect from './TypewriterEffect';

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

  const renderMessage = (message, index) => {
    const isUser = message.type === 'user';

    return (
      <div
        key={index}
        className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        {!isUser && (
          <div className='w-8 h-8 rounded-full bg-[#BE3E3E] flex items-center justify-center text-white mr-2 flex-shrink-0'>
            🤖
          </div>
        )}

        <div
          className={`max-w-[70%] rounded-2xl p-4 ${
            isUser
              ? 'bg-[#BE3E3E] text-white rounded-br-none'
              : 'bg-white shadow-md rounded-bl-none'
          }`}
        >
          {isUser ? (
            <div>{message.text}</div>
          ) : (
            <div className='relative pr-8 pb-6'>
              <TypewriterEffect text={message.text} />
              {message.chatId && (
                <button
                  onClick={(e) => handleBookmark(message.chatId, e)}
                  className='absolute top-0 right-0 p-2 transition-all duration-200'
                >
                  <span
                    className={`text-xl ${
                      message.is_bookmarked
                        ? 'text-[#BE3E3E]'
                        : 'text-gray-400 hover:text-[#BE3E3E]'
                    }`}
                  >
                    {message.is_bookmarked ? '★' : '☆'}
                  </span>
                </button>
              )}
            </div>
          )}

          <div
            className={`text-xs mt-1 ${
              isUser ? 'text-red-200' : 'text-gray-400'
            }`}
          >
            {new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        {isUser && (
          <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0'>
            👤
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col h-screen'>
      <div
        ref={chatContainerRef}
        className='flex-1 p-6 overflow-y-auto bg-gray-50'
        style={{ height: 'calc(100vh - 120px)' }}
      >
        <div className='max-w-3xl mx-auto'>
          {messages.map(renderMessage)}
          {isLoading && (
            <div className='flex items-center gap-2 text-[#BE3E3E] ml-10'>
              <div className='w-2 h-2 bg-[#BE3E3E] rounded-full animate-bounce'></div>
              <div
                className='w-2 h-2 bg-[#BE3E3E] rounded-full animate-bounce'
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className='w-2 h-2 bg-[#BE3E3E] rounded-full animate-bounce'
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
          )}
        </div>
      </div>

      <div className='p-4 bg-white border-t sticky bottom-0'>
        <div className='max-w-3xl mx-auto flex gap-4'>
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
            className='flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#BE3E3E] transition-colors'
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg ${
              isLoading
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-[#BE3E3E] hover:bg-[#a83636]'
            } text-white transition-colors`}
          >
            {isLoading ? '처리 중...' : '전송'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
