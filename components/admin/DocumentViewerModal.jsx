import React from 'react';
import { X } from 'lucide-react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export default function DocumentViewerModal({ file, onClose }) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-[#2E1A6D] text-white flex-shrink-0">
          <h3 className="font-bold text-lg truncate max-w-lg">{file.filename || 'Document Viewer'}</h3>
          <div className="flex items-center gap-4">
            <a 
              href={file.url} 
              download={file.filename} 
              className="text-white hover:underline text-sm font-semibold bg-white/10 px-3 py-1.5 rounded-lg transition"
            >
              Download
            </a>
            <button onClick={onClose} className="text-white/80 hover:text-white transition">
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Viewer Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center">
          <DocViewer
            documents={[{ uri: file.url, fileName: file.filename }]}
            pluginRenderers={DocViewerRenderers}
            style={{ width: "100%", height: "100%" }}
            config={{
              header: {
                disableHeader: true, // We already built a nice custom header
                disableFileName: true,
                retainURLParams: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
