// action/components/AddEntryForm.tsx

import React, { useState } from "react";

interface AddEntryFormProps {
  onAddEntry: (name: string, amount: number, isAllowance: boolean) => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAddEntry }) => {
  const [newName, setNewName] = useState("");
  const [newCost, setNewCost] = useState<string>("");
  const [isAddingAllowance, setIsAddingAllowance] = useState(true);

  const formatCurrency = (value: string): string => {
    const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    return isNaN(numberValue) ? "" : `$${numberValue.toLocaleString()}`;
  };

  const handleAdd = () => {
    const costValue = parseFloat(newCost.replace(/[^0-9.-]+/g, ""));
    onAddEntry(newName, costValue, isAddingAllowance);
    setNewName("");
    setNewCost("");
  };

  return (
    <div className="mt-8 p-4 bg-gray-900 rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold text-gray-200">Add Allowance or Deduction</h4>
      <div className="flex flex-col space-y-4 mt-4">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Cost"
          value={newCost}
          onChange={(e) => setNewCost(formatCurrency(e.target.value))}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddingAllowance(true)}
            className={`px-4 py-2 rounded-lg ${isAddingAllowance ? "bg-blue-500" : "bg-gray-700"} text-white`}
          >
            Add to Allowances
          </button>
          <button
            onClick={() => setIsAddingAllowance(false)}
            className={`px-4 py-2 rounded-lg ${!isAddingAllowance ? "bg-blue-500" : "bg-gray-700"} text-white`}
          >
            Add to Deductions
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 mt-4 bg-green-500 rounded-lg text-white font-bold hover:bg-green-600"
        >
          Add Entry
        </button>
      </div>
    </div>
  );
};

export default AddEntryForm;
