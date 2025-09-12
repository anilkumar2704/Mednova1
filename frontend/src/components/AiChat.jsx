import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Pill, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI health assistant. I can help you with medical questions, symptom checking, medicine information, and booking healthcare services. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    'What are the symptoms of COVID-19?',
    'How to reduce fever naturally?',
    'Book a nurse for elderly care',
    'Medicine interactions checker',
    'Find nearest pharmacy',
    'Emergency first aid for burns'
  ];

  const simulateAIResponse = (userMessage) => {
    const responses = {
      'symptoms': 'Based on the symptoms you described, here are some possible conditions. However, I recommend consulting with a healthcare professional for proper diagnosis.',
      'fever': 'For natural fever reduction: Stay hydrated, rest, use cool compresses, and consider acetaminophen or ibuprofen. If fever persists or exceeds 103°F, seek medical attention.',
      'nurse': 'I can help you book a nurse! Let me connect you to our booking service. What type of care do you need - general care, elderly care, or specialized nursing?',
      'medicine': 'I can check medicine interactions for you. Please provide the names of the medications you\'re taking, and I\'ll analyze potential interactions.',
      'pharmacy': 'Based on your location, here are the nearest pharmacies open now. Would you like me to check their inventory for specific medications?',
      'burns': 'For burn first aid: 1) Cool with running water for 10-20 minutes, 2) Remove jewelry before swelling, 3) Cover with sterile gauze, 4) Seek medical attention for severe burns.',
      'default': 'I understand your concern. Let me help you with that. Could you provide more specific details about your symptoms or what kind of assistance you need?'
    };

    const message = userMessage.toLowerCase();
    let response = responses.default;

    if (message.includes('symptom')) response = responses.symptoms;
    else if (message.includes('fever')) response = responses.fever;
    else if (message.includes('nurse') || message.includes('book')) response = responses.nurse;
    else if (message.includes('medicine') || message.includes('drug')) response = responses.medicine;
    else if (message.includes('pharmacy')) response = responses.pharmacy;
    else if (message.includes('burn')) response = responses.burns;

    return response;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: simulateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setInputMessage('What are the symptoms of high blood pressure?');
        setIsListening(false);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Health Assistant</h1>
        <p className="text-gray-600">24/7 medical AI with voice recognition and smart suggestions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">MediCare AI Assistant</h3>
            <p className="text-sm text-green-600">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-800 mb-3">Quick Questions:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-3 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about symptoms, medicines, or book services..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {isListening && (
            <p className="text-sm text-red-600 mt-2 text-center">
              🎤 Listening... Speak your question clearly
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChat;