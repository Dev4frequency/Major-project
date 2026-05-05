import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Linkedin } from "lucide-react";
import dev1 from "@/assets/devs/dev1.png";
import dev2 from "@/assets/devs/dev2.png";
import dev3 from "@/assets/devs/dev3.png";
import dev4 from "@/assets/devs/dev4.png";

const devs = [
  { name: "Harsh Singh Bisht", role: "Design Specialist", img: dev1, url: "https://www.linkedin.com/in/harsh-singh-bisht-5549ba27a/" },
  { name: "Abhishek Singh Negi", role: "Frontend Specialist", img: dev2, url: "https://www.linkedin.com/in/abhishek-negi-275600356/" },
  { name: "Kaushalendra Singh", role: "DevOps Engineer", img: dev3, url: "https://www.linkedin.com/in/kaushal-singh-6391b0288/" },
  { name: "Yash Bisht", role: "Team Lead · Full Stack Engineer", img: dev4, url: "https://www.linkedin.com/in/yash-bisht-1a74752a8/" },
];

const Developers = () => (
  <Layout>
    <SectionHeading eyebrow="The team" title="Developers behind Dev-Assistant" subtitle="A small team building disciplined learning tools." />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {devs.map((d) => (
        <div key={d.name} className="glass rounded-2xl p-4 hover:-translate-y-1 transition-transform">
          <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-muted">
            <img src={d.img} alt={d.name} className="w-full h-full object-cover object-center" />
          </div>
          <h3 className="mt-4 font-semibold">{d.name}</h3>
          <p className="text-sm text-muted-foreground">{d.role}</p>
          <a href={d.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      ))}
    </div>
  </Layout>
);
export default Developers;