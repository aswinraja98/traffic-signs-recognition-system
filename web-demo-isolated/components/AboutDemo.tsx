// AboutDemo component: shows demo info and technical details
export default function AboutDemo() {
  return (
    <section className="mb-6 p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">About This Demo</h2>
      <p className="mb-2">This is a simplified frontend demo of the Traffic Signs Recognition System. The main feature is recognizing traffic signs from the test dataset. You can also upload your own image for prediction.</p>
      <ul className="list-disc pl-5 mb-2">
        <li>Test image recognition (core)</li>
        <li>Upload your own image (secondary)</li>
        <li>Technical details and implementation info</li>
      </ul>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-blue-700 px-2 py-1 rounded text-xs">Python</span>
        <span className="bg-blue-700 px-2 py-1 rounded text-xs">TensorFlow</span>
        <span className="bg-blue-700 px-2 py-1 rounded text-xs">Next.js</span>
        <span className="bg-blue-700 px-2 py-1 rounded text-xs">React</span>
      </div>
    </section>
  );
}
