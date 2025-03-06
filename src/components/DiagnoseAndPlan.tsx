
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, FileText, ArrowLeft, ArrowRight, 
  Clipboard, BrainCircuit, CalendarClock, CheckCircle
} from "lucide-react";

const DiagnoseAndPlan = ({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) => {
  const [activeSection, setActiveSection] = useState("diagnose");
  const [isDiagnoseComplete, setIsDiagnoseComplete] = useState(false);
  const [isPlanComplete, setIsPlanComplete] = useState(false);

  const handleDiagnoseComplete = () => {
    setIsDiagnoseComplete(true);
    setActiveSection("plan");
  };

  const handlePlanComplete = () => {
    setIsPlanComplete(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="workflow-container animate-fade-in space-y-6 p-6">
      <div className="text-center space-y-2">
        <div className="progress-pill inline-block bg-progress-75/20 text-progress-75 mb-2">
          Phase 3 of 4
        </div>
        <h2 className="text-2xl font-light tracking-tight">Diagnose & Plan</h2>
        <p className="text-neutral-400 max-w-md mx-auto">
          Define diagnosis and create a treatment plan based on the analyzed data.
        </p>
      </div>

      <div className="glass-panel p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={onBack} className="text-neutral-400 border-neutral-800">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActiveSection("diagnose")}
              className={`${
                activeSection === "diagnose" 
                  ? "bg-progress-75/20 text-progress-75 border-progress-75/30" 
                  : "text-neutral-400 border-neutral-800"
              }`}
            >
              <BrainCircuit className="h-4 w-4 mr-2" /> Diagnose
              {isDiagnoseComplete && <CheckCircle className="h-3 w-3 ml-2 text-progress-75" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActiveSection("plan")}
              className={`${
                activeSection === "plan" 
                  ? "bg-progress-75/20 text-progress-75 border-progress-75/30" 
                  : "text-neutral-400 border-neutral-800"
              }`}
            >
              <CalendarClock className="h-4 w-4 mr-2" /> Plan
              {isPlanComplete && <CheckCircle className="h-3 w-3 ml-2 text-progress-75" />}
            </Button>
          </div>
        </div>

        {activeSection === "diagnose" && (
          <div className="animate-fade-in space-y-4">
            <div className="glass-panel p-4">
              <h3 className="text-sm font-medium text-progress-75 mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2" /> Diagnostic Assessment
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Primary Diagnosis</label>
                  <div className="bg-black/30 p-3 rounded-md border border-neutral-800">
                    <input 
                      type="text" 
                      placeholder="Enter primary diagnosis"
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Supporting Evidence</label>
                  <div className="bg-black/30 p-3 rounded-md border border-neutral-800 h-24">
                    <textarea 
                      placeholder="Describe the supporting evidence for diagnosis"
                      className="w-full h-full bg-transparent outline-none text-sm resize-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Additional Notes</label>
                  <div className="bg-black/30 p-3 rounded-md border border-neutral-800 h-16">
                    <textarea 
                      placeholder="Add any additional diagnostic notes"
                      className="w-full h-full bg-transparent outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleDiagnoseComplete} 
                className="bg-progress-75 hover:bg-progress-75/90 transition-all"
              >
                Save Diagnosis <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {activeSection === "plan" && (
          <div className="animate-fade-in space-y-4">
            <div className="glass-panel p-4">
              <h3 className="text-sm font-medium text-progress-75 mb-3 flex items-center">
                <Clipboard className="h-4 w-4 mr-2" /> Treatment Plan
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Recommended Treatment</label>
                  <div className="bg-black/30 p-3 rounded-md border border-neutral-800">
                    <input 
                      type="text" 
                      placeholder="Enter recommended treatment"
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-300">Start Date</label>
                    <div className="bg-black/30 p-3 rounded-md border border-neutral-800">
                      <input 
                        type="date" 
                        className="w-full bg-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-300">Duration</label>
                    <div className="bg-black/30 p-3 rounded-md border border-neutral-800">
                      <input 
                        type="text" 
                        placeholder="e.g., 4 weeks"
                        className="w-full bg-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Treatment Details</label>
                  <div className="bg-black/30 p-3 rounded-md border border-neutral-800 h-24">
                    <textarea 
                      placeholder="Describe the treatment details, dosage, frequency, etc."
                      className="w-full h-full bg-transparent outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handlePlanComplete} 
                className="bg-progress-75 hover:bg-progress-75/90 transition-all"
              >
                Complete Plan <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnoseAndPlan;
