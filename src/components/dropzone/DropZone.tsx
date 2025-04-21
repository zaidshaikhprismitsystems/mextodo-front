import { useDropzone } from "react-dropzone";
import { H6, Paragraph } from "../typography";
import UploadOnCloud from "../../icons/UploadOnCloud";
import { RootStyle } from "./styles";
import { useState } from "react";

export default function DropZone({
  onDrop,
  maxFiles,
  minFiles,
  curFile,
  placeholder,
  paragraph,
  accept,
  formError,
  isVideo,
}: any) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    accept: { "image/*": accept },
    onDrop: (acceptedFiles) => {

      if (curFile + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} images.`);
        return;
      }

      if (curFile + acceptedFiles.length < minFiles) {
        setError(`You need to upload at least ${minFiles} images.`);
      } else {
        setError(null);
      }

      if (isVideo) {
        const file = acceptedFiles[0];
        if (!file) {
          setError("Please upload a video.");
          return;
        }

        if (file.size > 20 * 1024 * 1024) {
          setError("Video size must be less than 20MB.");
          return;
        }

        // Validate video duration
        const video = document.createElement("video");
        video.preload = "metadata";
        video.src = URL.createObjectURL(file);

        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          console.log("Video Duration:", video.duration);

          if (video.duration > 60) {
            console.log("duration error");
            setTimeout(() => setError("Video must be at most 60 seconds."), 0);
            return;
          }

          // If all checks pass, accept the video
          setError(null);
          onDrop([file]); // Ensure the file is passed in an array
        };

        video.onerror = () => {
          setError("Invalid video file.");
        };
      } else {
        onDrop(acceptedFiles);
      }
      setError(null);
    },
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 0) {
        setError(`You can only upload up to ${maxFiles} images.`);
      }
    },
  });

  return (
    <RootStyle {...getRootProps({ className: "dropzone" })}>
      <UploadOnCloud sx={{ fontSize: 38, color: "text.secondary" }} />
      <Paragraph color="text.secondary">{paragraph}</Paragraph>
      <H6 fontSize={16} color="primary.main">{placeholder}</H6>
      <input {...getInputProps()} placeholder={placeholder} />
      {(error || formError) && (
        <Paragraph color="error.main">{error || formError}</Paragraph>
      )}
    </RootStyle>
  );
}
