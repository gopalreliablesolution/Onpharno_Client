import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/blogs/${slug}`);
        if (res.success && res.data) {
          setBlog(res.data);
        }
      } catch {
        setBlog({
          title: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Healthcare Formulation Insights',
          coverImage: '/uploads/facilities/facility-highlights.jpg',
          category: 'Formulation Science',
          content: `
            <p class="mb-4 text-base leading-relaxed text-gray-700">Pharmaceutical and nutraceutical manufacturing continues to evolve at an unprecedented pace. Today’s consumers and regulatory agencies demand higher scientific verification, superior bioavailability, and uncompromising clean-label transparency.</p>
            <h3 class="text-2xl font-bold my-6 text-charcoal">The Shift Toward Advanced Dosage Forms</h3>
            <p class="mb-4 text-base leading-relaxed text-gray-700">Traditional tablets and dry powder capsules often fail to provide adequate solubilization for lipophilic or poorly water-soluble functional actives. In contrast, lipid-based formulation delivery systems—most notably liquid-filled hard capsules and capsule-in-capsule configurations—provide immediate bioavailability advantages.</p>
            <h3 class="text-2xl font-bold my-6 text-charcoal">Eliminating Gastric Irritation with Multi-Particulates</h3>
            <p class="mb-4 text-base leading-relaxed text-gray-700">Multi-particulate pellets disperse widely across the gastrointestinal mucosa, preventing high localized active concentrations. This significantly enhances patient compliance, particularly for sensitive mineral complexes such as iron and botanical extracts.</p>
            <h3 class="text-2xl font-bold my-6 text-charcoal">Partnering for Long-Term Scale</h3>
            <p class="mb-4 text-base leading-relaxed text-gray-700">A true contract manufacturing partner operates not as an episodic transactional vendor, but as an extension of your R&D and supply chain teams, proactively solving regulatory bottlenecks and ensuring consistent batch-to-batch quality.</p>
          `,
          date: 'November 2026',
          author: 'ONPHARNO Scientific Team',
          readTime: '5 min read'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${blog?.title} - Insights | ONPHARNO`}
        description={blog?.excerpt || blog?.title}
        schema={
          blog
            ? {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: blog.title,
                description: blog.excerpt || blog.title,
                image: blog.coverImage || '/logo.png',
                datePublished: blog.publishedAt || blog.createdAt,
                author: {
                  '@type': 'Person',
                  name: blog.author || 'ONPHARNO Scientific Editorial Team',
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'ONPHARNO',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://onpharno.com/logo.png',
                  },
                },
              }
            : null
        }
      />
      
      <div className="bg-warm border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/resources/blogs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <span>{blog?.category || 'Healthcare & Formulation R&D'}</span>
            <span>&bull;</span>
            <span>{blog?.readTime || '5 min read'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            {blog?.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-6">
            <span>By {blog?.author || 'ONPHARNO Scientific Team'}</span>
            <span>&bull;</span>
            <span>{blog?.date || (blog?.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Recent')}</span>
          </div>
        </div>

        {blog && (
          <div className="my-8 rounded-3xl overflow-hidden shadow-lg border border-gray-100 max-h-[420px]">
            <img
              src={
                blog.coverImage && !blog.coverImage.includes('logo.png')
                  ? getImageUrl(blog.coverImage)
                  : '/images/facility-highlights.jpg'
              }
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/facility-highlights.jpg'; }}
            />
          </div>
        )}

        <div
          className="prose max-w-none text-charcoal mt-8 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog?.content || '' }}
        />

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-base text-charcoal">Have Questions About This Technology?</h4>
            <p className="text-xs text-gray-500 mt-0.5">Connect with our formulation development scientists.</p>
          </div>
          <Link
            to="/contact"
            className="bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-primary-dark transition-all whitespace-nowrap"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
