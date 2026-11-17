import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import apiClient from '../../api/client';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiClient.get(`/blogs/${slug}`);
        if (res.success && res.data) {
          setBlog(res.data);
        }
      } catch {
        setBlog({
          title: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Healthcare Formulation Insights',
          content: `
            <p class="mb-4">Pharmaceutical and nutraceutical manufacturing continues to evolve at an unprecedented pace. Today’s consumers and regulatory agencies demand higher scientific verification, superior bioavailability, and uncompromising clean-label transparency.</p>
            <h3 class="text-xl font-bold font-serif my-4">The Shift Toward Advanced Dosage Forms</h3>
            <p class="mb-4">Traditional tablets and dry powder capsules often fail to provide adequate solubilization for lipophilic or poorly water-soluble functional actives. In contrast, lipid-based formulation delivery systems—most notably liquid-filled hard capsules and capsule-in-capsule configurations—provide immediate bioavailability advantages.</p>
            <h3 class="text-xl font-bold font-serif my-4">Partnering for Long-Term Scale</h3>
            <p class="mb-4">A true contract manufacturing partner operates not as an episodic transactional vendor, but as an extension of your R&D and supply chain teams, proactively solving regulatory bottlenecks and ensuring consistent batch-to-batch quality.</p>
          `,
          date: 'November 2026',
          author: 'ONPHARNO Scientific Team',
          readTime: '5 min read'
        });
      }
    };
    fetchBlog();
  }, [slug]);

  return (
    <>
      <SEO title={`${blog?.title} - Insights`} description={blog?.title} />
      <div className="bg-warm border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/resources/blogs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </div>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-primary font-semibold uppercase tracking-wider">
            <span>Healthcare & Formulation R&D</span>
            <span>&bull;</span>
            <span>{blog?.readTime || '5 min read'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
            {blog?.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-b border-gray-100 pb-6">
            <span>{blog?.author || 'ONPHARNO Editorial'}</span>
            <span>&bull;</span>
            <span>{blog?.date || 'Recent'}</span>
          </div>
        </div>
        <div
          className="prose prose-lg max-w-none mt-8 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link to="/resources/blogs" className="text-primary font-semibold hover:text-primary-dark text-sm">
            &larr; Read More Articles
          </Link>
          <Link to="/contact" className="bg-primary text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors">
            Start a Project
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
