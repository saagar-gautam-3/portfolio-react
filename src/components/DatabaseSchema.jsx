import React, { useState } from "react";
import { Database, Key, Link as LinkIcon } from "lucide-react";

export default function DatabaseSchema() {
  const [hoveredField, setHoveredField] = useState(null);

  const tables = [
    {
      name: "users",
      columns: [
        { name: "id", type: "UUID", isPk: true, isFk: false },
        { name: "email", type: "VARCHAR(255)", isPk: false, isFk: false },
        { name: "password_hash", type: "VARCHAR(255)", isPk: false, isFk: false },
        { name: "role_id", type: "UUID", isPk: false, isFk: true, references: "roles.id" },
        { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false }
      ]
    },
    {
      name: "roles",
      columns: [
        { name: "id", type: "UUID", isPk: true, isFk: false },
        { name: "name", type: "VARCHAR(50)", isPk: false, isFk: false },
        { name: "description", type: "TEXT", isPk: false, isFk: false }
      ]
    },
    {
      name: "role_permissions",
      columns: [
        { name: "role_id", type: "UUID", isPk: true, isFk: true, references: "roles.id" },
        { name: "permission_id", type: "UUID", isPk: true, isFk: true, references: "permissions.id" }
      ]
    },
    {
      name: "permissions",
      columns: [
        { name: "id", type: "UUID", isPk: true, isFk: false },
        { name: "name", type: "VARCHAR(100)", isPk: false, isFk: false },
        { name: "resource", type: "VARCHAR(50)", isPk: false, isFk: false },
        { name: "action", type: "VARCHAR(20)", isPk: false, isFk: false }
      ]
    }
  ];

  const handleMouseEnter = (fieldId) => {
    setHoveredField(fieldId);
  };

  const handleMouseLeave = () => {
    setHoveredField(null);
  };

  const handleClick = (fieldId) => {
    if (hoveredField === fieldId) {
      setHoveredField(null);
    } else {
      setHoveredField(fieldId);
    }
  };


  // Determine if a field should be highlighted based on hover state
  const isHighlighted = (tableName, colName, refStr, isPk, isFk) => {
    if (!hoveredField) return false;

    const currentFieldId = `${tableName}.${colName}`;
    if (hoveredField === currentFieldId) return true;

    // If we are hovering on a FK that references the current field (PK)
    const [hoveredTable, hoveredCol] = hoveredField.split(".");
    const hoveredTableData = tables.find(t => t.name === hoveredTable);
    const hoveredColData = hoveredTableData?.columns.find(c => c.name === hoveredCol);

    if (hoveredColData?.isFk && hoveredColData.references === currentFieldId) {
      return true;
    }

    // If we are hovering on a PK and the current field is a FK that references it
    if (isFk && refStr === hoveredField) {
      return true;
    }

    return false;
  };

  return (
    <div className="schema-container">
      <div className="schema-title-bar">
        <Database size={16} className="text-gradient-cyan" />
        <span className="schema-title font-mono">postgres_schema.sql</span>
        <div className="pulse-indicator">
          <span className="pulse-dot"></span>
          <span className="pulse-text">Live Sync</span>
        </div>
      </div>

      <div className="schema-tables-grid">
        {tables.map((table) => (
          <div key={table.name} className="schema-table-card glass-panel">
            <div className="table-header">
              <span className="table-icon">📋</span>
              <span className="table-name font-mono">{table.name}</span>
            </div>
            <div className="table-columns">
              {table.columns.map((col) => {
                const colId = `${table.name}.${col.name}`;
                const active = isHighlighted(table.name, col.name, col.references, col.isPk, col.isFk);
                
                return (
                  <div
                    key={col.name}
                    className={`table-row ${active ? "active-row" : ""} ${
                      col.isPk || col.isFk ? "key-row" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(colId)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(colId)}
                  >
                    <span className="col-key">
                      {col.isPk && <Key size={10} className="pk-icon" title="Primary Key" />}
                      {col.isFk && <LinkIcon size={10} className="fk-icon" title={`Foreign Key: ${col.references}`} />}
                    </span>
                    <span className="col-name font-mono">{col.name}</span>
                    <span className="col-type font-mono">{col.type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="schema-tip">
        <span className="tip-badge">TIP</span>
        <span className="tip-text">Hover or tap over key fields (e.g. `role_id` or `id`) to trace relational references.</span>
      </div>
    </div>
  );
}
