// src/pages/ContractPage/index.js
import React, { useState } from "react";
import ContractList from "./ContractList";
import ContractForm from "./ContractForm";
import ContractDetail from "./ContractDetail";
import ContractPrint from "./ContractPrint";

const ContractPage = () => {
  // Mock data สำหรับพนักงาน
  const employees = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [view, setView] = useState("list"); // list | add | edit | detail | print

  const handleAdd = (contract) => {
    setContracts([...contracts, { ...contract, id: Date.now() }]);
    setView("list");
  };

  const handleUpdate = (updated) => {
    setContracts(contracts.map(c => (c.id === updated.id ? updated : c)));
    setView("list");
  };

  const handleDelete = (id) => {
    if (window.confirm("ลบสัญญานี้หรือไม่?")) {
      setContracts(contracts.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      {view === "list" && (
        <ContractList
          contracts={contracts}
          onAdd={() => setView("add")}
          onView={(c) => { setSelectedContract(c); setView("detail"); }}
          onEdit={(c) => { setSelectedContract(c); setView("edit"); }}
          onDelete={handleDelete}
        />
      )}

      {view === "add" && (
        <ContractForm
          employees={employees}          // ส่ง employees ให้ Form
          onSave={handleAdd}
          onCancel={() => setView("list")}
        />
      )}

      {view === "edit" && selectedContract && (
        <ContractForm
          employees={employees}          // ส่ง employees ให้ Form
          contract={selectedContract}
          onSave={handleUpdate}
          onCancel={() => setView("list")}
        />
      )}

      {view === "detail" && selectedContract && (
        <ContractDetail
          contract={selectedContract}
          onBack={() => setView("list")}
          onEdit={() => setView("edit")}
          onPrint={() => setView("print")}
        />
      )}

      {view === "print" && selectedContract && (
        <ContractPrint contract={selectedContract} onBack={() => setView("list")} />
      )}
    </div>
  );
};

export default ContractPage;
