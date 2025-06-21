import React, { useEffect, useState } from 'react'

function App() {
  const [signals, setSignals] = useState([])

  useEffect(() => {
    fetch('/signals.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.trim().split('\n').slice(1)
        const parsed = lines.map(line => {
          const [symbol, direction, score, timestamp] = line.split(',')
          return { symbol, direction, score, timestamp }
        })
        setSignals(parsed)
      })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Crypto Signals Dashboard</h1>
      <table className="w-full text-left border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Token</th>
            <th className="p-2">Direção</th>
            <th className="p-2">Score</th>
            <th className="p-2">Hora</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((s, i) => (
            <tr key={i} className="border-t border-gray-700 hover:bg-gray-800">
              <td className="p-2">{s.symbol}</td>
              <td className="p-2">{s.direction}</td>
              <td className="p-2">{s.score}</td>
              <td className="p-2">{s.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
