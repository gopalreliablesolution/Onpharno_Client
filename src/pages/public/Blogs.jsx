import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await apiClient.get('/blogs');
        if (res.success && res.data) {
          setBlogs(res.data);
        }
      } catch {
        // Fallback seed titles
        setBlogs([
          { _id: '1', title: 'Emerging Nutraceutical Trends: What Global Consumers Want', slug: 'emerging-nutraceutical-trends', excerpt: 'An in-depth look at shifts toward preventive healthcare, plant-based capsules, and clean label formulations.', date: 'November 2026', readTime: '5 min read' },
          { _id: '2', title: 'Choosing the Right Dosage Form for High Bioavailability', slug: 'choosing-the-right-dosage-form', excerpt: 'Why liquid-filled hard capsules and lipid carriers outperform conventional dry tablets for hydrophobic actives.', date: 'November 2026', readTime: '6 min read' },
          { _id: '3', title: 'Private Label vs Custom Formulation: Which Fits Your Timeline?', slug: 'private-label-vs-custom-formulation', excerpt: 'Compare speed to market versus unique intellectual property when scaling your healthcare brand.', date: 'October 2026', readTime: '4 min read' },
          { _id: '4', title: 'The Future of Effervescent Supplements in Global Markets', slug: 'the-future-of-effervescent-supplements', excerpt: 'How effervescent technology is captivating younger consumers through taste and instant hydration.', date: 'October 2026', readTime: '5 min read' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO title="Insights & Healthcare Articles - ONPHARNO" description="Insights From the Future of Healthcare. Articles, guides, and formulation technology news from ONPHARNO's R&D scientists." />
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">Resources</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2">Insights & Articles</h1>
          <p className="text-gray-300 mt-3 max-w-2xl font-light">
            Insights From the Future of Healthcare and Contract Manufacturing.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <article key={b._id || b.slug} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-44 bg-warm flex items-center justify-center p-6 border-b border-gray-100">
                <img src="/logo.png" alt="ONPHARNO" className="h-10 opacity-70" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {b.date || 'Recent'}</span>
                    <span>&bull;</span>
                    <span>{b.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-charcoal group-hover:text-primary transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{b.excerpt}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link to={`/resources/blogs/${b.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
