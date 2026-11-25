import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from './SEO';
import apiClient from '../../api/client';
import getImageUrl from '../../utils/imageUrl';
import { ArrowRight } from 'lucide-react';

// Generic block-based renderer for the Products CMS pages (3A–3D and the
// capsule technology platforms). Everything visible comes from the saved CMS
// content; empty fields/items are hidden (golden rule).
const ProductPage = ({ sectionKey, pageKey = 'products', defaults, seoTitle, seoDescription }) => {
  const { data } = useQuery({
    queryKey: ['prod-page', pageKey, sectionKey],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/pages/${pageKey}/sections?includeHidden=true`);
        return res.data || [];
      } catch { return []; }
    },
  });
  const rec = (data || []).find((s) => s && s.key === sectionKey && s.visible !== false);
  const d = rec ? { ...defaults, ...(rec.content || {}) } : defaults;
  const txt = (v) => (v ?? '').toString().trim();
  const has = (v) => !!txt(v);
  const arr = (v) => (Array.isArray(v)
    ? v.filter((x) => x && Object.values(x).some((val) => typeof val !== 'boolean' && has(val)))
    : []);

  const renderedBlocks = arr(d.blocks)
    .map((block) => ({ block, el: renderBlock(block, { txt, has, arr }) }))
    .filter((x) => x.el);

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      {renderedBlocks.length > 0 && (
        <div className="space-y-14 pb-16">
          {renderedBlocks.map(({ block, el }, i) => (
            <div key={i} id={txt(block.anchor) || undefined}>
              {block.type === 'hero' ? el : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{el}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const LIST_KEYS = { iconGrid: 'items', steps: 'items', imageCards: 'items', faq: 'items', comparison: 'rows' };
const TEXT_KEYS = ['eyebrow', 'title', 'subtitle', 'body', 'image', 'ctaText', 'ctaLink', 'labelHeader', 'leftLabel', 'rightLabel'];

const renderBlock = (b, { txt, has, arr }) => {
  const listKey = LIST_KEYS[b.type];
  const hasContent = TEXT_KEYS.some((k) => has(b[k])) || (listKey ? arr(b[listKey]).length > 0 : false);
  if (!hasContent) return null;
  switch (b.type) {
    case 'hero': return <Hero b={b} txt={txt} has={has} />;
    case 'text': return <TextBlock b={b} txt={txt} has={has} />;
    case 'iconGrid': return <IconGrid b={b} txt={txt} has={has} arr={arr} />;
    case 'steps': return <Steps b={b} txt={txt} has={has} arr={arr} />;
    case 'imageCards': return <ImageCards b={b} txt={txt} has={has} arr={arr} />;
    case 'comparison': return <Comparison b={b} txt={txt} has={has} arr={arr} />;
    case 'faq': return <Faq b={b} txt={txt} has={has} arr={arr} />;
    case 'ctaBanner': return <CtaBanner b={b} txt={txt} has={has} />;
    default: return null;
  }
};

const SectionHead = ({ b, txt, center = true }) =>
  (txt(b.title) || txt(b.subtitle)) ? (
    <div className={`${center ? 'text-center' : 'text-left'} mb-10`}>
      {txt(b.eyebrow) && (
        <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary/30 pb-1">
          {txt(b.eyebrow)}
        </span>
      )}
      {txt(b.title) && <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal mt-3 whitespace-pre-line leading-tight">{txt(b.title)}</h2>}
      {txt(b.subtitle) && <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-3xl mx-auto whitespace-pre-line leading-relaxed">{txt(b.subtitle)}</p>}
    </div>
  ) : null;

const Hero = ({ b, txt, has }) => {
  if (!has(b.eyebrow) && !has(b.title) && !has(b.subtitle) && !has(b.image) && !(has(b.ctaText) && has(b.ctaLink))) return null;
  const img = txt(b.image);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy text-white">
      {img && (
        <>
          <img src={getImageUrl(img)} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80 hidden lg:block" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/40 hidden lg:block" />
        </>
      )}
      <div className="relative z-10 max-w-3xl px-6 sm:px-12 py-14 sm:py-20">
        {txt(b.eyebrow) && <span className="text-primary-light uppercase text-xs font-semibold tracking-wider">{txt(b.eyebrow)}</span>}
        {txt(b.title) && <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mt-2 whitespace-pre-line">{txt(b.title)}</h1>}
        {txt(b.subtitle) && <p className="text-base sm:text-lg text-gray-300 mt-5 font-light leading-relaxed whitespace-pre-line">{txt(b.subtitle)}</p>}
        {has(b.ctaText) && has(b.ctaLink) && (
          <Link to={txt(b.ctaLink)} className="mt-7 inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-6 py-3.5 rounded-full shadow hover:bg-primary-dark">
            {txt(b.ctaText)} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

const TextBlock = ({ b, txt, has }) =>
  (has(b.eyebrow) || has(b.title) || has(b.body)) ? (
    <section>
      <SectionHead b={b} txt={txt} />
      {txt(b.body) && <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line max-w-4xl mx-auto">{txt(b.body)}</p>}
    </section>
  ) : null;

const GRID_COLS = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-2 lg:grid-cols-5' };

const IconGrid = ({ b, txt, has, arr }) => {
  const items = arr(b.items);
  if (!has(b.title) && !has(b.subtitle) && !items.length) return null;
  return (
    <section>
      <SectionHead b={b} txt={txt} />
      <div className={`grid grid-cols-1 gap-4 ${GRID_COLS[b.cols] || GRID_COLS[4]}`}>
        {items.map((it, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-2">
            {it.icon && <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg"><i className={txt(it.icon)} /></span>}
            {txt(it.num) && <span className="font-serif font-bold text-primary text-xl">{txt(it.num)}</span>}
            {txt(it.title) && <h3 className="font-bold text-sm text-charcoal leading-snug">{txt(it.title)}</h3>}
            {txt(it.desc) && <p className="text-xs text-gray-600 leading-relaxed">{txt(it.desc)}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

const Steps = ({ b, txt, has, arr }) => {
  const items = arr(b.items);
  if (!has(b.title) && !has(b.subtitle) && !items.length) return null;
  const flow = b.variant === 'flow';
  return (
    <section>
      <SectionHead b={b} txt={txt} />
      {flow ? (
        <div className={`grid grid-cols-1 gap-5 ${GRID_COLS[b.cols] || GRID_COLS[4]}`}>
          {items.map((it, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              {txt(it.image) && <img src={getImageUrl(txt(it.image))} alt="" className="h-32 w-full object-contain mb-4" onError={(e) => { e.target.style.display = 'none'; }} />}
              {(it.icon || txt(it.num)) && (
                <span className="w-11 h-11 rounded-full bg-primary/10 text-primary border-2 border-primary/30 flex items-center justify-center text-sm font-bold mb-3">
                  {it.icon ? <i className={txt(it.icon)} /> : txt(it.num)}
                </span>
              )}
              {txt(it.title) && <h4 className="text-sm font-bold text-charcoal leading-snug">{txt(it.title)}</h4>}
              {txt(it.desc) && <p className="text-xs text-gray-600 mt-2 leading-relaxed">{txt(it.desc)}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-4 ${GRID_COLS[b.cols] || GRID_COLS[4]}`}>
          {items.map((it, i) => (
            <div key={i} className="bg-warm/40 rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                {(it.icon || txt(it.num)) && (
                  <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {it.icon ? <i className={txt(it.icon)} /> : txt(it.num)}
                  </span>
                )}
                {txt(it.title) && <h4 className="text-sm font-bold text-charcoal leading-snug">{txt(it.title)}</h4>}
              </div>
              {txt(it.desc) && <p className="text-xs text-gray-600 leading-relaxed">{txt(it.desc)}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const ImageCards = ({ b, txt, has, arr }) => {
  const items = arr(b.items);
  if (!has(b.title) && !has(b.subtitle) && !items.length) return null;
  return (
    <section>
      <SectionHead b={b} txt={txt} />
      <div className={`grid grid-cols-1 gap-5 ${GRID_COLS[b.cols] || GRID_COLS[3]}`}>
        {items.map((it, i) => (
          <div key={i} className={`group rounded-2xl border overflow-hidden flex flex-col ${b.dark ? 'bg-navy text-white border-navy-800' : 'bg-white border-gray-200'} shadow-sm`}>
            {txt(it.image) && (
              <div className="h-40 w-full overflow-hidden bg-warm/40">
                <img src={getImageUrl(txt(it.image))} alt={txt(it.title)} className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              {it.icon && <span className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${b.dark ? 'bg-white/10 text-primary-light' : 'bg-primary/10 text-primary'}`}><i className={txt(it.icon)} /></span>}
              {txt(it.subtitle) && <span className={`text-[10px] font-bold uppercase tracking-wider ${b.dark ? 'text-primary-light' : 'text-primary'}`}>{txt(it.subtitle)}</span>}
              {txt(it.title) && <h3 className={`font-bold text-sm mt-1 ${b.dark ? 'text-white' : 'text-charcoal'}`}>{txt(it.title)}</h3>}
              {txt(it.desc) && <p className={`text-xs mt-2 leading-relaxed ${b.dark ? 'text-gray-300' : 'text-gray-600'}`}>{txt(it.desc)}</p>}
              {has(it.cta) && has(it.link) && (
                <Link to={txt(it.link)} className={`inline-flex items-center gap-1 text-xs font-bold mt-auto pt-4 ${b.dark ? 'text-primary-light' : 'text-primary'}`}>
                  {txt(it.cta)} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Comparison = ({ b, txt, has, arr }) => {
  const rows = arr(b.rows);
  if (!has(b.title) && !has(b.subtitle) && !rows.length) return null;
  return (
    <section>
      <SectionHead b={b} txt={txt} />
      {!!rows.length && (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                {has(b.labelHeader) && <th className="px-5 py-4 font-semibold">{txt(b.labelHeader)}</th>}
                {has(b.leftLabel) && <th className="px-5 py-4 font-semibold">{txt(b.leftLabel)}</th>}
                {has(b.rightLabel) && <th className="px-5 py-4 font-semibold">{txt(b.rightLabel)}</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  {has(b.labelHeader) && <th className="px-5 py-4 font-semibold text-charcoal align-top whitespace-pre-line">{txt(r.label)}</th>}
                  {has(b.leftLabel) && <td className="px-5 py-4 text-gray-600 align-top whitespace-pre-line">{txt(r.left)}</td>}
                  {has(b.rightLabel) && <td className="px-5 py-4 text-gray-600 align-top whitespace-pre-line">{txt(r.right)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const Faq = ({ b, txt, has, arr }) => {
  const items = arr(b.items);
  if (!has(b.title) && !has(b.subtitle) && !items.length) return null;
  return (
    <section>
      <SectionHead b={b} txt={txt} />
      <div className="max-w-4xl mx-auto space-y-3">
        {items.map((it, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-gray-200 px-5 py-4">
            <summary className="cursor-pointer font-semibold text-sm text-charcoal list-none flex items-center justify-between gap-4">
              {txt(it.q)}
              <span className="text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            {txt(it.a) && <p className="text-sm text-gray-600 mt-3 leading-relaxed whitespace-pre-line">{txt(it.a)}</p>}
          </details>
        ))}
      </div>
    </section>
  );
};

const CtaBanner = ({ b, txt, has }) => {
  if (!has(b.title) && !has(b.subtitle) && !(has(b.ctaText) && has(b.ctaLink))) return null;
  const img = txt(b.image);
  return (
    <section className="relative rounded-3xl overflow-hidden bg-navy text-white">
      {img && <img src={getImageUrl(img)} alt="" className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-60 hidden lg:block" onError={(e) => { e.target.style.display = 'none'; }} />}
      <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          {txt(b.title) && <h3 className="text-xl sm:text-2xl font-bold whitespace-pre-line">{txt(b.title)}</h3>}
          {txt(b.subtitle) && <p className="text-sm text-gray-300 mt-2 whitespace-pre-line">{txt(b.subtitle)}</p>}
        </div>
        {has(b.ctaText) && has(b.ctaLink) && (
          <Link to={txt(b.ctaLink)} className="shrink-0 inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-xs font-bold hover:bg-primary-dark">
            {txt(b.ctaText)} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
