export default function Avatar({ text, className = "" }: { text: string, className?: string }) {
  // Generišemo boju na osnovu teksta
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
  }

  const bgColor = stringToColor(text);
  const initials = text
    .split('@')[1] // Uzimamo deo posle @
    .split(/[^a-zA-Z]/) // Delimo na reči
    .map(word => word[0]?.toUpperCase() || '') // Uzimamo prva slova
    .slice(0, 2) // Uzimamo prva dva inicijala
    .join('');

  return (
    <div 
      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-base ${className}`}
      style={{ 
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}88)`,
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}
    >
      {initials}
    </div>
  );
} 