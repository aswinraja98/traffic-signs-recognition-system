interface PredictionResultProps {
  result: string | number | null;
}

export default function PredictionResult({ result }: PredictionResultProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
      <div className="p-4 bg-gray-900 rounded text-white">
        {result ? (
          <span>Predicted Class: <b>{result}</b></span>
        ) : (
          <span>No prediction yet.</span>
        )}
      </div>
    </div>
  );
}
