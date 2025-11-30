import React from 'react';

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  placeholder?: string;
}

export default function MoneyInput({ value, onChange, className = "", placeholder = "R$ 0,00" }: MoneyInputProps) {
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Remove tudo que não é dígito
    const numericString = inputValue.replace(/\D/g, "");

    // Converte para número (divide por 100 para considerar os centavos)
    const numberValue = Number(numericString) / 100;

    onChange(numberValue);
  };

  return (
    <input
      type="text"
      // Se o valor for 0 e não tiver sido tocado, talvez queiramos mostrar vazio para ver o placeholder?
      // Mas "R$ 0,00" é um valor válido. Vamos manter consistente.
      value={formatCurrency(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
