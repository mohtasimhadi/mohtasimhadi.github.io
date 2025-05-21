export default function ContactItem({ Icon, text }: { Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Icon className="w-5 h-5 text-gray-900" />
      <p>{text}</p>
    </div>
  );
}