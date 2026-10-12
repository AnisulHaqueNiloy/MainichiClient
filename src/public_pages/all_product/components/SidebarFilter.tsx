import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface SidebarFilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const SidebarFilter = ({ priceRange, setPriceRange }: SidebarFilterProps) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:min-w-[300px] sm:flex-row sm:items-center sm:gap-4">
      <h3 className="shrink-0 text-sm font-bold text-slate-800">Price</h3>
      <Slider
        value={priceRange}
        min={0}
        max={15000}
        step={100}
        onValueChange={(val) => setPriceRange(val as [number, number])}
        className="min-w-[120px] flex-1"
      />
      <div className="flex shrink-0 justify-between gap-3 text-[10px] font-black uppercase text-gray-400">
        <span>¥{priceRange[0]}</span>
        <span>¥{priceRange[1]}</span>
      </div>
      <Button className="h-9 shrink-0 rounded-lg bg-[var(--market-leaf)] px-4 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[var(--market-tomato-deep)]">
        Apply Filter
      </Button>
    </div>
  );
};

export default SidebarFilter;
