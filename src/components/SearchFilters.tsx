"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brands")?.split(",").filter(Boolean) || []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.get("sizes")?.split(",").filter(Boolean) || []
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    searchParams.get("conditions")?.split(",").filter(Boolean) || []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get("colors")?.split(",").filter(Boolean) || []
  );

  const brands = ["Nike", "Adidas", "Zara", "H&M", "Mango", "Pull&Bear"];
  const sizes = ["XS", "S", "M", "L", "XL", "36", "38", "40", "42", "44"];
  const conditions = ["Novo", "Muito Bom", "Bom", "Razoável"];
  const colors = [
    { name: "Branco", value: "white", hex: "#FFFFFF" },
    { name: "Preto", value: "black", hex: "#000000" },
    { name: "Vermelho", value: "red", hex: "#EF4444" },
    { name: "Azul", value: "blue", hex: "#3B82F6" },
    { name: "Verde", value: "green", hex: "#10B981" },
    { name: "Amarelo", value: "yellow", hex: "#FBBF24" },
  ];

  const toggleSelection = (value: string, list: string[], setter: (v: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Limpar filtros antigos
    params.delete("min_price");
    params.delete("max_price");
    params.delete("brands");
    params.delete("sizes");
    params.delete("conditions");
    params.delete("colors");

    // Adicionar novos filtros
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","));
    if (selectedSizes.length > 0) params.set("sizes", selectedSizes.join(","));
    if (selectedConditions.length > 0) params.set("conditions", selectedConditions.join(","));
    if (selectedColors.length > 0) params.set("colors", selectedColors.join(","));

    router.push(`/buscar?${params.toString()}`);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedConditions([]);
    setSelectedColors([]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("min_price");
    params.delete("max_price");
    params.delete("brands");
    params.delete("sizes");
    params.delete("conditions");
    params.delete("colors");

    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filtros</h3>
        <button
          className="text-xs font-semibold text-primary hover:underline"
          type="button"
          onClick={clearFilters}
        >
          Limpar tudo
        </button>
      </div>

      {/* Preço */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Preço</p>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-2 bg-white border border-[#f0f4f2] rounded-lg text-sm"
            placeholder="Mín"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-gray-400">-</span>
          <input
            className="w-full p-2 bg-white border border-[#f0f4f2] rounded-lg text-sm"
            placeholder="Máx"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Tamanho */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Tamanho</p>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`p-2 border text-xs font-bold rounded-lg transition-colors ${
                selectedSizes.includes(size)
                  ? "border-primary bg-primary/10"
                  : "border-[#f0f4f2] hover:border-primary"
              }`}
              onClick={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Marca */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Marca</p>
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                checked={selectedBrands.includes(brand)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
                type="checkbox"
                onChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Condição */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Condição</p>
        <div className="flex flex-col gap-2">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                checked={selectedConditions.includes(condition)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
                type="checkbox"
                onChange={() =>
                  toggleSelection(condition, selectedConditions, setSelectedConditions)
                }
              />
              <span>{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cor */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Cor</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`size-8 rounded-full cursor-pointer hover:scale-110 transition-transform ${
                selectedColors.includes(color.value) ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              style={{
                backgroundColor: color.hex,
                border: color.value === "white" ? "1px solid #e5e7eb" : "none",
              }}
              onClick={() => toggleSelection(color.value, selectedColors, setSelectedColors)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <button
        className="w-full mt-4 py-3 bg-[#111813] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
        type="button"
        onClick={applyFilters}
      >
        Aplicar filtros
      </button>
    </div>
  );
}
