import { useState, useEffect, useRef } from 'react';

const ChatComponent = ({ apiEndpoint, placeholder, formatResponse }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

        if (!response.ok) {
          throw new Error('서버에서 오류 응답을 받았습니다.');
        }

        const data = await response.json();

        if (data.isSuccess) {
          const formattedText = formatResponse
            ? formatResponse(data.result.answer)
            : data.result.answer;

          const chatMessage = {
            type: 'chatbot',
            text: formattedText,
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
            className={`neumorphism-card ${
              message.type === 'user'
                ? 'text-right bg-blue-200'
                : 'text-left bg-gray-200'
            }`}
          >
            {message.text}
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
