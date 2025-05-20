'use client';

import { useEffect, useRef, useState } from 'react';
import { usePatientStore } from '@/store/usePatientStore';
import axios from 'axios';

export default function HealthAssistantChatbot() {
  const { 
        name, 
        age, 
        gender, 
        email, 
        symptoms, 
        prediction,
        confidence,
        original_image,
        gradcam_image,
        description,
        precautions,
        report_path,setField, reset } = usePatientStore();

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<EventSource | null>(null);


  useEffect(() => {
    if (
      prediction &&
      description &&
      precautions &&
      messages.length === 0
    ) {
      const system_prompt = `You are a medical assistant. You have a patient named ${name}, age ${age}, gender ${gender} and having symptoms ${symptoms}.
The report says the patient is having ${prediction}, with description: ${description}, and precautions: ${precautions}.
Help with the follow-up queries.`;

      setMessages([{ role: 'system', content: system_prompt }]);
    }
  }, [prediction, description, precautions]);

  const handleSend = async () => {
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ messages: newMessages }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();
let assistantMessage = '';
setLoading(true);

if (reader) {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    assistantMessage += chunk;
    setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
  }
}

setLoading(false);

  };


  return (
    <>
    {
      ! prediction ? (
        <div>Here are our AI Assistant Page</div>
      ) : (
        <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GPT-4.1-mini Chatbot</h1>
      <div className="space-y-4 mb-4">
        {messages.filter(m => m.role !== 'system').map((msg, i) => (
          <div key={i} className={`p-3 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        disabled={loading || !userInput.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Send
      </button>
    </div>
      )
      
    }
    </>
  );
}
