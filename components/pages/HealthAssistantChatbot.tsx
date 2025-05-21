'use client';

import { useEffect, useRef, useState } from 'react';
import { usePatientStore } from '@/store/usePatientStore';
import axios from 'axios';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { IconLock } from "@tabler/icons-react";

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
    report_path,
    setField,
    reset 
  } = usePatientStore();

  type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
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

  // types/llm.ts
  type LLMParsedResult<T> = {
    success: boolean;
    data?: T;
    error?: string;
  };

  
  const handleSend = async () => {
    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
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
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-neutral-800">
      {!prediction ? (
        <div className="text-center text-lg text-gray-700 dark:text-gray-300">
          <IconLock className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" stroke={1.5} />
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">
            Please upload patient details to unlock the AI assistant.
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Chatbot
          </h1>
          
          <div className="space-y-4 mb-6">
            {/* Display Messages */}
            {messages.filter(m => m.role !== 'system').map((msg, i) => (
              <div key={i} className={`p-4 rounded-md text-base ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <strong className={`${msg.role === 'user' ? 'text-blue-600' : 'text-gray-700'}`}>
                  {msg.role === 'user' ? 'You' : 'Assistant'}:
                </strong> 
                <p className="mt-2 text-lg">{msg.content}</p>
                {/* <TextGenerateEffect className="mt-2 text-lg" words={msg.content} /> */}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="mb-4">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-4 border text-lg border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Type your message..."
            />
          </div>

          {/* Send Button */}
          <div className="text-center">
            <button
              onClick={handleSend}
              disabled={loading || !userInput.trim()}
              className="disabled:opacity-50 px-8 py-2 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
