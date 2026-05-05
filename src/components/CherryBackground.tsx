import cherry from "@/assets/cherry.gif";

const CherryBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${cherry})`,
        opacity: 0.1,
        filter: "blur(1px)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, hsl(340 60% 99% / 0.7), hsl(280 50% 98% / 0.85))",
      }}
    />
  </div>
);

export default CherryBackground;