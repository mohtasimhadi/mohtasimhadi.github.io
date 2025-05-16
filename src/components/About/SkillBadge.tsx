export default function SkillBadge({ name }: { name: string }) {
  return (
    <div className="bg-gray-200 px-3 py-2 rounded text-sm font-semibold">
      {name}
    </div>
  );
}