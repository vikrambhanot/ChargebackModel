import { useEffect, useRef, useState } from 'react';
import { talentEliteApi } from '../config/talentEliteApi';
import AnnuityReport from './AnnuityReport';
import './AnnuityAgentChat.css';

const AnnuityAgentChat = ({ agentType, productContext, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [turnNumber, setTurnNumber] = useState(0);
  const [assessment, setAssessment] = useState(null);
  const [showReport, setShowReport] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    startConversation();
  }, []);

  const startConversation = async () => {
    try {
      setIsLoading(true);
      
      // Generate a simple user_id for demo purposes
      // In production, this would come from authenticated user
      const demoUserId = `demo-${Date.now()}`;
      
      const response = await talentEliteApi.startAgentConversation({
        agent_type: agentType, // 'annuity-fia' or 'annuity-va'
        user_id: demoUserId,
        context: {
          product_type: productContext.productType,
          product_name: productContext.productName,
          demo_mode: true
        }
      });

      setConversationId(response.conversation_id);
      
      // Add agent's greeting message
      if (response.agent_response) {
        const agentMessage = {
          role: 'agent',
          content: response.agent_response,
          timestamp: new Date().toISOString()
        };
        setMessages([agentMessage]);
        setTurnNumber(1);
      }

    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Failed to start conversation. Please try again.');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    const textToSend = inputText.trim();
    
    if (!textToSend || isLoading || isComplete || !conversationId) {
      return;
    }

    setInputText('');
    setIsLoading(true);

    const newUserMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const demoUserId = `demo-${conversationId.split('-')[1]}`; // Extract from conversation ID
      
      const response = await talentEliteApi.sendAgentMessage(
        conversationId,
        demoUserId,
        textToSend
      );

      const agentMessage = {
        role: 'agent',
        content: response.agent_response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setTurnNumber(response.turn_number || turnNumber + 1);

      // Check if conversation is complete
      if (response.is_complete) {
        setIsComplete(true);
        
        // Backend should return assessment data
        if (response.assessment) {
          setAssessment(response.assessment);
          setTimeout(() => setShowReport(true), 1500);
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageContent = (content) => {
    if (!content) return '';
    let txt = content.replace(/\r\n/g, '\n').trim();
    txt = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    txt = txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    txt = txt.replace(/^- (.+)$/gm, '<li>$1</li>').replace(/^• (.+)$/gm, '<li>$1</li>');
    txt = txt.replace(/(?:(?:^|\n)(<li>.*?<\/li>))+?/gs, (b) => `<ul>${b.trim().replace(/\n/g, '')}</ul>`);
    txt = txt.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    txt = txt.replace(/(?:^|\n)(?:<li>.*?<\/li>\n?){2,}/gs, (b) => `<ol>${b.trim()}</ol>`);
    const paras = txt.split(/\n{2,}/).map(p => p.replace(/\n/g, '<br/>'));
    return paras.map(p => `<p>${p}</p>`).join('');
  };

  // If assessment is complete and we have data, show report
  if (showReport && assessment) {
    return (
      <AnnuityReport 
        assessment={assessment}
        productName={productContext.productName}
        onStartNew={onClose}
      />
    );
  }

  return (
    <div className="annuity-agent-container">
      {/* Header */}
      <div className="annuity-agent-header">
        <div className="agent-info">
          <div className="agent-avatar-circle">
            <span className="agent-icon">💼</span>
          </div>
          <div className="agent-details">
            <h2 className="agent-name">
              {productContext.productName} Suitability Specialist
            </h2>
            <p className="agent-status">
              {isComplete ? '✅ Assessment Complete' : isLoading ? '💬 Analyzing...' : '🟢 Ready'}
            </p>
          </div>
        </div>
        
        <div className="header-meta">
          <span className="turn-counter">Question {turnNumber}</span>
          <button 
            className="close-btn"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="annuity-messages-container">
        {messages.length === 0 && !isLoading && (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <p className="empty-text">Initializing assessment...</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`annuity-message ${message.role}`}
          >
            <div className="message-avatar-small">
              {message.role === 'agent' ? '💼' : '👤'}
            </div>
            <div className="message-bubble">
              <div 
                className="message-text"
                dangerouslySetInnerHTML={{
                  __html: message.role === 'user'
                    ? message.content
                    : formatMessageContent(message.content)
                }}
              />
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="annuity-message agent">
            <div className="message-avatar-small">💼</div>
            <div className="message-bubble">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="annuity-input-container">
        {isComplete ? (
          <div className="completion-message">
            <span className="completion-icon">✅</span>
            <span className="completion-text">
              Assessment complete! Generating your report...
            </span>
          </div>
        ) : (
          <>
            <div className="input-wrapper">
              <textarea
                ref={inputRef}
                className="annuity-input"
                placeholder="Type your response here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                rows={2}
                maxLength={2000}
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                title="Send"
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </div>
            <div className="input-meta">
              <span className="char-count">{inputText.length}/2000</span>
              <span className="input-hint">
                Press Enter to send • Shift+Enter for new line
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnnuityAgentChat;