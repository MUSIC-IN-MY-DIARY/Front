const Prompt = () => {
  return (
    <div className='prompt'>
      <input type='text' placeholder='Send message' className='message-input' />
      <button className='send-button'>➡️</button>
    </div>
  );
};

export default Prompt;
