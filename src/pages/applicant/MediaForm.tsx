import { useRef, useEffect, useState } from "react";
import { Hands, type Results, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

import HandPose1 from "../../../public/1.png";
import HandPose2 from "../../../public/2.png";
import HandPose3 from "../../../public/3.png";

export default function MediaForm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [lastCaptureTime, setLastCaptureTime] = useState<number>(0);

  const handleCapture  = () => {
    const video = videoRef.current;
    if(!video) return;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const ctx = tempCanvas.getContext("2d");
    if(!ctx) return;

    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    const imageDataUrl = tempCanvas.toDataURL("image/png");
    setCapturedImage(imageDataUrl);
    console.log("📸 Gambar ditangkap!");
  }

  useEffect(() => {
    let camera: Camera | null = null;

    // Inisialisasi MediaPipe Hands
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    // Ketika hasil deteksi tangan diterima
    hands.onResults((results: Results) => {
      const canvasCtx = canvasRef.current?.getContext("2d");
      const canvasElement = canvasRef.current;
      if (!canvasCtx || !canvasElement) return;

      // Sesuaikan ukuran canvas dengan video
      canvasElement.width = videoRef.current!.videoWidth;
      canvasElement.height = videoRef.current!.videoHeight;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // Gambar garis & titik tangan
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",
            lineWidth: 1,
          });

          type FingerName = "Thumb" | "Index" | "Middle" | "Ring" | "Pinky";
          const fingers: FingerName[] = [];

          if (landmarks[4].x < landmarks[3].x) {
            fingers.push("Thumb");
          }

          // Index
          if (landmarks[8].y < landmarks[6].y) {
            fingers.push("Index");
          }

          // Middle
          if (landmarks[12].y < landmarks[10].y) {
            fingers.push("Middle");
          }

          // Ring
          if (landmarks[16].y < landmarks[14].y) {
            fingers.push("Ring");
          }

          // Pinky
          if (landmarks[20].y < landmarks[18].y) {
            fingers.push("Pinky");
          }

          const fingerCount = fingers.length;
          console.log("Jari terangkat:", fingers);
          console.log("Jumlah jari:", fingerCount);

          const now = Date.now();
          if(fingerCount === 3 && now - lastCaptureTime > 3000){
            setLastCaptureTime(now);
            handleCapture();
          }
        }
      }

      canvasCtx.restore();
    });

    if (videoRef.current) {
      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 800,
        height: 384,
      });
      camera.start();
    }

    return () => {
      if (camera) camera.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold">Raise Your Hand to Capture</h2>
      <p>We'll take the photo once your hand pose is detected.</p>

      {/* Container agar video dan canvas bisa tumpang tindih */}
      <div className="relative border border-gray-300 rounded overflow-hidden">
        <video
          ref={videoRef}
          className="object-cover"
          style={{ width: 800, height: 384 }}
        ></video>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{ width: 800, height: 384 }}
        ></canvas>
      </div>

      <button
        onClick={handleCapture}
        className="mt-4 bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
      >
        📸 Ambil Gambar
      </button>
      <br/>

      {capturedImage && (
        <div className="mt-4 text-center">
          <h3 className="font-semibold mb-2">Hasil Tangkap:</h3>
          <img
            src={capturedImage}
            alt="Hasil Tangkap"
            className="border rounded-md shadow-md"
            style={{ width: "400px" }}
          />
        </div>
      )}
      <br/>
      <p className="mt-4 mb-4">
        To take a picture, follow the hand poses in the order shown below. The
        system will automatically capture the image once the final pose is
        detected.
      </p>
      <div className="flex flex-row gap-8">
        <img src={HandPose1} style={{ width: "85px" }} />
        <img src={HandPose2} style={{ width: "85px" }} />
        <img src={HandPose3} style={{ width: "85px" }} />
      </div>
    </div>
  );
}
