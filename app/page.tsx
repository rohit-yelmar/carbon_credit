"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    project_name: "",
    registry: "",
    vintage: "",
    quantity: "",
    serial_number: "",
  });
  const [recordId, setRecordId] = useState("");
  const [result, setResult] = useState("");

  const createRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error creating record");
    }
  };

  const loadMockData = () => {
    const mockRecords = [
      {
        project_name: "Mangrove Restoration Project",
        registry: "VCS",
        vintage: "2023",
        quantity: "100",
        serial_number: "VCS-0001",
      },
      {
        project_name: "Solar Power Plant Maharashtra",
        registry: "GS",
        vintage: "2022",
        quantity: "50",
        serial_number: "GS-1001",
      },
      {
        project_name: "Wind Farm Rajasthan",
        registry: "VCS",
        vintage: "2021",
        quantity: "200",
        serial_number: "VCS-0456",
      },
    ];

    const randomRecord =
      mockRecords[Math.floor(Math.random() * mockRecords.length)];
    setFormData(randomRecord);
  };

  const getRecord = async () => {
    if (!recordId) return;
    try {
      const response = await fetch(`/api/records/${recordId}`);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error fetching record");
    }
  };

  const retireRecord = async () => {
    if (!recordId) return;
    try {
      const response = await fetch(`/api/records/${recordId}/retire`, {
        method: "POST",
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error retiring record");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Carbon Credit Ledger</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Record</h2>
          <form onSubmit={createRecord} className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full p-2 border rounded"
              value={formData.project_name}
              onChange={(e) =>
                setFormData({ ...formData, project_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Registry"
              className="w-full p-2 border rounded"
              value={formData.registry}
              onChange={(e) =>
                setFormData({ ...formData, registry: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Vintage"
              className="w-full p-2 border rounded"
              value={formData.vintage}
              onChange={(e) =>
                setFormData({ ...formData, vintage: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-2 border rounded"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Serial Number"
              className="w-full p-2 border rounded"
              value={formData.serial_number}
              onChange={(e) =>
                setFormData({ ...formData, serial_number: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full bg-gray-300 text-black p-2 rounded"
            >
              Create Record
            </button>
            <button
              type="button"
              onClick={loadMockData}
              className="w-full bg-gray-300 text-black p-2 rounded"
            >
              Load Mock Data
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Record Operations</h2>
            <input
              type="text"
              placeholder="Record ID"
              className="w-full p-2 border rounded mb-4"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
            />
            <div className="space-y-2">
              <button
                onClick={getRecord}
                className="w-full bg-gray-300 text-black p-2 rounded"
              >
                Get Record
              </button>
              <button
                onClick={retireRecord}
                className="w-full bg-gray-300 text-black p-2 rounded"
              >
                Retire Record
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto h-96 w-156 text-black">
            {result}
          </pre>
        </div>
      </div>
    </div>
  );
}
