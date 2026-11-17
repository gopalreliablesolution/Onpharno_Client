import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';

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
          {
            _id: '1',
            title: 'Emerging Nutraceutical Trends: What Global Consumers Want',
            slug: 'emerging-nutraceutical-trends',
            coverImage: '/images/facility-highlights.jpg',
            category: 'Industry Trends',
            excerpt: 'An in-depth look at shifts toward preventive healthcare, plant-based capsules, and clean label formulations.',
            date: 'November 2026',
            readTime: '5 min read'
          },
          {
            _id: '2',
            title: 'Choosing the Right Dosage Form for High Bioavailability',
            slug: 'choosing-the-right-dosage-form',
            coverImage: '/images/manufacturing-facility.jpg',
            category: 'Formulation Science',
            excerpt: 'Why liquid-filled hard capsules and lipid carriers outperform conventional dry tablets for hydrophobic actives.',
            date: 'November 2026',
            readTime: '6 min read'
          },
          {
            _id: '3',
            title: 'Private Label vs Custom Formulation: Which Fits Your Timeline?',
            slug: 'private-label-vs-custom-formulation',
            coverImage: '/images/packaging-line.jpg',
            category: 'Business Strategy',
            excerpt: 'Compare speed to market versus unique intellectual property when scaling your healthcare brand.',
            date: 'October 2026',
            readTime: '4 min read'
          },
          {
            _id: '4',
            title: 'The Future of Effervescent Supplements in Global Markets',
            slug: 'the-future-of-effervescent-supplements',
            coverImage: '/images/facility-highlights.jpg',
            category: 'Novel Delivery',
            excerpt: 'How effervescent technology is captivating younger consumers through taste, instant hydration, and active stability.',
            date: 'October 2026',
            readTime: '5 min read'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO
        title="Scientific Insights & Healthcare Articles | ONPHARNO"
        description="Insights From the Future of Healthcare. Technical whitepapers, guides, and formulation technology news from ONPHARNO's R&D scientists."
      />

      <div className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-light border border-primary/30 mb-4">
            Knowledge Hub & Publications
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Scientific Insights & Articles
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mt-4 max-w-2xl font-light">
            Insights From the Future of Healthcare and Advanced Contract Formulation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <article
              key={b._id || b.slug}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group hover:shadow-xl hover:border-primary/40 transition-all"
            >
              <div className="h-52 bg-gray-100 overflow-hidden relative">
                <img
                  src={getImageUrl(b.coverImage || '/images/facility-highlights.jpg')}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                />
                <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {b.category || 'Science & R&D'}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{b.date || (b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : 'Recent')}</span>
                    <span>&bull;</span>
                    <span>{b.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="font-bold text-lg text-charcoal group-hover:text-primary transition-colors leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100">
                  <Link
                    to={`/resources/blogs/${b.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
