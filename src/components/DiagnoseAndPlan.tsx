
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, FileText, ArrowLeft, ArrowRight, 
  Send, MessageSquare, ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";

const DiagnoseAndPlan = ({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) => {
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'system'}>>([
    {text: "Welcome to the Diagnose & Plan phase. How can I assist with diagnosing this case?", sender: 'system'}
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [notes, setNotes] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add user message
    setChatMessages([...chatMessages, {text: inputMessage, sender: 'user'}]);
    setInputMessage("");
    
    // Simulate response after a brief delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        text: "I've noted your observations. Based on the analysis, what specific diagnosis are you considering?",
        sender: 'system'
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="workflow-container animate-fade-in space-y-6">
      <div className="text-center space-y-2">
        <div className="progress-pill inline-block bg-progress-75/20 text-progress-75 mb-2">
          Phase 3 of 4
        </div>
        <h2 className="text-2xl font-light tracking-tight">Diagnose & Plan</h2>
        <p className="text-neutral-400 max-w-md mx-auto">
          Define diagnosis and create a treatment plan based on the analyzed data.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Chat Section */}
        <div className="glass-panel rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b border-neutral-800 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-progress-75" />
            <h3 className="text-sm font-medium">Chat Section</h3>
          </div>
          
          <div className="flex-grow p-4 space-y-4 overflow-y-auto h-[350px]">
            {chatMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-progress-75/30 text-white' 
                      : 'bg-black/50 border border-neutral-800 text-neutral-300'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="p-3 border-t border-neutral-800 flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow bg-black/30 border border-neutral-800 rounded-lg p-2 text-sm focus:outline-none focus:border-progress-75/50"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSendMessage}
              className="ml-2 border-neutral-800 bg-black/30 hover:bg-progress-75/20 hover:text-progress-75"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Column - Notes Section */}
        <div className="glass-panel rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b border-neutral-800 flex items-center">
            <ClipboardList className="h-4 w-4 mr-2 text-progress-75" />
            <h3 className="text-sm font-medium">Notes and Remarks</h3>
          </div>
          
          <div className="flex-grow p-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your diagnosis notes and remarks here..."
              className="w-full h-full min-h-[350px] bg-black/30 border border-neutral-800 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-progress-75/50"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack} 
          className="text-neutral-400 border-neutral-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        <Button 
          onClick={onComplete} 
          className="bg-progress-75 hover:bg-progress-75/90 transition-all"
        >
          Next <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DiagnoseAndPlan;
