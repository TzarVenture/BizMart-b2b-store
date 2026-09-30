import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    image: string;
    subcategories: string[];
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full card-hover">
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
          
          <ul className="text-sm text-slate-500 mb-4 flex-grow">
            {category.subcategories.slice(0, 3).map((sub, idx) => (
              <li key={idx} className="mb-1 flex items-center before:content-['•'] before:mr-2 before:text-slate-300">
                {sub}
              </li>
            ))}
            {category.subcategories.length > 3 && (
              <li className="text-primary text-xs font-medium mt-2">+ {category.subcategories.length - 3} more</li>
            )}
          </ul>

          <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
            Explore Category <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
