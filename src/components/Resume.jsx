import { useState, useRef } from 'react';
import { FaFilePdf, FaDownload, FaUpload, FaEye, FaTrash } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';

const Resume = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const [headingRef, isHeadingInView] = useInView({ once: true, delay: 0 });
  const [containerRef, isContainerInView] = useInView({ once: true, delay: 100 });
  const [pdfIconRef, isPdfIconInView] = useInView({ once: true, delay: 200 });
  const [fileInfoRef, isFileInfoInView] = useInView({ once: true, delay: 300 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      const url = URL.createObjectURL(file);
      setResumeUrl(url);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeUrl('/resume.pdf');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = resumeFile ? resumeFile.name : 'Kashif_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    setShowPreview(!showPreview);
  };

  return (
    <section id="resume" className="py-20 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-16 transition-all duration-600"
          style={{
            opacity: isHeadingInView ? 1 : 0,
            transform: isHeadingInView ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-dark-200 text-lg max-w-2xl mx-auto">
            Download my resume or view it directly in your browser. You can also upload an updated version.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Main Container */}
        <div
          ref={containerRef}
          className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-700"
          style={{
            opacity: isContainerInView ? 1 : 0,
            transform: isContainerInView ? 'scale(1)' : 'scale(0.95)'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-tr-full -z-10" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Left - PDF Icon */}
            <div className="flex-shrink-0">
              <div
                ref={pdfIconRef}
                className="w-32 h-40 bg-gradient-to-b from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg mx-auto transition-all duration-700"
                style={{
                  opacity: isPdfIconInView ? 1 : 0,
                  transform: isPdfIconInView ? 'scale(1)' : 'scale(0.8)'
                }}
              >
                <FaFilePdf className="text-white text-5xl" />
              </div>
            </div>

            {/* Right - Content & Actions */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Professional <span className="text-gradient">CV</span>
              </h3>
              <p className="text-dark-200 mb-8 max-w-lg">
                My resume includes detailed information about my education, experience, skills, and projects.
                Feel free to download it or preview it online.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-2 hover-scale tap-scale"
                >
                  <FaDownload />
                  Download CV
                </button>

                <button
                  onClick={handleView}
                  className="btn-secondary flex items-center gap-2 hover-scale tap-scale"
                >
                  <FaEye />
                  {showPreview ? 'Close Preview' : 'View Online'}
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-dark-600
                         text-dark-200 hover:text-white hover:border-accent
                         transition-all duration-300 hover-scale tap-scale"
                >
                  <FaUpload />
                  Upload New
                </button>

                {resumeFile && (
                  <button
                    onClick={handleRemoveFile}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-red-500/50
                           text-red-400 hover:text-red-300 hover:border-red-500
                           transition-all duration-300 hover-scale tap-scale"
                  >
                    <FaTrash />
                    Remove
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload resume"
                />
              </div>

              {/* File info */}
              {resumeFile && (
                <div
                  ref={fileInfoRef}
                  className="inline-block glass px-4 py-2 rounded-lg text-sm transition-all duration-500"
                  style={{
                    opacity: isFileInfoInView ? 1 : 0,
                    transform: isFileInfoInView ? 'translateY(0)' : 'translateY(10px)'
                  }}
                >
                  <span className="text-accent font-medium">Current file:</span>{' '}
                  {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>
          </div>

          {/* PDF Preview */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: showPreview ? '2000px' : '0px',
              opacity: showPreview ? 1 : 0
            }}
          >
            {showPreview && (
              <div className="border-t border-dark-700 pt-8 mt-12">
                <h4 className="text-xl font-bold mb-4 text-center">Resume Preview</h4>
                <div className="w-full h-[600px] bg-dark-900 rounded-lg overflow-hidden border border-dark-700">
                  <iframe
                    src={resumeUrl}
                    className="w-full h-full"
                    title="Resume PDF Preview"
                    frameBorder="0"
                  >
                    <p className="p-4 text-center text-dark-300">
                      Your browser does not support PDF preview. Please download the resume to view it.
                    </p>
                  </iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
