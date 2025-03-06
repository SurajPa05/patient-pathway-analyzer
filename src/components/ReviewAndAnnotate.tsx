
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, PenTool, Tags, ArrowLeft, ArrowRight } from "lucide-react";

const ReviewAndAnnotate = ({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) => {
  const [activeDocument, setActiveDocument] = useState(0);
  const [annotations, setAnnotations] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const documents = [
    { name: "Medical History.pdf", type: "pdf" },
    { name: "Lab Results.pdf", type: "pdf" },
    { name: "Radiology_Scan.dicom", type: "dicom" }
  ];

  const handleAddAnnotation = () => {
    // Simulate adding an annotation
    setAnnotations(prev => [...prev, `Annotation ${prev.length + 1}`]);
  };

  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="workflow-container animate-fade-in space-y-6 p-6">
      <div className="text-center space-y-2">
        <div className="progress-pill inline-block bg-progress-50/20 text-progress-50 mb-2">
          Phase 2 of 4
        </div>
        <h2 className="text-2xl font-light tracking-tight">Review & Annotate</h2>
        <p className="text-neutral-400 max-w-md mx-auto">
          Review the detected documents and add important annotations.
        </p>
      </div>

      <div className="glass-panel p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={onBack} className="text-neutral-400 border-neutral-800">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div className="text-sm text-neutral-400">
            Document {activeDocument + 1} of {documents.length}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Document List */}
          <div className="md:col-span-1 glass-panel p-3 space-y-3">
            <h3 className="text-sm font-medium text-neutral-300 mb-2">Documents</h3>
            {documents.map((doc, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveDocument(idx)}
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-black/30 transition-colors ${
                  activeDocument === idx ? "bg-black/30 border border-progress-50/30" : ""
                }`}
              >
                <FileText className="h-4 w-4 mr-2 text-progress-50" />
                <span className="text-sm truncate">{doc.name}</span>
              </div>
            ))}
          </div>

          {/* Document Preview */}
          <div className="md:col-span-2 glass-panel p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-neutral-300">{documents[activeDocument].name}</h3>
              <Button 
                size="sm" 
                onClick={handleAddAnnotation}
                className="bg-progress-50/20 hover:bg-progress-50/30 text-progress-50"
              >
                <PenTool className="h-4 w-4 mr-1" /> Annotate
              </Button>
            </div>

            {/* Document Content (Placeholder) */}
            <div className="h-[300px] bg-neutral-900/50 rounded-md flex items-center justify-center">
              <p className="text-neutral-500">Document Preview</p>
            </div>

            {/* Annotations List */}
            {annotations.length > 0 && (
              <div className="p-3 bg-black/20 rounded-md">
                <h4 className="text-xs uppercase tracking-wider mb-2 flex items-center">
                  <Tags className="h-3 w-3 mr-1" /> Annotations
                </h4>
                <div className="space-y-2">
                  {annotations.map((anno, idx) => (
                    <div key={idx} className="text-sm p-2 bg-black/20 border border-progress-50/20 rounded">
                      <span className="text-progress-50">{anno}</span>: Important observation here
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            onClick={handleComplete} 
            className="bg-progress-50 hover:bg-progress-50/90 transition-all"
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Complete Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndAnnotate;
