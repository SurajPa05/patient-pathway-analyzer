
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, CheckCircle, Upload, FileText } from "lucide-react";

const ScanAndDetect = ({ onComplete }: { onComplete: () => void }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsComplete(true);
      }, 2000);
    }, 1500);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="workflow-container flex flex-col h-full justify-center items-center space-y-8 p-6">
      <div className="text-center space-y-2">
        <div className="progress-pill inline-block bg-progress-25/20 text-progress-25 mb-2">
          Phase 1 of 4
        </div>
        <h2 className="text-2xl font-light tracking-tight">Scan & Detect</h2>
        <p className="text-neutral-400 max-w-md">
          Upload patient data or scan documents to begin the analysis process.
        </p>
      </div>

      <div className="glass-panel w-full max-w-md p-6 space-y-6">
        {!isComplete ? (
          <>
            <div className="flex items-center justify-center h-40 border border-dashed border-neutral-700 rounded-lg">
              {isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader className="animate-spin text-progress-25" size={28} />
                  <p className="text-sm text-neutral-400">Uploading...</p>
                </div>
              ) : isAnalyzing ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader className="animate-spin text-progress-25" size={28} />
                  <p className="text-sm text-neutral-400">Analyzing data...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <Upload className="text-neutral-500" size={28} />
                  <p className="text-sm text-neutral-400">
                    Drag & drop files or <span className="text-progress-25">browse</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Button 
                onClick={handleUpload} 
                disabled={isUploading || isAnalyzing}
                className="w-full bg-progress-25 hover:bg-progress-25/90 transition-all"
              >
                {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Upload Patient Data"}
              </Button>
              <p className="text-xs text-center text-neutral-500">
                Supported formats: PDF, JPEG, DICOM
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-progress-25/20 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-progress-25" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Data Processed</h3>
              <p className="text-sm text-neutral-400">3 documents successfully analyzed</p>
            </div>
            <div className="w-full p-3 bg-neutral-900 rounded-lg flex items-center space-x-3">
              <FileText className="h-5 w-5 text-neutral-400" />
              <div className="flex-1">
                <p className="text-sm">Patient_Records.pdf</p>
                <div className="h-1 w-full bg-neutral-800 rounded-full">
                  <div className="h-1 bg-progress-25 rounded-full w-full"></div>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleContinue} 
              className="w-full bg-progress-25 hover:bg-progress-25/90 transition-all mt-2"
            >
              Continue to Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanAndDetect;
