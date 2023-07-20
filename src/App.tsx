import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
//import QrReader from "react-qr-scanner"
import { useZxing } from "react-zxing";
import './App.css';

export default function App() {
  const [inputText, setInputText] = useState("Hello World!");
  const [isCameraActive, setCamera] = useState(false);
  const [cameraButtonText, setCameraButtonText] = useState("OFF");
  const [result, setResult] = useState("Scanning...");

  useEffect(() => {
    if (result === "" || result === "Scanning...") return;
    alert(result);
  }, [result]);

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
    paused: !isCameraActive,
  });

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleScanButtonClick = () => {
    setCamera(!isCameraActive);
    setCameraButtonText(!isCameraActive ? "ON" : "OFF");
    setResult("Scanning...");
  };
  
  return (
    <>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputText}
          viewBox={`0 0 256 256`}
        />
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          style={{ width: '100%' }}
        />
      </div>
      <button onClick={handleScanButtonClick}>
        Camera: {cameraButtonText}
      </button>
      <div hidden={!isCameraActive}>
        <p>
          <span>RESULT: </span>
          <span>{result}</span>
        </p>
        <video ref={ref} />
      </div>
    </>
  );
}
