function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Car Palace
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Si tu vois ce texte stylisé, c'est que <strong>React</strong> et <strong>Tailwind CSS</strong> fonctionnent parfaitement !
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Tester un bouton
        </button>
      </div>
    </div>
  )
}

export default App