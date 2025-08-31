"use client"

import { useEffect, useState } from "react"
import api from "../services/api"

export default function Journeys() {
  interface Journey {
    channels: string[]
  }

  const [journeys, setJourneys] = useState<Journey[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await api.getData()

      setJourneys(data)
      console.log("Dados: " + data)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Jornadas do Cliente</h1>
          <p className="text-slate-600 text-lg">Visualize os touchpoints e caminhos percorridos pelos usuários</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Tabela de Jornadas</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                    Jornada
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                    Touchpoints
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {journeys.map((j, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="py-4 px-6 text-slate-800">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{j.channels.join(" → ")}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {j.channels.length} touchpoints
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {journeys.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-slate-500 font-medium">Nenhuma jornada encontrada</h3>
              <p className="text-slate-400 text-sm mt-1">Os dados das jornadas aparecerão aqui quando carregados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
